import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineYoutube } from "react-icons/ai";
import { RiMenu3Fill, RiYoutubeLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import { ImFacebook } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { FiYoutube } from "react-icons/fi";

import { Cart } from "../";
import { useStateContext } from "../../context/StateContext";

import classes from "./style.module.css";
import { FaTiktok } from "react-icons/fa";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <div className={classes.topHeaderContainer}>
        <div className={classes.topHeader}>
          <span>PRESTIGE by Viorica Ancuta Carcu</span>
          <div className={classes.containerSocialNetworks}>
            <span>Follow us on our social networks</span>
            <a
              href="https://www.facebook.com/profile.php?id=100083570947798"
              target="_blank"
            >
              <span>
                <ImFacebook color="white" style={{ cursor: "pointer" }} />
              </span>
            </a>
            <a href="https://www.instagram.com/vioricaancuta/" target="_blank">
              <span>
                <BsInstagram color="white" style={{ cursor: "pointer" }} />
              </span>
            </a>
            <a href="https://www.youtube.com/@Toni-CRichardson" target="_blank">
              <span>
                <FiYoutube
                  color="white"
                  fontSize={"1.3em"}
                  style={{ cursor: "pointer" }}
                />
              </span>
            </a>
            <a
              href="https://www.tiktok.com/@ancutavioricacarcu"
              target="_blank"
            >
              <span>
                <FaTiktok color="white" style={{ cursor: "pointer" }} />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <p className="logo">Toni-C Richardson</p>
        <div className={classes.desktopMenu}>
          <ul className="main-menu">
            <li className="active-menu">
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

        <div className={classes.containerBtns}>
          <button
            type="button"
            className="cart-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowCart(true);
            }}
          >
            <AiOutlineShoppingCart />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
          <button
            className={classes.hamburguerBtn}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <GrClose /> : <RiMenu3Fill />}
          </button>
        </div>

        {showMobileMenu ? (
          <ul className={classes.mobileMenu}>
            <div className={classes.menu}>
              <li className="active-menu">
                <Link href="/">
                  <span onClick={() => setShowMobileMenu(false)}>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <span onClick={() => setShowMobileMenu(false)}>Shop</span>
                </Link>
              </li>
              <li>
                <Link href="/Cosul">
                  <span onClick={() => setShowMobileMenu(false)}>Cart</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span onClick={() => setShowMobileMenu(false)}>
                    Despre noi
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span onClick={() => setShowMobileMenu(false)}>Contact</span>
                </Link>
              </li>
            </div>
          </ul>
        ) : null}

        {showCart && <Cart></Cart>}
      </div>
    </>
  );
};

export default Navbar;
