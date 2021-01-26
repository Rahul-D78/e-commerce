const { decode } = require("../utils/jwt");
require('express')

async function authByToken(req, res, next) {
   const head = req.header('Authorization')
   
   if(!head) return res.status(401).send({
       err : {body : ["Authorization Failed"]}
   })
   if(head.split(' ')[0] != 'Token') return res.status(401).send({
       err : {body : ["Token missing"]}
   })
   
   const token = head.split(' ')[1];
   try {
       const user = await decode(token)
       if(!user) throw 'No user Found in Token'
       req.body.user = user
       next()
    }catch(e) {
      res.status(500).send({
          err : e
      })
    }
}
module.exports = authByToken