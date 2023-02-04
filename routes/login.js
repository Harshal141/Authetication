const express=require("express")
  
// Creating express Router
const router=express.Router()
  
router.get("/login",(req,res,next)=>{
  res.render('login')
})

module.exports=router