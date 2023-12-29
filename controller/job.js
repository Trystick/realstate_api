import Job from "../models/Job.js";
import JobCategory from "../models/JobCategory.js";

export const createJob = async (req, res, next) => {
    const jobCategoryId = req.params.jobCategoryid;

    // Kiểm tra xem JobCategory có tồn tại không
    const jobCategoryExists = await JobCategory.findById(jobCategoryId);
    if (!jobCategoryExists) {
        return res.status(400).send("JobCategory không tồn tại!");
    }

    const newJob = new Job(req.body);

    try {
        const savedJob = await newJob.save()
        try {
            await JobCategory.findByIdAndUpdate(jobCategoryId, 
                {$push : {jobs: savedJob._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedJob);
    } catch (err) {
        next(err);
    }
};


export const updateJob = async(req, res, next) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedJob)
    } catch (err) {
        next(err);
    }
}

export const deleteJob = async(req, res, next) => {
    const jobCategoryId = req.params.jobCategoryid;
    try {
        await Job.findByIdAndDelete(
            req.params.id
        );
        try {
            await JobCategory.findByIdAndUpdate(jobCategoryId, 
                {$pull : {jobs: req.params.id}
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Job has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getJob = async(req, res, next) => {
    try {
        const job =  await Job.findById(
            req.params.id
        );
        res.status(200).json(job)
    } catch (err) {
        next(err);
    }
}

export const getJobs = async (req, res, next) => {
  try {
    const jobs =  await Job.find();
    res.status(200).json(jobs)
  } catch (err) {
      next(err);
  }
}