const router = require('express').Router()
const authByToken = require('./../middlewares/auth')
const User = require('./../models/db').User
const Product = require('./../models/db').Product


//GET -----> get all products 
router.get('/', (req, res) => {
    Product.findAll({include:{attributes:["UserId"]}})
    .then((product) => {
        res.status(200).send(product)

    }).catch((e) => {
        res.status(403).send({
            err : "error getting all the users" + e
        })
    })
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
        
        console.log(req.body.user);
        let name = parseInt(req.body.user.name);
        console.log(typeof(name));
        const product = await Product.create({
        name: req.body.product.name,
        image:req.body.product.image,
        price:req.body.product.price,
        review: req.body.product.review,
        description: req.body.product.description,
        manufacture: req.body.product.manufacture,
        UserId: req.body.user.id 
        // user
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