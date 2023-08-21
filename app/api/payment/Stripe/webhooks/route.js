/* import {  NextResponse } from "next/server"
import { buffer } from "micro"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client";
export const config = {
  api: {
    bodyParser: false,
  }
};
let event;

export const POST = async (req) => {
const prisma=new PrismaClient()
const stripe=new Stripe(process.env.STRIPE_KEY)
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']
  const webHooksSecret = process.env.STRIPE_WEBHOOKS;
  
  try {
    if (!sig || !webHooksSecret) return;
    event = stripe.webhooks.constructEvent(buf, sig, webHooksSecret)

    if (event.type === "checkout.session.completed") {
 await prisma.users.create({
   data: {
     email:"test",
     full_name:"gi9",
     role_id:2,
     role_name: "user",
     created_at:0
}
 })
      
    }
   
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({error:error.message},{status:400})
  }

  return NextResponse.json({status:200},event)

}
export const GET = () => {
  return NextResponse.json({status:200},{event:event})
} */