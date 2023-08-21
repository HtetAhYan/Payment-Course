'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'


import { redirect, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'



export default  function Page() {
  const router = useRouter()
  const { status, data: session } = useSession()
 
  
  useLayoutEffect(() => {
 

    if (status !== 'authenticated') {
      redirect('/login');
    }
    if(session?.user?.role_name !=='admin'){
      redirect('/admin');
    }if(session){
      redirect('/cart');
    }
  }, [status, router]);
  ;
 
  

if (status === 'authenticated') {
      return (
    <div className=" bg-slate-200 min-h-screen">
    
    <h1 onClick={()=>signOut()}>hello admin</h1>
    </div>
      )
    
  } 

}


