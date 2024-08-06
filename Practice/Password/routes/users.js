const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/register',(req,res)=>{
    res.render('register')
})


router.get('/login',(req,res)=>{
    res.render('login')
})


// For login
router.post('/login',async (req,res)=>{
    const { email,password } = req.body
    console.log(req.body)
    User.findOne({email:email})
    .then(async (user)=>{
        if(!user){
            res.status(400).send({msg:"No User found"})
        }
        
        const checkPassword = await bcrypt.compare(password,user.password);
        if(checkPassword){
            console.log(user)
            res.render('dashboard',{
                name:user.name
            })
        }else{
            res.status(400).send({msg:"No User found"})
        }
        
    })

    
})



// For register
router.post('/register', async (req,res)=>{
    const {name,email,password,password2} = req.body
    let error = [];


    if(!name || !email || !password || !password2){
        error.push({  msg:"Please Fill all the required Details" });
    }

    if(password !== password2){
        error.push({  msg:"Password do not matches" });
    }

    if(password.length < 6){
        error.push({  msg:"Password must be at least 6 characters" });
    }
   

    if(error.length > 0){
        res.render('register',{
            error,
            name,
            email,
            password,
            password2
        })

   
    }else{
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password,salt); 
        
        User.findOne({email:email})
        .then((u)=>{
            if(u){
                error.push({msg:"Email already exists"})
                res.render('register',{
                    error,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
                           
                const newUser = new User({
                    name,
                    email,
                    password:hashPassword
                })
                newUser.save()
                .then(()=>{
                    console.log("User registered successfully")
                })
                .catch(err=>error.push({msg:err}))
                res.redirect('/users/login')
            }
        })
    }

})


router.get('/logout',(req,res)=>{
    res.redirect('/users/login')
})




module.exports = router