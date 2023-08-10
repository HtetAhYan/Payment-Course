"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

function Providers({children,session}) {
  return (
      <SessionProvider session={session}>
          {children}
   </SessionProvider>
  )
}

export default Providers