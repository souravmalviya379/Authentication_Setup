const env = require('./config/environment');
const logger = require('morgan');
const express = require('express');
const app = express();
const port = env.port;
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flashMiddleware = require('./config/flashMiddleware');

app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, env.asset_path)));


app.use(expressLayouts);
//extracting style and script from sub pages of layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'Auth',
    secret: `${env.session_cookie_key}`,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: "mongodb://localhost:27017/" + env.db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || 'connect-mongo setup successful!!');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(flashMiddleware.setFlash);

app.use(logger(env.morgan.mode, env.morgan.options));


app.use('/', require('./routes'));




app.listen(port, (err) => {
    if (err) { console.log('Error in connecting to server : ' + err); return; }
    console.log('Server is started and running at port : ' + port);
})