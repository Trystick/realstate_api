import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobSchema = new mongoose.Schema({
    jobCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobCategory",
    },
    name:{
        type: String,
        required: true,
        trim: true 
    },
    location:{
        type: String,
        trim: true,
        required: true,
    },
    number:{
        type: String,
        required: true,
    },
    dateend:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
        trim: true 
    },
    gender:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    level:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    request:{
        type: String,
        required: true,
    },
    income:{
        type: String,
        required: true,
    },
    regime : {
        type: String,
        required: true,
    },
}, {timestamps:true});

export default mongoose.model("Job", JobSchema)

