import CategoryLandSale from "../models/CategoryLandSale.js";
import LandSale from "../models/LandSale.js";
import LandLease from "../models/LandLease.js";
import Favorite from "../models/Favorite.js";
import User from "../models/User.js";
import { startOfWeek, endOfWeek, eachWeekOfInterval, startOfMonth, endOfMonth } from 'date-fns';

export const createLandSale = async (req, res, next) => {
    const categoryLandSaleId = req.params.categorylandsaleid;

    // Kiểm tra xem CategoryLandSale có tồn tại không
    const categoryLandSaleExists = await CategoryLandSale.findById(categoryLandSaleId);
    if (!categoryLandSaleExists) {
        return res.status(400).send("CategoryLandSale không tồn tại!");
    }

    const newLandSale = new LandSale(
        req.body);

    try {
        const savedLandSale = await newLandSale.save()
        try {
            await CategoryLandSale.findByIdAndUpdate(categoryLandSaleId, 
                {$push : {landsales: savedLandSale._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedLandSale);
    } catch (err) {
        next(err);
    }
};

export const updateLandSale = async(req, res, next) => {
    try {
        const updatedLandSale = await LandSale.findByIdAndUpdate(
             req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedLandSale)
    } catch (err) {
        next(err);
    }
};

export const deleteLandSale = async(req, res, next) => {
    const landsaleId = req.params.id;
    try {
        // Tìm và xóa bài đăng LandSale
        await LandSale.findByIdAndDelete(landsaleId);

        // Tìm tất cả các bài đăng yêu thích liên quan trong model Favorite và xóa chúng
        const favoritesToDelete = await Favorite.find({ landsaleId: landsaleId });
        await Favorite.deleteMany({ landsaleId: landsaleId });

        // Cập nhật mảng 'favorites' của mỗi người dùng để loại bỏ ID của bài đăng yêu thích đã bị xóa
        favoritesToDelete.forEach(async (favorite) => {
            await User.updateOne(
                { _id: favorite.userId },
                { $pull: { favorites: favorite._id } }
            );
        });

        // Cập nhật CategoryLandSale
        const categorylandsaleId = req.params.categorylandsaleid;
        await CategoryLandSale.findByIdAndUpdate(categorylandsaleId, 
            { $pull : { landsales: landsaleId } }
        );

        res.status(200).json("Land Sale and related favorites have been deleted.")
    } catch (err) {
        next(err);
    }
};

export const getLandSale = async(req, res, next) => {
    try {
        const landSale =  await LandSale.findById(
            req.params.id
        );
        res.status(200).json(landSale)
    } catch (err) {
        next(err);
    }
};


export const getLandSales = async (req, res, next) => {
  try {
    const landSales =  await LandSale.find();
    res.status(200).json(landSales)
  } catch (err) {
      next(err);
  }
};

export const getLandSaleThree = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 3;
      const skip = (page - 1) * limit;
      const total = await LandSale.countDocuments();
      const landsales = await LandSale.find().skip(skip).limit(limit);
      res.status(200).json({ landsales, page, limit, total });
    } catch (err) {
      next(err);
    }
  }

export const getRandomLandSales = async (req, res, next) => {
    try {
      const landsales = await LandSale.aggregate([{ $sample: { size: 3 } }]);
      res.status(200).json(landsales);
    } catch (err) {
      next(err);
    }
};

export const getLandSalesByUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const landSales = await LandSale.find({ userId: userId });
      res.status(200).json(landSales);
    } catch (err) {
      next(err);
    }
};

export const getWeeklyLandSaleAndLease = async (req, res, next) => {
    try {
        const month = req.params.month;
        const year = req.params.year;
        const startDate = startOfMonth(new Date(year, month - 1));
        const endDate = endOfMonth(new Date(year, month - 1));
        const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

        const weeklyLandSaleAndLease = await Promise.all(weeks.map(async (weekStart, index) => {
            const weekEnd = endOfWeek(weekStart);
            const landSales = await LandSale.find({
                createdAt: { $gte: weekStart, $lte: weekEnd }
            });
            const landLeases = await LandLease.find({
                createdAt: { $gte: weekStart, $lte: weekEnd }
            });

            return {
                week: `Tuần ${index + 1}`,
                landSales: landSales.length,
                landLeases: landLeases.length
            };
        }));

        res.status(200).json(weeklyLandSaleAndLease);
    } catch (err) {
        next(err);
    }
};
  