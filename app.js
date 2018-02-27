const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
require("dotenv");
var users = require('./routes/users');
var sitters = require("./routes/sitters");

const app = express();

mongoose.connect(process.env.DATABASE_URL);

const authRouter = require("./routes/auth");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.locals.title = 'Project 2';

//********************** facebook login ******************
const User = require("./models/User");
const passport = require("passport");

const FbStrategy = require('passport-facebook').Strategy;

passport.use(new FbStrategy({
    clientID: "643701199133873",
    clientSecret: "27ed3bbb47291be2a240d905c7787b29",
    callbackURL: "/auth/facebook/callback",
    profileFields: ['email', "displayName"]
},
    (accessToken, refreshToken, profile, done)=>{
  User.findOne({facebookID:profile.id}, (err,user)=>{
      console.log(profile);
      if(err) return done(err);
      if(user) return done(null,user);
      const newUser = new User({
          facebookID:profile.id,
          displayName:profile.displayName,
          email:profile.emails.length > 0 ? profile.emails[0].value : null
      });
      newUser.save((err)=>{
        if(err) return done(err);
        done(null, newUser);
      });
    });
}));

//********************** facebook login ******************

//********************** Google login ********************

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "206685308200-b8evm0nb31i07bknpamvjgliirti56hj.apps.googleusercontent.com",
    clientSecret: "ThjN3WleyzvEizpUJUMVIR65",
    callbackURL: "/auth/google/callback"
},
    (accessToken, refreshToken, profile, done)=>{
        User.findOne({googleID: profile.id}, (err,user)=>{
            console.log(profile);
            if(err) return done(err);
            if(user) return done(null, user);
            const newUser = new User({
                googleID: profile.id,
                displayName:profile.displayName,
                email:profile.emails.length > 0 ? profile.emails[0].value : null
            });
            newUser.save(err=>{
                if (err) return done(err);
                done(null, newUser);
            });
        });
    }
    ));

//********************** Google login ********************

//********************** Instagram login ******************
const InstagramStrategy = require('passport-instagram').Strategy;

passport.use(new InstagramStrategy({
  clientID: "09b0c2dfa4ac4738bfeb6a6c7784adf9",
  clientSecret: "075fb81547ca4496a2eeb426638b6e5d",
  callbackURL: "/auth/instagram/callback"
},
function(accessToken, refreshToken, profile, next) {
  console.log("fuera de la busqueda")
  console.log(profile)
  User.findOne({ instagramID: profile.id }, function (err, user) {
    console.log(profile);
      if(err) return next(err);
      if(user) return next(null,user);
      const newUser = new User({
          instagramID:profile.id,
          displayName:profile.displayName,
          //email:profile.emails.length > 0 ? profile.emails[0].value : null
      })
      newUser.save((err)=>{
        if(err) return next(err);
        next(null, newUser);
      });
  });
}
));

//********************** Instagram login ******************

//********************************** passport ****************
//flash for errors
const flash = require("connect-flash");
//session

const session = require("express-session");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local");
//session middleware
app.use(session({
    secret: "bliss",
    resave: true,
    saveUninitializer: true
}));
//passport session
//before
passport.serializeUser((user,cb)=>{
  cb(null, user._id);
});

passport.deserializeUser((id, cb)=>{
  User.findOne({"_id":id}, (err,user)=>{
    if(err) return cb(err);
    cb(null, user);
  })
});

//flash
app.use(flash());

passport.use(new LocalStrategy({passReqToCallback:true},(req, username, password, next)=>{
  User.findOne({username}, (err, user)=>{
    if(err) return next(err);
    if(!user) return next(null, false, {message: "incorrect username"});
    if(!bcrypt.compareSync(password, user.password)) return next(null, false, {message: "Incorrecto password"});
    return next(null, user);
  });
}));

//after
app.use(passport.initialize());
app.use(passport.session());

//********************************** passport ****************


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.set("layout", "layout");

const index = require('./routes/index');
app.use('/', index);
app.use('/users', users);
app.use("/", authRouter);
app.use("/sitters", sitters);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
