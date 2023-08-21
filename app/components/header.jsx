"use client"
import { signOut,useSession } from 'next-auth/react'
import React from 'react'

function Header() {
  const { data: session } = useSession()
  console.log(session);
  
  return (
    <div className='w-full h-10 bg-slate-350' >
      
      <button onclick={() => signOut()}>click</button></div>
  )
}
      
export default Header