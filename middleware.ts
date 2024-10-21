import { NextResponse, NextRequest } from 'next/server'
import { verifyToken }  from './actions/verifyToken'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  const baseUrl = new URL(request.nextUrl).origin
  const token = request.cookies.get('token')?.value

  if(!token) return NextResponse.redirect(`${baseUrl}/auth`)

  const userPayload = await verifyToken(token)

  if(!userPayload) return NextResponse.redirect(`${baseUrl}/auth`)

  if(userPayload.email !== process.env.ADMIN_EMAIL && userPayload.name !== process.env.ADMIN_NAME) {
    return NextResponse.redirect(`${baseUrl}/auth`)
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}