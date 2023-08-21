

import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from 'next/server';
export async function GET() {
    const prisma=new PrismaClient()
    const session=await getServerSession(authOptions)
    try {
        const email = 'instructor@demo.com'
        const user = await prisma.users.findUnique({
            
            where: {
                email: email
            }, select: {
                id:true,full_name:true
            }
        });
        const myCourses=await prisma.webinars.findMany({
            where: {
                creator_id: user.id
            }
        })
   
        return NextResponse.json(myCourses)
    } catch (error) {
        return NextResponse.error('An error occurred', { status: 500 });
    }finally{
        prisma.$disconnect()
    }
}