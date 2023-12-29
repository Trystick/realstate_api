import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategoryLandLeaseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
    },
    desc: {
        type: String,
        required: true,
        trim: true 
    },
    title: {
        type: String,
        required: true,
        trim: true 
    },
    landleases: {
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("CategoryLandLease", CategoryLandLeaseSchema)
