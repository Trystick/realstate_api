import PostCategory from "../models/PostCategory.js"
import Post from "../models/Post.js"

export const createPostCategory = async(req, res, next) => {
    const newPostCategory = new PostCategory(req.body)

    try {
        const savedPostCategory = await newPostCategory.save()
        res.status(200).json(savedPostCategory)
    } catch (err) {
        next(err);
    }
}

export const updatePostCategory = async(req, res, next) => {
    try {
        const updatedPostCategory = await PostCategory.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedPostCategory)
    } catch (err) {
        next(err);
    }
}

export const deletePostCategory = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const postCategoryId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await Post.deleteMany({ postCategoryId: postCategoryId });
  
      // Xóa danh mục
      await PostCategory.findByIdAndDelete(postCategoryId);
  
      res.status(200).json("Post Category and all related post have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getPostCategory = async(req, res, next) => {
    try {
        const postCategory =  await PostCategory.findById(
            req.params.id
        );
        res.status(200).json(postCategory)
    } catch (err) {
        next(err);
    }
}

export const getPostCategorys = async(req, res, next) => {
    try {
        const postCategorys =  await PostCategory.find();
        res.status(200).json(postCategorys)
    } catch (err) {
        next(err);
    }
}