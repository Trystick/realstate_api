import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true 
    },
    type:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
        trim: true 
    },
    title:{
        type: String,
        required: true,
        trim: true 
    },
    jobs: {
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("JobCategory", JobCategorySchema)

