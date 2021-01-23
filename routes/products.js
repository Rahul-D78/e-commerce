const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('HIT /products End-Point')
})

module.exports = router