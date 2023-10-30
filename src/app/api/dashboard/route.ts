import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/dbconfig";
import { getDataFromToken } from "@/utils/getDataFromToken";
import Paper from "@/model/Paper";

connect();

export async function GET(request:NextRequest){
    try{
        const user = await getDataFromToken(request) as {id:string , email:string};
        console.log(user.email);
        const papers = await Paper.find({authorID: Object(user.id)});
        return NextResponse.json({message:"Papers found!", papers});
    }
    catch(error:any){
        return NextResponse.json({error:error.message},{status:402});
    }
}