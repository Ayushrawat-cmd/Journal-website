import { NextResponse,NextRequest } from "next/server";
import { getDataFromToken } from "./utils/getDataFromToken";
// import Chain from "./Middlewares/Chain";
// import { Auth } from "./Middlewares/Auth";
// import {UploadFile} from "./Middlewares/UploadFile";

export async function middleware(request:NextRequest){
    const path = request.nextUrl.pathname;
    const restrictedPath = path === '/dashboard' || path === '/add-paper' ;
    const token = request.cookies.get('token')?.value || '';
    const loginSignuproute = path === '/login' || path ==='/signup';
    const adminPath = path === '/dashboard/admin';
    // console.log(request.nextUrl.origin)
    // if(loginSignuproute && token){
    //     return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    // // }
    // if(adminPath && token){
    //     try{
    //         const user = await getDataFromToken(request) as {email:string};
    //         console.log(user.email);
    //         if(user.email !== "ayushrawat324@gmail.com"){
    //             return NextResponse.redirect(new URL('/dashboard', request.nextUrl))    
    //         }

    //     }
    //     catch(error){
    //         console.log(error);

    //     }
    // }
    if( loginSignuproute && token){
        // const url = request.nextUrl.clone()
        // url.pathname = '/profile'
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
    if(restrictedPath && !token)
        return NextResponse.redirect(new URL('/login', request.nextUrl));

    // return NextResponse.redirect(new URL('/home', request.nextUrl));

}
// export default Chain([Auth, UploadFile]);
export const config = {
    matcher:[
        '/',
        '/login',
        '/signup',
        '/add-paper',
        '/dashboard',
        '/dashboard/admin',
    ]
}
