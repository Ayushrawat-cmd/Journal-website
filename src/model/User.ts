import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    mobile_no:{
        type: Number,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type: String,

    },
    state:{
        type:String
    },
    country:{
        type:String,
        required:true
    },

});

export default mongoose.models.user || mongoose.model("user", UserSchema);