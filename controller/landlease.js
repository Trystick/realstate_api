import CategoryLandLease from "../models/CategoryLandLease.js";
import LandLease from "../models/LandLease.js";
import Favorite from "../models/Favorite.js";
import User from "../models/User.js";

export const createLandLease = async (req, res, next) => {
    const categoryLandLeaseId = req.params.categorylandleaseid;

    // Kiểm tra xem CategoryLandLease có tồn tại không
    const categoryLandLeaseExists = await CategoryLandLease.findById(categoryLandLeaseId);
    if (!categoryLandLeaseExists) {
        return res.status(400).send("CategoryLandLease không tồn tại!");
    }
    const newLandLease = new LandLease(
        req.body
    );

    try {
        const savedLandLease = await newLandLease.save()
        try {
            await CategoryLandLease.findByIdAndUpdate(categoryLandLeaseId, 
                {$push : {landleases: savedLandLease._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedLandLease);
    } catch (err) {
        next(err);
    }
};


export const updateLandLease = async(req, res, next) => {
    try {
        const updatedLandLease = await LandLease.findByIdAndUpdate(
             req.params.id,
            {$set: req.body}, 
            {new:true})
        if (!updatedLandLease) {
            throw new Error('LandLease not found or user not authorized');
        }
        res.status(200).json(updatedLandLease)
    } catch (err) {
        next(err);
    }
}

export const deleteLandLease = async(req, res, next) => {
    const landleaseId = req.params.id;
    try {
        // Tìm và xóa bài đăng LandSale
        await LandLease.findByIdAndDelete(landleaseId);

        // Tìm tất cả các bài đăng yêu thích liên quan trong model Favorite và xóa chúng
        const favoritesToDelete = await Favorite.find({ landleaseId: landleaseId });
        await Favorite.deleteMany({ landleaseId: landleaseId });

        // Cập nhật mảng 'favorites' của mỗi người dùng để loại bỏ ID của bài đăng yêu thích đã bị xóa
        favoritesToDelete.forEach(async (favorite) => {
            await User.updateOne(
                { _id: favorite.userId },
                { $pull: { favorites: favorite._id }}
            );
        });

        // Cập nhật CategoryLandSale
        const categorylandleaseId = req.params.categorylandleaseid;
        await CategoryLandLease.findByIdAndUpdate(categorylandleaseId, 
            { $pull : { landleases: landleaseId } }
        );

        res.status(200).json("Land Lease and related favorites have been deleted.")
    } catch (err) {
        next(err);
    }
};




export const getLandLease = async(req, res, next) => {
    try {
        const landLease =  await LandLease.findById(
            req.params.id
        );
        res.status(200).json(landLease)
    } catch (err) {
        next(err);
    }
}

export const getLandLeases = async (req, res, next) => {
  try {
    const landLeases =  await LandLease.find();
    res.status(200).json(landLeases)
  } catch (err) {
      next(err);
  }
}

export const getLandLeaseThree = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      const skip = (page - 1) * limit;
      const total = await LandLease.countDocuments();
      const landleases = await LandLease.find().skip(skip).limit(limit);
      res.status(200).json({ landleases, page, limit, total });
    } catch (err) {
      next(err);
    }
  }
    
export const getRandomLandLeases = async (req, res, next) => {
    try {
      const landleases = await LandLease.aggregate([{ $sample: { size: 3 } }]);
      res.status(200).json(landleases);
    } catch (err) {
      next(err);
    }
};

export const getLandLeasesByUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const landLeases = await LandLease.find({ userId: userId });
      res.status(200).json(landLeases);
    } catch (err) {
      next(err);
    }
  };
