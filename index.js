const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const env = require('./config/environment');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');


app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, env.asset_path)));

app.use(expressLayouts);
//extracting style and script from sub pages of layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));




app.listen(port, (err)=>{
    if(err){console.log('Error in connecting to server : '+err); return;}
    console.log('Server is started and running at port : '+port);
})