const express = require('express')
const router = express.Router()

router.use(require('./notes'));

router.get('*', (req,res)=>{
    res.status(200).json({
        status: 404,
        message: "Route not found",
        body: []
        })
})



module.exports = router