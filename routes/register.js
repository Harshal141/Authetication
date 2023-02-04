const express=require("express")
  
// Creating express Router
const router=express.Router()
  
router.get("/register",(req,res,next)=>{
  res.render('register')
})

module.exports=router