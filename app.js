const express = require('express')
const bodyParser = require('body-parser')
require('./utils/stringUtils').f()
const allRoutes = require('./routes/allRoutes')
require('./models/db')

const app = express()
app.use(express.json())
app.use(allRoutes)

let PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`server is running on ----> http://localhost:4000`);
})