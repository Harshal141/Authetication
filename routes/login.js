// Creating express Router
const express=require("express")
const router=express.Router()

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route  GET /login
// @desc   render login page
// @access public  
router.get("/login",(req,res,next)=>{
  res.render('login')
})

// @route  POST /login
// @desc   login user
// @access private
router.post("/login", async (req,res,next)=>{
    
    const {email, password} = req.body; // destructure

    try {
      
        let user = await User.findOne({email});
        
        if(!user){ // return error of type as above if user exists
            return res.redirect('/login');  
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.redirect('/login');
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        // defining the token and sending it back to the client
        jwt.sign(payload, config.get('jwtSecret'), (err, token)=>{
            req.header['x-auth-token'] = token;
            console.log(req.header['x-auth-token']);
            if(err) throw err;
            res.redirect('/');
        });

    } catch(err){
        console.error(err.message);
        res.status(500).redirect('/login');
    }   
}
);

module.exports=router