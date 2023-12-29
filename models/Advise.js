import mongoose from 'mongoose';
const { Schema } = mongoose;

const AdviseSchema = new mongoose.Schema({
    
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
},{timestamps:true});

export default mongoose.model("Advise", AdviseSchema)

