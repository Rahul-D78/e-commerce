const jwt = require('jsonwebtoken')
const { User } = require('../models/db')

const JWT_secret = 'some-secret-key'

function sign(user) {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, JWT_secret, (err, encoded) => {
            if(err) return reject(err)
            resolve(String(encoded))
        })
    })
}

async function decode(token){
   return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_secret, (err, decoded) => {
          if(err) return reject(err)
          resolve(new User(decoded))
      })
   })
}

async function oauth(token) {
    return new Promise((resolve, reject) => {
        jwt.decode(token)
        .then((err, decoded) => {
            if(err) return reject(err)
            resolve(new User(decoded))
        })
    })
}

//FOR Testing purpose only !!!!!

// async function run() {
//     const token = await sign({name: "arnav bhaiya", email: "new_email"})
//     console.log(token);
//     const decode_token = await decode(token)
//     console.log(decode_token);
// }

// run()

module.exports = { sign , decode, oauth}