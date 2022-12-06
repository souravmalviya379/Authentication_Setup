const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    return res.render('home', {
        title: "Home Page"
    })
})

router.use('/users', require('./users'));
module.exports = router;