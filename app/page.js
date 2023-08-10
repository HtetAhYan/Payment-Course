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
  const { data: session,status } = useSession()
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


const cartItems = [
    { id: 1, name: "Product A", price: 10.99 },
    { id: 2, name: "Product B", price: 19.99 },
    { id: 3, name: "Product C", price: 8.49 },
  ];

  if (status === 'authenticated') {
      return (
    <div className=" bg-slate-200 min-h-screen">
      <Header />
      <Product items={data}/>
    </div>
      )
    
  }else router.push('/login')

}


