import mongoose from 'mongoose';
const { Schema } = mongoose;

const PacketSchema = new mongoose.Schema({
    packetTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PacketType",
    },
    name:{
        type: String,
        required: true,
        trim: true 
    },
    timeend:{
        type: String,
        required: true,
        trim: true 
    },
    function:{
        type: String,
        required: true,
        trim: true 
    },
    desc:{
        type: String,
        required: true,
        trim: true 
    },
    price:{
        type: String,
        required: true,
        trim: true 
    },
    title:{
        type: String,
        required: true,
        trim: true 
    },
}, {timestamps:true});

export default mongoose.model("Packet", PacketSchema)

