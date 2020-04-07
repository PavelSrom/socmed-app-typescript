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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("config"));
const auth_1 = __importDefault(require("../middleware/auth"));
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const router = types_1.Router();
// DESC:			verify user's token
// ACCESS:		private
// ENDPOINT:	/api/auth
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID).select('-password');
        return res.send(user);
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			register new user
// ACCESS:		public
// ENDPOINT:	/api/auth/register
const avatarStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/images/avatars');
    },
    filename: (req, file, cb) => {
        const suffix = file.mimetype.replace('image/', '.');
        const imgId = uuid_1.v4();
        req.avatarID = `${imgId}${suffix}`;
        cb(null, imgId + suffix);
    },
});
router.post('/register', multer_1.default({
    storage: avatarStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error('File is not a valid image'));
        }
        cb(undefined, true);
    },
}).single('avatar'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists)
            return res.status(400).send({ message: 'User with this email already exists' });
        const newUser = new User_1.default({
            fullName,
            email,
            avatar: `/images/avatars/${req.avatarID}`,
        });
        newUser.password = yield bcryptjs_1.default.hash(password, 8);
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, config_1.default.get('jwtSecret'), { expiresIn: 3600 });
        return res.status(201).send({ token });
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			log in existing user
// ACCESS:		public
// ENDPOINT:	/api/auth/login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).send({ message: 'Bad email' });
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(400).send({ message: 'Bad password' });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.get('jwtSecret'), {
            expiresIn: 3600,
        });
        return res.send({ token });
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
// DESC:			delete user and their posts
// ACCESS:		private
// ENDPOINT:	/api/auth/delete
router.delete('/delete', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userID);
        // delete images here
        yield Post_1.default.deleteMany({ author: req.userID });
        yield user.remove();
        return res.send({ message: 'Account deleted successfully' });
    }
    catch ({ message }) {
        console.log(message);
        return res.status(500).send({ message });
    }
}));
exports.default = router;
