import React from 'react'
import { Button } from "@mui/material";
import getStripe from '../serverHooks/Stripe';
function Checkout({ total,items }) {
  
  const handled=async()=> {
    const data = await fetch('/api/payment/Stripe', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify(items),
    })
    if (!data.ok) {
      alert('Error')
    }
    const { url } = await data.json()
    window.location.href = url
  }
  return (
       <><div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Total:</h3>
        <p className="text-xl">{total}$</p>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handled}
        className="mt-4"
      >
        Checkout
      </Button></>
  )
}

export default Checkout