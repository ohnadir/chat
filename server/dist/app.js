"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const routes_1 = require("./routes");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// config dot env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// passport authentication start
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
}, function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
// passport authentication end
app.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['profile']
}));
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));
app.get('/profile', (req, res) => {
    res.send(`Hello user`);
});
app.use('/authentication', routes_1.authenticationRouter);
app.use('/user', routes_1.userRouter);
app.get('/', (req, res) => {
    res.send("Hello world !");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server app Listing at http://localhost:${PORT}`);
});
