import Paper from "@/model/Paper";
import User from "@/model/User";
import connect from "@/utils/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/utils/mailer";
import { getDataFromToken } from "@/utils/getDataFromToken";
connect();

export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const {name, publicID} = body;
        const token = request.cookies.get('token')?.value || '';
        const user = await getDataFromToken(request) as {id:string , email:string};
        // console.log(name, publicID, user);

        const paper = new Paper({
            name: name,
            publicID: publicID,
            authorID: user.id
        });
        const  savedPaper = await paper.save();
        await sendEmail({email:user.email, emailType:"SUBMISSION", userId:user.id});
        return NextResponse.json({message:'Submission Successful', success:true, savedPaper});
    }
    catch(error:any){
        console.log(error);
        return NextResponse.json({error:error.message}, {status:500});
    }

}