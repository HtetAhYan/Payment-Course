"use client"
import React from 'react'
import Login from './Form'
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

export default async function page() {

  const { data: session } = useSession();

    if (session?.user.email==="admin@demo.com") {
   redirect('/admin') 
  }
  
  if(session) {
   redirect('/cart') // Redirect if the user is already logged in
  }

  return (
    <div className="grid min-h-screen">
      <h1>
      
      </h1>
      <Login/>
    </div>
  )
}

