const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    date:{
        type:Date,
        default:Date.now
    }
});
userModel=mongoose.model("user",UserSchema);
module.exports=userModel;