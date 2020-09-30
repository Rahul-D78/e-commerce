const Product = require('../../db').Product
const route = require('express').Router()

route.get('/', (req, res) => {
   Product.findAll()
    .then((products) => {
        res.status(200).send(products)
    }).catch((err) => {
        res.status(500).send({
            error: "could not retrive the products"
        })
    })
})

route.post('/', (req, res) => {
    
    //validate the value
    if(isNaN(req.body.price)) {
        return res.status(403).send({
            error: " price is not a valid number"
        })
    }


    //Add a new product

    Product.create({
        name: req.body.name,
        manufacture: req.body.manufacture,
        price: parseInt(req.body.price)
    }).then((product) => {
        res.status(200).send(product)
    }).catch((err) => {
        res.status(500).send({
            error: "error crateing a product"
        })
    })
})

exports = module.exports = route;