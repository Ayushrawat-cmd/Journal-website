import mongoose from "mongoose";
import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/model/User";
import connect from "@/utils/dbconfig";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        const {email, password} = body;
    
        console.log(email);
        
        const user = await User.findOne({email:email});
        if(!user){
            return NextResponse.json({error:'No user found'}, {status:401});
        }
        const validPassword=  bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error:'Invalid Password'}, {status:401});
        }
        const tokenData=  {
            id: user._id,
            email:email,
            password:user.password
        }
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:'1d'});
        const response = NextResponse.json({message:'Login Successful', success:true, token:token});
        response.cookies.set("token", token, {
            httpOnly:true
        });
        return response;
        // return NextResponse.json({message:'Successfully logged in'},{status:200});
    }
    catch(error:any){   
        return NextResponse.json({error:error.message}, {status:500});
    }
};

