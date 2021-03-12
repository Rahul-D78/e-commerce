require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const allRoutes = require('./routes/allRoutes')
require('./models/db')
const path = require('path')
const { Product } = require('./models/db')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname ,'public')))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(allRoutes)


app.get('/', (req, res) => {
    Product.findAll()
    .then((products) => {
       res.render('home', {prods : products})
    })
})

let PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on ----> http://localhost:4000`);
})
