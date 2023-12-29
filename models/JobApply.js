import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobApplySchema = new mongoose.Schema({
    namejob:{
        type: String,
        trim: true 
    },
    fullname:{
        type: String,
        trim: true 
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    file:{
        type: String,
    },

}, {timestamps:true});

export default mongoose.model("JobApply", JobApplySchema)

