import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    packetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packet',
        required: true
    },
    packetName: {
        type: String,
        required: true,
        trim: true 
    },
    customerName: {
        type: String,
        required: true,
        trim: true 
    },
    address: {
        type: String,
        required: true,
        trim: true 
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true 
    },
    amount: {
        type: Number,
        required: true,
    },
    cancelReason: {
        type: String,
    },
    status: {
        type: String,
    },
}, {timestamps:true});

export default mongoose.model("Order", OrderSchema)