import mongoose from 'mongoose';
const { Schema } = mongoose;

const PacketTypeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true 
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
    packets: {
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("PacketType", PacketTypeSchema)

