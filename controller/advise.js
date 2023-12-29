import Advise from "../models/Advise.js";

export const createAdvise = async(req, res, next) => {
    const newAdvise = new Advise(req.body)
    try {
        const savedAdvise = await newAdvise.save()
        res.status(200).json(savedAdvise)
    } catch (err) {
        next(err);
    }
}

export const updateAdvise = async(req, res, next) => {
    try {
        const updatedAdvise = await Advise.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedAdvise)
    } catch (err) {
        next(err);
    }
}

export const deleteAdvise = async(req, res, next) => {
    try {
        await Advise.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Advise has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getAdvise = async(req, res, next) => {
    try {
        const advise =  await Advise.findById(
            req.params.id
        );
        res.status(200).json(advise)
    } catch (err) {
        next(err);
    }
}

export const getAdvises = async(req, res, next) => {
    try {
        const advises =  await Advise.find();
        res.status(200).json(advises)
    } catch (err) {
        next(err);
    }
}