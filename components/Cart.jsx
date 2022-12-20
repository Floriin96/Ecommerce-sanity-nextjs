import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

// const { showCart, setShowCart, totalQuantities} = useStateContext();

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    showCart,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();
  const id = "cartContainer";

  useEffect(() => {
    const handler = (event) => {
      const target = event.target;
      if (showCart && !target.closest("#" + id)) {
        setShowCart(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const router = useRouter();

  return (
    <div className="cart-wrapper">
      <div className="cart-container" ref={cartRef} id={id}>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft></AiOutlineLeft>
          <span className="heading">COSUL TAU</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}></AiOutlineShopping>
            <h3>Cosul tau este gol</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continua cumparaturile
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, key) => (
              <div className="product" key={key}>
                <img
                  layout="intrinsic"
                  src={urlFor(item?.image[0])}
                  className="cart-product-image"
                ></img>
                <div className="item-desc">
                  <div className="flex-top">
                    <h5>{item.name}</h5>
                    <h4>{item.price}Lei</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus></AiOutlineMinus>
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus></AiOutlinePlus>
                        </span>
                      </p>
                    </div>
                    <label>
                      <h6>Marime</h6>
                      <h6>{item.size}</h6>
                    </label>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline></TiDeleteOutline>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Total:</h3>
              <h3>{totalPrice}Lei</h3>
            </div>
            <button
              type="button"
              className="btn"
              onClick={() => {
                router.replace("/Ramburs");
                setShowCart(false);
              }}
            >
              Metode de plata
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
