'use client'
import React, {  useLayoutEffect, useState } from 'react'


import {  useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'



import fetchData from '../serverHooks/FetchProfile'
import dynamic from 'next/dynamic'
const Header = dynamic(() => import('../components/header'), { loading: () => (<p>loading...</p>) })
const Product=dynamic(()=>import('../components/products'),{loading:()=>(<p>loading...</p>)})
export default  function Page() {
  const [data, setData] = useState(null); // State to store fetched data
  const router = useRouter()
  const { status } = useSession()
  useLayoutEffect(() => {
 
fetchData().then((res)=> setData(res))

    
  }, [status, router]);
  console.log(data);

  if (status === 'authenticated' && data?.user?.role_name !=='admin') {
      return (
    <div className=" bg-slate-200 min-h-screen">
      <Header />
      <Product items={data?.cartWithWebinars}/>
    </div>
      )
    
  }  

}


