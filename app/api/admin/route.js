import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(){
 const session = await getServerSession(authOptions)
  const prisma = new PrismaClient();



  if(session.user.email !=="admin@demo.com"){
    return NextResponse.json({
      status: 401,
      message: "You are Not Admin",
    });
  }
  
  try {
  
    const email = session.user.email;
    const prisma = new PrismaClient();
    const order = await prisma.order_items.findMany()
      
  const webinars = await Promise.all(
      order.map(async (c) => {
        const webinar = await prisma.webinars.findUnique({
          where: { id: c.webinar_id },
        });
        return webinar;
      })
    );
      const users = await Promise.all(
      order.map(async (c) => {
        const user = await prisma.users.findUnique({
          where: { id: c.user_id },
        });
        return user;
      })
    );


    // Return the cart items along with webinar data
    return NextResponse.json({ order, users, webinars }, { revalidated: true });
  } catch (error) {
    return NextResponse.error('An error occurred', { status: 500 });
  } finally {
    // Call $disconnect in a finally block after your try-catch block
    await prisma.$disconnect()
  }
  
 
}