import { redirect } from "next/dist/server/api-utils"

export default async function getData() {

  const res = await fetch('/api/admin',{next:{tags:['table']}})

 
  if (!res.ok) {
    redirect('/')
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}