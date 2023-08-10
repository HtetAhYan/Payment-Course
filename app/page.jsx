'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './components/header'
import Product from './components/products'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import getData from './serverHooks/getWebinarData'

export default  function Page() {
  const [data, setData] = useState(null); // State to store fetched data
  const router = useRouter()
  const { status } = useSession()
  useLayoutEffect(() => {
 
    async function fetchData() {
      try {
        const responseData = await getData();
        setData(responseData);
      } catch (error) {
        // Handle error
        console.error(error);
      }
   
    }

    fetchData(); // Call the fetch function when the component mounts

    if (status !== 'authenticated') {
      router.push('/login');
    }
  }, [status, router]);
  if (status === 'authenticated') {
      return (
    <div className=" bg-slate-200 min-h-screen">
      <Header />
      <Product items={data}/>
    </div>
      )
    
  } 

}


