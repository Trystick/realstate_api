import mongoose from 'mongoose';
const { Schema } = mongoose;

const CategoryLandSaleSchema = new mongoose.Schema({
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
    landsales: {
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("CategoryLandSale", CategoryLandSaleSchema)