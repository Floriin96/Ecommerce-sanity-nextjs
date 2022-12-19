import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        Toni-C Richardson
      </p>
      <div classname="menu-desktop">
      <ul class="main-menu">
        <li class="active-menu">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/shop">Shop</Link>
        </li>
        <li>
          <Link href="/Cosul">Cart</Link>
        </li>
        <li>
          <Link href="/about">Despre noi</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      </div>
      <button type="button" className="cart-icon" onClick={(e) => {
        e.stopPropagation()
        setShowCart(true)
      }}>
        <AiOutlineShopping></AiOutlineShopping>
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart></Cart>}
    </div>
  )
}

export default Navbar
