import { prisma } from '../../../lib/prismaAdapter';
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath,  } from 'next/cache';

export async function DELETE(req, res) {
  const session = await getServerSession(authOptions);

  if(session.user.email!=="admin@demo.com"){
    return NextResponse.json({
      status: 401,
      message: "You are Not Admin",
    });
  }
  revalidatePath('table')

  try {
    const id = await req.json();
    console.log(id);
    const orderDelete = await prisma.order_items.deleteMany({
      where: {
        id: id,
      },
    });

    // Return the cart items along with webinar data
    return NextResponse.json({revalidated:true});
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
