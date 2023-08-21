"use client"
import React, { useEffect, useState } from 'react'

import getData from '../../serverHooks/getWebinarData'
import { Stack } from '@mui/material'
import Link from 'next/link'
import { useLoadContext } from '../../state/Context'
import dynamic from 'next/dynamic'
const CardComp =dynamic(()=>import('./component/CardComp'),{loading:()=>(<p>loading...</p>)})
function Page() {
  const { load, setLoad } = useLoadContext()
  
  const [data, setData] = useState()
  const fetchAgain = async () => {
       getData('/api/instructor').then((res) => setData(res))
  }
   
  useEffect(() => {
    fetchAgain();
setLoad(false)
  }, [])
  if (load) {
   return <p>loading ...</p>
  }
  return (
    <div className='p-4'>
    <Stack spacing={4} direction='row' className='' >
        {data && data.map((d) => (
          <Link  href={{
            pathname: `/portal/instructor/${d?.slug}`,
            query: {data: d.id}

  }} prefetch={true}>
          <CardComp setLoad={setLoad} key={d.id} data={d} /></Link>))}
    </Stack></div>
  )
}

export default Page