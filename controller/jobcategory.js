import Job from "../models/Job.js";
import JobCategory from "../models/JobCategory.js";


export const createJobCategory = async(req, res, next) => {
    const newJobCategory = new JobCategory(req.body)

    try {
        const savedJobCategory = await newJobCategory.save()
        res.status(200).json(savedJobCategory)
    } catch (err) {
        next(err);
    }
}

export const updateJobCategory = async(req, res, next) => {
    try {
        const updatedJobCategory = await JobCategory.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedJobCategory)
    } catch (err) {
        next(err);
    }
}

export const deleteJobCategory = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const jobCategoryId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await Job.deleteMany({ jobCategoryId: jobCategoryId });
  
      // Xóa danh mục
      await JobCategory.findByIdAndDelete(jobCategoryId);
  
      res.status(200).json("Job Category and all related post have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getJobCategory = async(req, res, next) => {
    try {
        const jobCategory =  await JobCategory.findById(
            req.params.id
        );
        res.status(200).json(jobCategory)
    } catch (err) {
        next(err);
    }
}

export const getJobCategorys = async(req, res, next) => {
    try {
        const jobCategorys =  await JobCategory.find();
        res.status(200).json(jobCategorys)
    } catch (err) {
        next(err);
    }
}