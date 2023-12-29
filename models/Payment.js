import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
        unique: true
    },
    packetName: {
        type: String,
        required: true,
        trim: true 
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        trim: true 
    },
}, {timestamps:true});

export default mongoose.model("Payment", PaymentSchema)
