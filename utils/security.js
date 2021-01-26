function sanitization(user) {
    const deleteField =  user.password
    delete deleteField
} 

exports = module.exports = {sanitization}