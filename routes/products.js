const router = require('express').Router()
const {f} = require('./../utils/stringUtils')
const authByToken = require('./../middlewares/auth')
const User = require('./../models/db').User
const Product = require('./../models/db').Product


//GET -----> get all products 
router.get('/', (req, res) => {
    Product.findAll()
    .then((product) => {
        res.status(200).send(product)

    }).catch((e) => {
        res.status(403).send({
            err : "error getting all the users" + e
        })
    })
})

//GET an article by slug  --- Name Here
router.get('/:slug', async (req, res) => {

    try {
    const product = await Product.findOne({where: {name: req.params.slug}})

    if(!product) throw 'Product with this name does not exists'
    res.status(200).send(product)
    }catch(e) {
        res.status(500).send({
            err: e
        })
    }
})

//POST ----> To post a new product
router.post('/', authByToken, async (req, res) => {

    //validate the price
    if((req.body.product.price) === null)     {
        res.status(403).send({
            err: "price is not a valid number"
        });
    }

    try {
        const user = await User.findOne({where: {email: req.body.user.email}})
        if(!user) throw "user with this email does not exists"
        
        // console.log(Slugify(req.body.product.name));
        
        const product = await Product.create({
        name: f(req.body.product.name),
        image:req.body.product.image,
        price:req.body.product.price,
        review: req.body.product.review,
        description: req.body.product.description,
        manufacture: req.body.product.manufacture,
        UserId: req.body.user.id 
        })
        product.save()
        res.status(200).send({
            body : {product}
        })
    }catch(e) {
        res.status(500).send({
           err : e
        })
        console.log(e);
    }
});

//PATCH ----> Update a new product 
router.patch('/:slug/update', authByToken,(req, res) => {
    const user = User.findOne({where: {name: req.body.user.name}})

    Product.findOne({where: {name: req.params.slug}})
    .then((product) => {
        product.update({
        name: product.name != undefined? f(req.body.product.name) : product.name,
        image: product.image != undefined? req.body.product.image: product.image,
        price: product.price != undefined ? req.body.product.price : product.price,
        review: product.review != undefined?  req.body.product.review : product.review,
        description: product.description != undefined ?  req.body.product.description: product.description,
        manufacture: product.manufacture != undefined ? req.body.product.manufacture: product.manufacture,
        UserId: user.UserId != undefined? req.body.user.id: user.UserId 
        })
        product.save()
        res.status(200).send(product)
    }).catch((e) => {
        res.status(403).send({
            err : `error patching the products ${ e} `
        })
    })
}) 

//DELTE ---- Delete a product
router.delete('/:slug/delete', (req, res) => {
    Product.findOne({where: {name: req.params.slug}})
    .then((product) => {
        product.destroy(product)
        res.status(200).send({
            body: "Successfully deleted"
        })
    }).catch((e) => {
        res.status(403).send({
            err : `error deleting the product ${e}`
        })
    })
})

module.exports = router