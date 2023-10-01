import { NextResponse,NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup';
    // const token = request.cookies.get('token')?.value || '';
    console.log(request.nextUrl.origin)
    // if(isPublicPath && 'token'){
    //     // const url = request.nextUrl.clone()
    //     // url.pathname = '/profile'
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }
    // if(!isPublicPath && !'token')
    //     return NextResponse.redirect(new URL('/login', request.nextUrl));

    // return NextResponse.redirect(new URL('/home', request.nextUrl));
}

export const config = {
    matcher:[
        '/',
        '/login',
        '/signup'
    ]
}
