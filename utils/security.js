function sanitization(user) {
    const deleteField =  user.password
    delete deleteField
} 

module.exports = {sanitization}