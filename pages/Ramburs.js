import React from "react";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext'; 
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Ramburs = () => {
  
const router = useRouter();
const { cartItems } = useStateContext();
const handleCheckout = async () => {
    const stripe = await getStripe();
    
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
    
   
  } 
  return (
    <React.Fragment>
    <div className="btn-container">
     <button type="button" className="btn1" onClick={handleCheckout}>
      Plateste cu cardul
    </button>
    <button type="button" className="btn2" onClick={() => router.replace('/Plataramburs')}>
      Plateste ramburs
    </button>
  </div>
</React.Fragment>
) 

}
export default Ramburs;