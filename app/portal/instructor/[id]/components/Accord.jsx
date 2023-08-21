import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import getData from '../../../../serverHooks/getWebinarData';
import { Button, IconButton, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputComponent from './inputComponent';
const SessionAcord = dynamic(() => import('./SessionAccord'), { loading: () => (<p>loading...</p>) });

function Accord({ data, webinar_id }) {
  const [chap, setChap] = useState();
  const [open, setOpen] = useState(false)
     const handleOpen = () => setOpen(!open);
const url=`/api/instructor/course/${webinar_id}/${data.chap_id}`
  const FetchChapter = async () => {
    try {
      const fetchedData = await getData(`/api/instructor/course/${webinar_id}/${data.chap_id}`);
      setChap(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (data.chap_id) {
      FetchChapter();
    }
  }, []);

  const sessions = chap?.name;
  const chap_id=chap?.session
console.log(url);
  return (<>
    <div className="bg-base-200 min-w-[500px] justify-self-center">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div className="collapse-title text-xl font-medium">
        {data.title}
      </div>  
      {sessions && sessions.map((session) => {
  const matchFound = chap_id.some((chapId) => session.session_id === chapId.id);
  if (matchFound) {
    return <SessionAcord data={session} key={session.id} url={url}/>
  }
  return null;
      })}
       <Button className='bg-violet-500 m-4' color='secondary' variant='contained' startIcon={<AddIcon />} onClick={handleOpen} >
<p className='text-sm'>Add new session</p>
      </Button>
    {open && <InputComponent url={url}/>}
    </div>
     
    </>
  );
}

export default Accord;
