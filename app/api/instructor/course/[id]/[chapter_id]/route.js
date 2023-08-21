import { NextResponse } from "next/server";
import {prisma} from '../../../../../lib/prismaAdapter'

export async function GET(req, { params }) {
    const chapter_id=parseInt(params.chapter_id)
    try {
       const session= await prisma.sessions.findMany({
         where: {
           chapter_id: chapter_id
         }, select: {
           id:true,creator_id:true,chapter_id:true
         }
       })
      
      const sessionTrans =await Promise.all(session.map(async(session) => {
        const data = await prisma.session_translations.findMany({
          where: {
           session_id:session.id
          }
        });
  
        return data;
      }))
        const name=sessionTrans.map((sess)=>{
          return {
            title: sess[0].title,
            session_id: sess[0].session_id,
          
          }
        })
         return NextResponse.json({name,session})
    } catch (error) {
         return NextResponse.json(error,{status:500})
    } finally {
        await prisma.$disconnect()
    }
   
}
export async function POST(req, { params }) {
    function getCurrentTimestamp () {
  return Date.now()
}
  const webinar_id = parseInt(params.id)
  
  const {data,timestamps}= await req.json()
  const chapter_id= parseInt(params.chapter_id)
  try {
    const webinar= await prisma.webinars.findUnique({
      where: {
        id: webinar_id
      }
    })
    const newSessions= await Promise.all(timestamps.map(async(timestamp)=>{
        const newSession=await prisma.sessions.create({
     data:{
       creator_id: webinar.creator_id,
       chapter_id: chapter_id,
       webinar_id: webinar.id,
      date:timestamp,duration:parseInt(data.duration),link:data.url,session_api:'local',created_at:getCurrentTimestamp()
     }
        })
      return newSession
    }))
      const newChapterSessions= await Promise.all(newSessions.map(async(session)=>{
        const newchap=await prisma.webinar_chapter_items.create({
     data:{
      user_id: session.creator_id,
       chapter_id:session.chapter_id,
            item_id: session.id, type: 'session',
  
    created_at:getCurrentTimestamp()
     }
        })
      return newchap
    }))
    const newSessionsTrans= await Promise.all(newSessions.map(async(newSession)=>{
      const trans=await prisma.session_translations.create({
        data:{
         
        title: data.title,
        session_id: newSession.id,
          locale: 'en',
        description:"hi"
    
        }
      })
      return trans
    }))
 

    
   return NextResponse.json(newSessionsTrans,newChapterSessions)
 } catch (error) {
  return NextResponse.json(error,{status:500})
  
 }
}