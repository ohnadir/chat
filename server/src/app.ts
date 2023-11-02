import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { authenticationRouter, userRouter } from './routes';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// config dot env file
dotenv.config();

const app = express();
app.use(express.json());


// passport authentication start
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    },
      function (accessToken:any, refreshToken:any, profile:any, done:any) {
        console.log(profile)
        return done(null, profile);
      }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user:any, done) => {
    done(null, user);
});
// passport authentication end



app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

app.get('/profile', (req, res) => {
    res.send(`Hello user`);
});
  
app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);




app.get('/', (req, res)=>{
    res.send("Hello world !")
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server app Listing at http://localhost:${PORT}`);
})