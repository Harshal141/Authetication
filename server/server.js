const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const port = 1337;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

connectDB();

app.post('/api/register', async (req, res) => {

    try{

        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.json({status:'error',error:"User already exists"});
        }
        const newUser = new User({
            username:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        await newUser.save();

        res.json({status:'ok'});
    }catch(err){
        console.log(err)
        res.json({status:'error',error:"Server error"});
    }
    console.log(req.body)
});

app.post('/api/login', async (req, res) => {

    try{
        const user = await User.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!user){
            return res.json({status:'error',error:"Invalid email or password"});
        }
        else{
            const token = jwt.sign({
                name: user.name,
                email: user.email},process.env.JWTSECRET);
            res.json({status:'ok', user:token});
        }
    }catch(err){
        console.log(err)
        res.json({status:'error',error:"Server error"});
    }
    console.log(req.body)
});


app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));