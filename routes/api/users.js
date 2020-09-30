const { request } = require('express')

const User = require('../../db').User
const route = require('express').Router()

route.get('/', (req, res) => {
    //we want to send an array of all users from our database
    User.findAll()
        .then((users) => {
            res.status(200).send(users)
        })
        .catch((err) => {
            res.status(500).send({
                error: "could not retrive users"
            })
        })
})

route.post('/', (req, res) => {
    //expect the req to have the name in it

    User.create({
        name: req.body.name
    }).then((user) => {
        res.status(200).send(user)
    }).catch((err) => {
        res.status(500).send({
            error: "could not add a new user"
        })
    })
})

exports = module.exports = route;