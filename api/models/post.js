import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: String,
    message: String,
    date: Date,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Post = mongoose.model('Post', postSchema);
export{Post};
