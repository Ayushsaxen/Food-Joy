const express=require("express");
const router=express.Router();
const userorder=require("../models/OrderSchema");
const mongoose=require("mongoose")

const userorderSchema=new mongoose.Schema({
    email:{
        type:String,
        required:false,
    },
    date:{
        type:Date
    },
    price:{
        type:Number

    },
    order_data:{
        type:Array,
        required:false,
    }
})
const allCustOrder=mongoose.model("allCustOrder",userorderSchema);



router.post("/cartorderdata",
    async (req, res) => {
        try {
            const orderDate=new Date();
            
            await allCustOrder.create({
                email: req.body.email,
                date:orderDate,
                price:req.body.price,
                order_data:req.body.order
            })
            res.json({ success: true })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })
    module.exports = router;
   
    