const authByToken = require('../middlewares/auth')
const { User } = require('../models/db')
const { hashPass } = require('../utils/password')

const router = require('express').Router()


//GET the data for the current user 
router.get('/:email', authByToken, (req, res) => {
    //Check if the user exists or not
    User.findOne({where:{email : req.params.email}})
    .then((user) => {
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send({
            err : {body : [`No such user exists ${e}`]}
        })
    })
})

//PATCH to patch the data of the current user
router.patch('/:id/update', async (req, res) => {
    
    try {
    const user = await User.findOne({where: {id: req.params.id}})

    await user.update({
        name: user.name != undefined ? user.name = req.body.name : user.name,
        password: await hashPass(user.password != undefined ? user.password = req.body.password : user.password),
        email: user.email != undefined? user.email = req.body.email: user.email,
        address: user.address != undefined? user.address = req.body.address: user.address,
        telephone: user.telephone != undefined ? user.telephone = req.body.telephone : user.telephone 
    })
    user.save()
    res.status(200).send({
        body : 'successfully added to the db'
    })
    }catch(e) {
        res.status(500).send({
           err: `error ${e}`
        })
    }
})
module.exports = router