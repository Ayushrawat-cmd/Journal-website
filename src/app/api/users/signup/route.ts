import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connect from "@/utils/dbconfig";
import User from "@/model/User";
import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

connect();

export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const {email,password,city, state, country, phone, fullname} = body;
        const user = await User.findOne({email:email});
        if(user){
            return NextResponse.json({error: 'User already exists'}, {status:500});
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            email:email,
            password:hashedPassword,
            country:country,
            mobile_no:phone,
            name:fullname,
            city: city,
            state: state
        });
        const savedUser = await newUser.save();
        return NextResponse.json({message: "successfully created the user",success:true,savedUser});
    }
    catch(error){
        return NextResponse.json({error: error},{status:500});
    }
}
