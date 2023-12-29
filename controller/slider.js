import Slider from "../models/Slider.js"

export const createSlider = async(req, res, next) => {
    const newSlide = new Slider(req.body)
    try {
        const savedSlide = await newSlide.save()
        res.status(200).json(savedSlide)
    } catch (err) {
        next(err);
    }
}

export const updateSlider = async(req, res, next) => {
    try {
        const updatedSlide = await Slider.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedSlide)
    } catch (err) {
        next(err);
    }
}

export const deleteSlider = async(req, res, next) => {
    try {
        await Slider.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Slide has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getSlider = async(req, res, next) => {
    try {
        const slide =  await Slider.findById(
            req.params.id
        );
        res.status(200).json(slide)
    } catch (err) {
        next(err);
    }
}

export const getSliders = async(req, res, next) => {
    try {
        const slides =  await Slider.find();
        res.status(200).json(slides)
    } catch (err) {
        next(err);
    }
}
