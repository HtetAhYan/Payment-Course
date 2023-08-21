'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'


import { useSearchParams } from 'next/navigation';

import getData from '../../../serverHooks/getWebinarData';

import {  Stack } from '@mui/material';
const Accord=dynamic(()=>import('./components/Accord'),{loading:()=>(<p>loading...</p>)})
function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('data');
  const [data, setData] = useState([]);

  const fetchId = async () => {
    try {
      const fetchedData = await getData(`/api/instructor/course/${id}`);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchId();
    }
  }, [id]);
console.log(data);
  return (
    <div className='min-h-screen grid justify-center'>
      <Stack direction='column' spacing={4} className='mt-6'>
        {data.map((d) => (
          <Accord key={d.id} data={d} webinar_id={id} />
          
        ))}
       
      </Stack>
      
    </div>
  );
}

export default Page;
