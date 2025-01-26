const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const userorderModel=require("./CartOrderData");

router.post("/custorderdata",
    async (req, res) => {
        try {
            async function togetOrder(){
                const orderCollection = await mongoose.connection.db.collection("allcustorders");
                const orderdata = await orderCollection.find({email:req.body.custEmail}).toArray();
             
                return orderdata
                }
            const orderdata=await togetOrder();
           
            res.send(orderdata);
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    })
    module.exports = router;