import CategoryLandLease from "../models/CategoryLandLease.js";
import LandLease from "../models/LandLease.js";

export const createCategoryLandLease = async(req, res, next) => {
    const newCategoryLandLease = new CategoryLandLease(req.body)

    try {
        const savedCategoryLandLease = await newCategoryLandLease.save()
        res.status(200).json(savedCategoryLandLease)
    } catch (err) {
        next(err);
    }
}

export const updateCategoryLandLease = async(req, res, next) => {
    try {
        const updatedCategoryLandLease = await CategoryLandLease.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedCategoryLandLease)
    } catch (err) {
        next(err);
    }
}

export const deleteCategoryLandLease = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const categoryLandLeaseId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await LandLease.deleteMany({ categoryLandLeaseId: categoryLandLeaseId });
  
      // Xóa danh mục
      await CategoryLandLease.findByIdAndDelete(categoryLandLeaseId);
  
      res.status(200).json("Category Land Lease and all related land lease have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getCategoryLandLease = async(req, res, next) => {
    try {
        const categoryLandLease =  await CategoryLandLease.findById(
            req.params.id
        );
        res.status(200).json(categoryLandLease)
    } catch (err) {
        next(err);
    }
}

export const getCategoryLandLeases = async(req, res, next) => {
    try {
        const categoryLandLeases =  await CategoryLandLease.find();
        res.status(200).json(categoryLandLeases)
    } catch (err) {
        next(err);
    }
}