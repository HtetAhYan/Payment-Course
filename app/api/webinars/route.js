
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {prisma} from '../../lib/prismaAdapter'
export async function GET(){
 const session = await getServerSession(authOptions)


if(!session){
     return NextResponse.json({
      status: 401,
      message: "Please login",
    })
   
  }
  try {
    const email = session.user.email;
    

    const user = await prisma.users.findUnique({
      where: { email: email }, select: {
        id:true,  
  full_name:true,role_id:true,role_name:true,
      }
    });
const cart = await prisma.cart.findMany({
      where: {creator_id:user.id}
    });
    if (!user) {
      return NextResponse.error('User not found', { status: 404 });
    }
  const cartWithWebinars = await Promise.all(
      cart.map(async (c) => {
        const webinar = await prisma.webinars.findUnique({
          where: { id: c.webinar_id },
        });
        return webinar;
      })
    );

    // Return the cart items along with webinar data
    return NextResponse.json({cartWithWebinars,user});
  } catch (error) {
    return NextResponse.error('An error occurred', { status: 500 });
  } finally {
    // Call $disconnect in a finally block after your try-catch block
    await prisma.$disconnect()
  }
  
 
}