import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function getDataFromToken(request:NextRequest) {
    try{
        const token = request.cookies.get("token")?.value || '';
        // console.log(token)
        const decodeToken = await jwt.verify(token, process.env.TOKEN_SECRET!) ;
        // console.log(decodeToken);
        return decodeToken;
    }
    catch(error){
        throw new Error("Token not found");
    }
}