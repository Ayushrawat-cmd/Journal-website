import mongoose from "mongoose";
import { NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/model/User";
import connect from "@/utils/dbconfig";

connect();

export async function POST(request: NextRequest){
    try{
        // const body = await request.json();
        // const {email, password} = body;
        // const user = await User.findOne({email:email});
        // if(!user){
        //     return NextResponse.json({error:'No user found'}, {status:401});
        // }
        return NextResponse.json({message:'Successfully logged in'},{status:200});
    }
    catch(error:any){   
        return NextResponse.json({error:error.message}, {status:500});
    }
};

