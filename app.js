const express = require('express')
const bodyParser = require('body-parser')
const allRoutes = require('./routes/allRoutes')
const db = require('./models/db')

const app = express()
app.use(express.json())
app.use(allRoutes)

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on ----> http://localhost:3000`);
})