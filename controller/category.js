import Category from "../models/Category.js";
import Project from "../models/Project.js";

export const createCategory = async(req, res, next) => {
    const newCategory = new Category(req.body)

    try {
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    } catch (err) {
        next(err);
    }
}

export const updateCategory = async(req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedCategory)
    } catch (err) {
        next(err);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const categoryId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await Project.deleteMany({ categoryId: categoryId });
  
      // Xóa danh mục
      await Category.findByIdAndDelete(categoryId);
  
      res.status(200).json("Category and all related projects have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getCategory = async(req, res, next) => {
    try {
        const category =  await Category.findById(
            req.params.id
        );
        res.status(200).json(category)
    } catch (err) {
        next(err);
    }
}

export const getCategorys = async(req, res, next) => {
    try {
        const categorys =  await Category.find();
        res.status(200).json(categorys)
    } catch (err) {
        next(err);
    }
}