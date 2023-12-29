import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    content: {
        type: String,
        required: true,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    isApproved: {
        type: Boolean,
        default: false,
    },
}, {timestamps:true});

export default mongoose.model("Comment", CommentSchema)