"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';
function Checkout({ total,items }) {
  const router = useRouter()
   const [buttonClicked, setButtonClicked] = useState(false);
  const handled = async () => {
    
    const data = await fetch('/api/payment/Stripe', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(items),
    })
    if (!data.ok) {
      alert('Error')
    }
    const { url } = await data.json()
   router.push(url)
  }
  useEffect(() => {
    if (buttonClicked) {
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
        onClick={()=> setButtonClicked(true) }
        className="mt-4"
      >
        Checkout
      </Button></>
  )
}

export default Checkout