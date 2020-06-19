if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport');

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
app.use(require('./routes/users'));
require('./config/passport');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/PFN', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndmodify: false,
  useUnifiedTopology: true
})
.then(db => console.log('DB conectada'))
.catch(err => console.error(err));

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

//server timeout

var currentdate = new Date();
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
                console.log(datetime);

app.listen(process.env.PORT || 3000)
