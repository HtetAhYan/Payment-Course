import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() { 
    
    
    const prisma = new PrismaClient();
    const user = await prisma.users.findMany();
    return NextResponse.json(user);

}