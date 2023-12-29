import mongoose from 'mongoose';
const { Schema } = mongoose;

const SliderSchema = new mongoose.Schema({
    photos:{
        type: [String],
    },
},{timestamps:true});

export default mongoose.model("Slider", SliderSchema)