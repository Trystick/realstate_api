import mongoose from 'mongoose';
const { Schema } = mongoose;

const LandSaleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categoryLandSaleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryLandSale',
        required: true
    },
    name:{
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
        type: String,
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
        required: true
    },
    room: {
        type: Number,
        required: true
    },
    toilet: {
        type: Number,
        required: true
    },
    photos:{
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("LandSale", LandSaleSchema)