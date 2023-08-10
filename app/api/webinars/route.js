import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req,res){
 const session = await getServerSession(authOptions)
  const prisma = new PrismaClient();

if(!session){
    res.status(401).json({ message: "You must be logged in." });
    return;
  }
  try {
    const email = session.user.email;
    
    const prisma = new PrismaClient();
    const user = await prisma.users.findUnique({
      where: { email: email }, select: {
        id:true,  
  full_name:true,role_id:true,role_name:true,
      }
    });
const cart = await prisma.cart.findMany({
      where: {creator_id:1046}
    });
    if (!user) {
      return NextResponse.error('User not found', { status: 404 });
    }
  const cartWithWebinars = await Promise.all(
      cart.map(async (c) => {
        const webinar = await prisma.webinars.findUnique({
          where: { id: c.webinar_id },
        });
        return {  webinarData: webinar };
      })
    );

    // Return the cart items along with webinar data
    return NextResponse.json(cartWithWebinars);
  } catch (error) {
    return NextResponse.error('An error occurred', { status: 500 });
  } finally {
    // Call $disconnect in a finally block after your try-catch block
    await prisma.$disconnect()
  }
  
 
}