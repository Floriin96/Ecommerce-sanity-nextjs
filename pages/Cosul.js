import React, { useEffect, useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

const CartPage = () => {
  const {
    totalPrice,
    cartItems,
    setShowCart,
    toggleCartItemQuanitity,
    onRemove,
  } = useStateContext();

  const router = useRouter();

  return (
    <div>
      <div
        className="cart-container"
        style={{
          margin: "auto",
          float: "none",
          background: "black",
          color: "white",
          zIndex: 10,
        }}
      >
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

        <div
          className="product-container"
          style={{
            height: "auto",
            maxHeight: "none",
            border: "1px solid var(--gold)",
            borderRadius: "1.5em",
          }}
        >
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
          <div
            className="cart-bottom"
            style={{ position: "relative", bottom: "auto" }}
          >
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

export default CartPage;
