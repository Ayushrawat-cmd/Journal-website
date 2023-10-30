import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PaperSchema = new Schema({
    authorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    publicID:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Submitted"
    }
},{
    timestamps:true
});

export default mongoose.models.paper || mongoose.model("paper", PaperSchema);

