import { NextResponse } from "next/server"
import { prisma } from "../../../../lib/prismaAdapter"
export async function GET(req, { params }) {
  const id=parseInt(params.id)
try {
  const webinars = await prisma.webinars.findMany(
    {
      where: {
       id:id
     }
    }
  )

    const chapterWebinar = await Promise.all(
      webinars && webinars.map(async(webinar) => {
        const data = await prisma.webinar_chapters.findMany({
          where: {
        webinar_id:webinar.id
      }
        });
        return data;
      })
  );
 const chapterWebinarTransPromises = chapterWebinar[0].map(async (chapter) => {
      const data = await prisma.webinar_chapter_translations.findMany({
        where: {
          webinar_chapter_id: chapter.id,
        },
      });
      return data;
    });

    const chapterWebinarTrans = await Promise.all(chapterWebinarTransPromises);

 const chaps = chapterWebinarTrans.map((chapter) => {
  
 return chapter.map((chap) => ({
        title: chap.title,
        chap_id: chap.webinar_chapter_id,
      }));
 })
  
    // Return the cart items along with webinar data
const mappedData = chaps.map((chapterArray) => ({
  title: chapterArray[0].title,
  chap_id: chapterArray[0].chap_id,
}));
  
    return NextResponse.json(mappedData);
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  } finally {
    // Call $disconnect in a finally block after your try-catch block
    await prisma.$disconnect()
  }
  
  

}
