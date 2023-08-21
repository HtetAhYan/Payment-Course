"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
function Checkout({ total,items }) {
  const router = useRouter()
  const [buttonClicked, setButtonClicked] = useState(false);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  const handled = async () => {
    toast.success('correct payment!')
    toast.loading('Redirecting to stripe payment!')
    const data = await fetch('/api/payment/Stripe', {
      method: 'POST',
        headers: {
        "Content-Type": 'application/json'
      }
     ,
      body:JSON.stringify(items,total),
    })
    if (!data.ok) {
      alert('Error')
    }
    const { url, user } = await data.json()
    console.log(user);
   router.push(url)
  }
  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    if (buttonClicked) {
       // eslint-disable-next-line react-hooks/exhaustive-deps
      handled();

    }
  }, [buttonClicked]);

  return (
       <><div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Total:</h3>
        <p className="text-xl">{total}$</p>
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={buttonClicked}
        onClick={()=> setButtonClicked(true) }
        className="mt-4"
      >
        Checkout
      </Button></>
  )
}

export default Checkout