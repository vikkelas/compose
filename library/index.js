const express = require('express');
require('dotenv').config();
const err404 = require('./src/middleware/error-404')
const app = express();
const path = require("path");
const formidableMiddleware = require('express-formidable');
const indexRouter = require('./src/routes');
const mongoose = require("mongoose");

app.use(express.urlencoded());
app.use(formidableMiddleware());
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");
app.use(express.static('public'))

app.use('/', indexRouter)

app.use(err404)

const PORT = process.env.PORT || 3000;

const start = async () => {
    try{
        await mongoose.connect(process.env.UrlDB);
        app.listen(PORT);
    }catch(err){
        console.log(err)
    }
}
start().then();
console.log(`server start port: ${PORT}`);

