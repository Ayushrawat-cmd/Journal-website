import mongoose from "mongoose";

export default function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("DB connected");
            
        });
    }
    catch(error){
        console.log("Some error occured", error);

    }
}