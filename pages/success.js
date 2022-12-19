import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h1>Toni-C Richardson iti multumeste pentru comanda!</h1>
        <p className="email-msg">Verificati email dumneavoastra</p>
        <p className="description">
          Daca aveti orice intrebare, adresativa la 
          <a className="email" href="mailto:tonicrichardson@yahoo.com">
          tonicrichardson@yahoo.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continua cumparaturile
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success