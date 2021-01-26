const { User } = require('../models/db')
const router = require('express').Router()
const { sign } = require('../utils/jwt')
const { hashPass, matchPass } = require('../utils/password')
const { sanitization } = require('../utils/security')


//GET ----- get all users
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
    
    const existing = await User.findOne({where: {email: req.body.user.email}})
    
    try {

    if(existing) throw 'user with this email exists'
    
    await User.create({
        name: req.body.user.name,
        password: await hashPass(req.body.user.password),
        email: req.body.user.email,
        address: req.body.user.address,
        telephone: req.body.user.telephone,
    }).then(async(user) => {
        user.token = await sign(user)
        user.save()
        res.status(200).send(user)
    })
    }catch(e) {
        res.status(403).send({
         err : `${e}`   
        })
    } 
})

//POST ---- Login a new user
router.post('/login', async(req, res) => {

    try {
    
    const exist = await User.findOne({email: {email: req.body.user.email}})
    
    // console.log(exist.toJSON());
    if(!exist) throw 'user with this email not exists'

    const myJson = exist.toJSON();
    let myPass = myJson.password;


    //Validate Password
    const passMatch = await matchPass(myPass, req.body.user.password)
    if(!passMatch) throw 'password does not match'
    exist.token = await sign(exist)
    // sanitization(myJson)
    res.status(200).send({
        body : exist.token
    })
    }catch(e) {
        res.status(403).send({
            err : "Login Failed check for the credentials"
        })
    }
})  


//DELETE ----- delete a user
router.delete('/:id/delete', (req, res) => {
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