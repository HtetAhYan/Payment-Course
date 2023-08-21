import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const prisma = new PrismaClient();

/*   const { user_id,webinar_id } = req.json(); */


 /*  if (session.user.email !== "admin@demo.com") {
    return NextResponse.json({
      status: 401,
      message: "You are Not Admin",
    });
  } */

  try {
    const { user_id, webinar_id,order_id } = await req.json();
    const owner = await Promise.all(
      webinar_id.map(async (c) => {
        const id = await prisma.webinars.findUnique({
          where: { id: c },
        });
        return id;
      })
    );
    const enrollUser= await Promise.all(
      owner.map(async (own) => {
        const id = await prisma.sales.create({
          data: {
            webinar_id:own.id,
            buyer_id: user_id
            , seller_id: own.creator_id,
            created_at: 0,type:'webinar','amount':300,access_to_purchased_item:true,manual_added:true
            
        }
        });
        return id;
      })
    );
 const deleteOrder=await prisma.order_items.deleteMany({
   where:{id:order_id}
 })
    // Return the cart items along with webinar data
    return NextResponse.json({deleteOrder});
  } catch (error) {
    return NextResponse.error('An error occurred', { status: 500 });
  } finally {
    // Call $disconnect in a finally block after your try-catch block
    await prisma.$disconnect();
  }
}
