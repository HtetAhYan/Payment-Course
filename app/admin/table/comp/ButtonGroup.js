import { Button } from '@mui/material'
import React from 'react'
import {Approve,Reject} from '../../func/Controller'
function ButtonGroups({ row,setLoad }) {
    console.log(row);
  return (
<>
    <Button variant="contained"className='bg-red-900 mr-4' onClick={()=> Reject(row.id,setLoad)} >
        Reject
      </Button> 
      <Button variant="contained" className='bg-green-900' onClick={()=> Approve(row,setLoad)}>
        Approve
      </Button>
     
    </>
  )
}

export default ButtonGroups