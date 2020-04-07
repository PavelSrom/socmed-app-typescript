"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    likes: [],
    comments: [],
}, {
    timestamps: true,
});
const Post = mongoose_1.model('Post', postSchema);
exports.default = Post;
