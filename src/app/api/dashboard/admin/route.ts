import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbconfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import Paper from "@/model/Paper";

connect();

export async function GET(request:NextRequest){
    try{
        const user = await getDataFromToken(request) as {id:string , email:string};
        // console.log(user.email);
        if(user.email !== "ayushrawat324@gmail.com"){
            throw new Error("Not authorized");
        }
        const papers = await Paper.find().populate({path: 'authorID', model:'user', select:'name'});
        // console.log(papers);
        return NextResponse.json({message:"Papers found!", papers});
    }
    catch(error:any){
        console.log(error.message);
        return NextResponse.json({error:error.message},{status:401});
    }
}

export async function PUT(request:NextRequest) {
    try{
        const user = await getDataFromToken(request) as {id:string , email:string};
        console.log(user.email);
        if(user.email !== "ayushrawat324@gmail.com"){
            throw new Error("Not authorized");
        }
        const body = await request.json();
        const {status, paper_id} = body;
        console.log(paper_id);
        const paper = await Paper.updateOne({_id:Object(paper_id)},{status:status});
        // paper.status = status;
        // const finalPaper = await paper.save();
        return NextResponse.json({message:"Papers found!", paper});
    }
    catch(error:any){
        console.log(error.message);
        if(error.message !== "Not authorized")
            return NextResponse.redirect(new URL("/", request.nextUrl));
        return NextResponse.json({error:error.message},{status:401});
    }
}