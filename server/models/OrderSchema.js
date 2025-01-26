const mongoose=require("mongoose");

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
const userorder=mongoose.model("alorder",userorderSchema);
module.export=userorder