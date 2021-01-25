const router = require('express').Router()
const Product = require('./../models/db').Product


//GET -----> get all products 
router.get('/', (req, res) => {
    Product.findAll()
    .then((product) => {
        res.status(200).send(product)

    }).catch((e) => {
        res.status(403).send({
            err : "error getting all the users"
        })
    })
})


//POST ----> To post a new product
router.post('/', (req, res) => {
    //validate the price
    if((req.body.price) === null)     {
        res.status(403).send({
            err: "price is not a valid number"
        });
    }

    Product.create({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        review: req.body.review,
        manufacture: req.body.manufacture,
        description: req.body.description
    }).then((product) => {
        res.status(200).send(product)
    }).catch((e) => {
        res.status(403).send({
            err : "error creating products"
        });
    });
});

//PATCH ----> Update a new product 
router.patch('/:id', (req, res) => {
    Product.findOne({where: {id: req.params.id}})
    .then((product) => {
        product.update({
        name: req.body.name,
        })
        product.save()
        res.status(200).send(product)
    }).catch((e) => {
        res.status(403).send({
            err : "error patching the products" + e
        })
    })
}) 

//PUT ---- update all fields 
router.put('/:id', (req, res) => {
    Product.findOne({where: {id: req.params.id}})
    .then((product) => {
        product.update({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            review: req.body.review,
            manufacture: req.body.manufacture,
            description: req.body.description
        })
        product.save()
        res.status(200).send(product)
    }).catch((e) => {
        res.status(403).send({
            err : "error update the products" + e
        })
    })
}) 

//DELTE ---- Delete a product
router.delete('/:id', (req, res) => {
    Product.findOne({where: {id: req.params.id}})
    .then((product) => {
        product.destroy(product)
        res.status(200).send({
            body: "successfully deleted"
        })
    }).catch((e) => {
        res.status(403).send({
            err : `error deleting the product ${e}`
        })
    })
})

module.exports = router