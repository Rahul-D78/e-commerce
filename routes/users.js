const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('HIT /users End-Point')
})

module.exports = router