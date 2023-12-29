import CategoryLandSale from "../models/CategoryLandSale.js";
import LandSale from "../models/LandSale.js";

export const createCategoryLandSale = async(req, res, next) => {
    const newCategoryLandSale = new CategoryLandSale(req.body)

    try {
        const savedCategoryLandSale = await newCategoryLandSale.save()
        res.status(200).json(savedCategoryLandSale)
    } catch (err) {
        next(err);
    }
}

export const updateCategoryLandSale = async(req, res, next) => {
    try {
        const updatedCategoryLandSale = await CategoryLandSale.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedCategoryLandSale)
    } catch (err) {
        next(err);
    }
}

export const deleteCategoryLandSale = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const categoryLandSaleId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await LandSale.deleteMany({ categoryLandSaleId: categoryLandSaleId });
  
      // Xóa danh mục
      await CategoryLandSale.findByIdAndDelete(categoryLandSaleId);
  
      res.status(200).json("Category Land Sale and all related land sale have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getCategoryLandSale = async(req, res, next) => {
    try {
        const categoryLandSale =  await CategoryLandSale.findById(
            req.params.id
        );
        res.status(200).json(categoryLandSale)
    } catch (err) {
        next(err);
    }
}

export const getCategoryLandSales = async(req, res, next) => {
    try {
        const categoryLandSales =  await CategoryLandSale.find();
        res.status(200).json(categoryLandSales)
    } catch (err) {
        next(err);
    }
}