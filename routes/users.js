const { User } = require('../models/db')
const router = require('express').Router()
const { sign } = require('../utils/jwt')
const { hashPass, matchPass } = require('../utils/password')
const { sanitization } = require('../utils/security')


//GET ----- get a new user
router.get('/', (req, res) => {

   User.findAll()
   .then((users) => {
       res.status(200).send(users)
   }).catch((e) => {
       res.status(403).send({
           err : `erro getting all users ${e}`
       })
   })
})


//POST ------ Register a new user
router.post('/', async(req, res) => {
    
    const existing = await User.findOne({where: {email: req.body.email}})
    
    try {

    if(existing) throw 'user with this email exists'
    
    await User.create({
        name: req.body.name,
        password: await hashPass(req.body.password),
        email: req.body.email,
        address: req.body.address,
        telephone: req.body.telephone,
    }).then(async(user) => {
        user.token = await sign(user)
        user.save()
        res.status(200).send(user)
    })
    }catch(e) {
        res.status(403).send({
         err : e   
        })
    } 
})

//POST ---- Login a new user
router.post('/login', async(req, res) => {

    try {
    
    const exist = await User.findOne({where: {email: req.body.email}})
    
    console.log(exist.toJSON());
    if(!exist) throw 'user with this email not exists'

    const myJson = exist.toJSON();
    let myPass = myJson.password;


    //Validate Password
    const passMatch = await matchPass(myPass, req.body.password)
    if(!passMatch) throw 'password does not match'
    exist.token = await sign(exist)
    // sanitization(myJson)
    res.status(200).send({
        body : exist
    })
    }catch(e) {
        res.status(403).send({
            err : e
        })
    }
})  

router.put('/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
      user.update({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        telephone: req.body.telephone 
      })
      res.status(200).send(user)
      user.save()
    }).catch((e) => {
        res.status(500).send({
            err: `all the fileds required ${e}`
        })
    })
})


//DELETE ----- delete a user
router.delete('/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
        user.destroy()
        res.status(200).send(user)
    }).catch((e) => {
        res.status(403).send({
            err : `error deleting a user ${e}`
        })
    })
})
module.exports = router