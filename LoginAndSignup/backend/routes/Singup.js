const express = require('express');
const router = express.Router();

router.get('/Signup',(req, res)=>{
    res.sendFile(path.join(__dirname,'public','Signup.html'))
})


module.exports = router;
