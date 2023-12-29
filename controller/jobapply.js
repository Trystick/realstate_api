import JobApply from "../models/JobApply.js";

export const createJobApply = async(req, res, next) => {
    const newJobApply = new JobApply(req.body)
    try {
        const savedJobApply = await newJobApply.save()
        res.status(200).json(savedJobApply)
    } catch (err) {
        next(err);
    }
}

export const updateJobApply = async(req, res, next) => {
    try {
        const updatedJobApply = await JobApply.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedJobApply)
    } catch (err) {
        next(err);
    }
}

export const deleteJobApply = async(req, res, next) => {
    try {
        await JobApply.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Job Apply has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getJobApply = async(req, res, next) => {
    try {
        const jobApply =  await JobApply.findById(
            req.params.id
        );
        res.status(200).json(jobApply)
    } catch (err) {
        next(err);
    }
}

export const getJobApplys = async(req, res, next) => {
    try {
        const jobApplys =  await JobApply.find();
        res.status(200).json(jobApplys)
    } catch (err) {
        next(err);
    }
}