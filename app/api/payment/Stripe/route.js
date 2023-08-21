import { NextResponse } from "next/server";
import { stripe } from '../../../serverHooks/Stripe'
import {prisma} from '../../../lib/prismaAdapter'

import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
 // Import the function getCurrentTimestamp from the appropriate location

export const POST = async (request) => {
  function getCurrentTimestamp () {
  return Date.now()
}
  const items = await request.json();

  const session = await getServerSession(authOptions);
  try {
    const email = session.user.email;

    
    const user = await prisma.users.findUnique({
      where: { email: email },
      select: {
        id: true,
        full_name: true,
        role_id: true,
        role_name: true,
      },
    });

    const cart = await prisma.cart.findMany({
      where: { creator_id: 1046 },
    });

    if (!user) {
      return NextResponse.error('User not found', { status: 404 });
    }

    const CheckoutSession = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.slug,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Create order items for each item in the cart
    for (const item of items) {
      await prisma.order_items.create({
        data: {
          user_id: user.id,
          order_id: getCurrentTimestamp(),
          webinar_id: item.id,
       
          amount: item.price,
          created_at: getCurrentTimestamp(),
        },
      });
    }

    return NextResponse.json({ url: CheckoutSession.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
