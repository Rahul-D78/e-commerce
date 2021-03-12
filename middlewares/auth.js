const { decode, oauth } = require("../utils/jwt");
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
   const isCustomAuth = token.length < 500; 

   let user;
   try {

       if(token && isCustomAuth) {
            user = await decode(token)
            if(!user) throw 'No user Found in Token'
            req.body.user = user;
            req.userId = user.id;
       
        }else {
            user = await oauth(token);
            if(!user) throw 'No user found'
            // req.body.user = user;
            // req.userId = user.sub;
        }
       next()
    }catch(e) {
      res.status(500).send({
          err : e
      })
    }
}
module.exports = authByToken