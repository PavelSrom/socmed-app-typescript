"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const auth_1 = __importDefault(require("../middleware/auth"));
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
const router = types_1.Router();
// DESC:			get all posts
// ACCESS:		private
// ENDPOINT:	/api/posts
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_1.default.find().sort({ createdAt: -1 });
        return res.send(posts);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			add a new post
// ACCESS:		private
// ENDPOINT:	/api/posts
const postStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images/posts');
    },
    filename: (req, file, cb) => {
        const suffix = file.mimetype.replace('image/', '.');
        const imgId = uuid_1.v4();
        req.postID = `${imgId}${suffix}`;
        cb(null, imgId + suffix);
    },
});
router.post('/', [
    auth_1.default,
    multer_1.default({
        storage: postStorage,
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                cb(new Error('File is not a valid image'));
            }
            cb(undefined, true);
        },
        limits: {
            fileSize: 500000,
        },
    }).single('image'),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID);
        if (!user)
            return res.status(404).send({ message: 'User not found' });
        const newPost = new Post_1.default({
            author: req.userID,
            fullName: user.fullName,
            text: req.body.text,
        });
        if (req.postID)
            newPost.image = `/images/posts/${req.postID}`;
        yield newPost.save();
        return res.status(201).send(newPost);
    }
    catch ({ message }) {
        console.log('here we go');
        console.log(message);
        return res.status(500).send({ message });
    }
}), (err, req, res, next) => {
    console.log(err);
    return res.status(400);
});
// DESC:			like a post
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/like
router.post('/:id/like', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).send({ message: 'Post not found' });
        const alreadyLiked = post.likes.some(({ user }) => user.toString() === req.userID);
        if (alreadyLiked)
            return res.status(400).send({ message: 'You already liked this post' });
        const newLike = { user: req.userID };
        post.likes.push(newLike);
        yield post.save();
        return res.status(201).send(post);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			dislike a post
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/like
router.delete('/:id/like', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).send({ message: 'Post not found' });
        const hasLike = post.likes.some(({ user }) => user.toString() === req.userID);
        if (!hasLike)
            return res.status(400).send({ message: 'You did not like this post' });
        post.likes = post.likes.filter(({ user }) => user.toString() !== req.userID);
        yield post.save();
        return res.send(post);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			add a comment
// ACCESS:		private
// ENDPOINT:	/api/posts/:id/comment
router.post('/:id/comment', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).send({ message: 'Post not found' });
        const user = yield User_1.default.findById(req.userID);
        if (!user)
            return res.status(404).send({ message: 'User not found' });
        const newComment = {
            _id: uuid_1.v4(),
            userID: req.userID,
            user: user.fullName,
            text: req.body.text,
        };
        post.comments.unshift(newComment);
        yield post.save();
        return res.status(201).send(post);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			remove a comment
// ACCESS:		private
// ENDPOINT:	/api/posts/:postId/:commentId
router.delete('/:postId/:commentId', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById(req.params.postId);
        if (!post)
            return res.status(404).send({ message: 'Post not found' });
        const user = yield User_1.default.findById(req.userID);
        if (!user)
            return res.status(404).send({ message: 'User not found' });
        const targetComment = post.comments.find(({ _id }) => req.params.commentId === _id);
        if (!targetComment)
            return res.status(404).send({ message: 'Comment not found' });
        if (targetComment.userID.toString() !== req.userID)
            return res.status(403).send({ message: 'Access denied' });
        post.comments = post.comments.filter(({ _id }) => _id !== targetComment._id);
        yield post.save();
        return res.send(post);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
exports.default = router;
