"use client"
import React, { useEffect, useLayoutEffect, useState } from 'react'


import getData from './api/FetchOrder'
import { useLoadContext } from '../state/Context'
import dynamic from 'next/dynamic'

const OrderTable=dynamic(()=>import('./table/Table'),{loading:()=>(<p>loading...</p>)})
function Page() {
  const {load,setLoad} =useLoadContext()
  const [data, setData] = useState([])
  const fetchAgain = async () => {
     getData().then((res) => setData(res))
  }
  useEffect(() => {
   fetchAgain()
    load && fetchAgain()
  }, [load])
  

  return (
    
    <div className='flex'><OrderTable data={data}  /> </div>
  )
}

export default Page