const express = require('express');
const err404 = require('./src/middleware/error-404')
const app = express();
const path = require("path");
const formidableMiddleware = require('express-formidable');

const indexRouter = require('./src/routes')


app.use(express.urlencoded());
app.use(formidableMiddleware());
app.set('views', path.join(__dirname, './src/views'));
app.set("view engine", "ejs");
app.use(express.static('public'))

app.use('/', indexRouter)

app.use(err404)

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.log(`server start port: ${PORT}`);

