const { User } = require('../models/db')
const router = require('express').Router()


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


//POST ------ add a new user
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        telephone: req.body.telephone
    }).then((user) => {
        user.save()
        res.status(200).send(user)
    }).catch((e) => {
        res.status(403).send({
            err : `error creating a post`
        })
    })
})

//PATCH ---- update a user
router.patch('/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then((user) => {
        user.update({
            name: req.body.name
        })
        res.status(200).send(user)
        res.save()
    }).catch((e) => {
        res.status(403).send({
            err : "error updating a user"
        })
    })
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