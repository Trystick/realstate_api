import mongoose from 'mongoose';
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
    postCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostCategory",
    },
    name:{
        type: String,
        required: true,
        trim: true 
    },
    descone:{
        type: String,
        required: true,
        trim: true 
    },
    desctwo:{
        type: String,
        trim: true 
    },
    descthree:{
        type: String,
        trim: true 
    },
    descfour:{
        type: String,
        trim: true 
    },
    descfive:{
        type: String,
        trim: true 
    },
    title:{
        type: String,
        required: true,
        trim: true 
    },
    photos:{
        type: [String],
    },
}, {timestamps:true});

export default mongoose.model("Post", PostSchema)

