const express = require("express");
const router = express.Router();
router.post("/foodData",async (req,res)=>{
try{
res.send([global.food_items,global.food_category])
}catch(err){
    console.log(err)
    res.send("Server Error Cant find food items")
}
})
module.exports=router