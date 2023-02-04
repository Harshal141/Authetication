// Creating express Router
const express=require("express")
const router=express.Router()
  
// @route  GET /register
// @desc   frender register page
// @access public
router.get("/register",(req,res,next)=>{
  res.render('register')
})

// @route  POST /register
// @desc   for registering user
// @access private
router.post('/register', async (req, res) => {
    const {name, email, password} = await req.body; // destructure

    try {
        let user = await User.findOne({email});
        if(user){ // return error of type as above if user exists 
            return res.status(500).redirect('/register');
        }

        user = new User({ // create new user instance
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10); // generate salt
        user.password = await bcrypt.hash(password, salt); // hash password

        // save user to database
        await user.save(); 
        return res.redirect('/login');

    } catch(err){
        console.error(err.message);
        res.status(500).redirect('register.ejs');
    }   
});

module.exports=router