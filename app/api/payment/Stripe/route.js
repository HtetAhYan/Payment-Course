import { NextResponse } from "next/server";
import { stripe } from '../../../serverHooks/Stripe'
export const POST = async(request) => {
  const items = await request.json();


  try {
    const CheckoutSession = await stripe.checkout.sessions.create({
      line_items: items.map(item => ({ 
        
        price_data: {
          currency: "usd",
          product_data: {
            name: item.webinarData.slug,

          },unit_amount: item.webinarData.price *100
        },quantity: 1
      })),
      mode: 'payment',
      success_url: "http://localhost:3000/success",
     cancel_url:"http://localhost:3000/cancel"
    })
return NextResponse.json({url : CheckoutSession.url})
  } catch (error) {
  
    return NextResponse.json({error:error.message},{status:500})
  }
}