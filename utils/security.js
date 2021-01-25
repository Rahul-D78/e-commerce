const { User } = require("../models/db");

function sanitization(user) {
    if(user.password) delete user.password
    return user
} 

module.exports = {sanitization}