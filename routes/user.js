const authByToken = require('../middlewares/auth')
const { User } = require('../models/db')

const router = require('express').Router()


//GET the data for the current user 
router.get('/', authByToken, (req, res) => {
    //Check if the user exists or not
    User.findOne({where:{email : req.body.email}})
    .then((user) => {
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send({
            err : {body : [`No such user exists ${e}`]}
        })
    })
})

//PATCH to patch the data of the current user
router.patch('/', (req, res) => {

})
module.exports = router