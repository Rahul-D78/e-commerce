const bcrypt = require('bcrypt')

const salt = 10

async function hashPass(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, salt, (err, hashed) => {
            if(err) return reject(err)
            resolve(hashed)
        })
    })
}

async function matchPass(hash, pass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, hash, (err, same) => {
            if(err) return reject(err)
            resolve(same)
        })
    })
}

module.exports = {hashPass, matchPass}