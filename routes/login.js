// Creating express Router
const express=require("express")
const router=express.Router()

// @route  GET /login
// @desc   render login page
// @access public  
router.get("/login",(req,res,next)=>{
  res.render('login')
})

module.exports=router