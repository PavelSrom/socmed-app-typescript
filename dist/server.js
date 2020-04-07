"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(cors_1.default());
app.use('/images', express_1.default.static(path_1.default.join(__dirname + '/../src/images')));
app.use(express_1.default.json());
// app.use('/api/auth', authRoutes)
// app.use('/api/posts', postRoutes)
app.use(express_1.default.static(__dirname + '/../client/build'));
// app.use(express.static(__dirname))
mongoose_1.default
    .connect(config_1.default.get('mongoURI'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
})
    .catch((err) => {
    console.log(err);
    console.log('Server not running - database error');
});
if (process.env.NODE_ENV === 'production') {
    app.get('/', (req, res) => {
        res.sendfile(path_1.default.resolve(__dirname, '..', 'client', 'build', 'index.html'));
        res.render('index');
    });
}
