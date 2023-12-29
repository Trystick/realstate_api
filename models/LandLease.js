import mongoose from 'mongoose';
const { Schema } = mongoose;

const LandLeaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryLandLeaseId: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryLandLease',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true 
    },
    location: {
        type: String,
        required: true,
        trim: true 
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    nameContact: {
        type: String,
        required: true
    },
    phoneContact: {
        type: String,
        required: true
    },
    emailContact: {
        type: String,
    },
    room: {
        type: Number,
    },
    toilet: {
        type: Number,
    },
    photos:{
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("LandLease", LandLeaseSchema)