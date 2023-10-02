import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    mobile_no:{
        type: String,
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
        default:"null"
    },
    state:{
        type:String,
        default:"null"
    },
    country:{
        type:String,
        required:true
    },

});

export default mongoose.models.user || mongoose.model("user", UserSchema);