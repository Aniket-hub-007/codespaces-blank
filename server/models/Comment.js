import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'news', required: true }, 
    name: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
}, { timestamps: true });

// The model name should be 'Comment'
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
