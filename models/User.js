import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role' 
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    type: {
        type: String,
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Favorite' 
    }],
    likes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Like' 
    }],
},{timestamps:true});

export default mongoose.model("User", UserSchema)

