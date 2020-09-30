const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('./routes/api').route)


app.listen(3000, (req, res) => {
    console.log(`server is started http://localhost:3000`);
})