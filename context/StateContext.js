import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQuantities, setTotalQuantities] = useState(0);
   const [qty, setQty] = useState(1);
   const [size, setsize] = useState()

   let foundProduct;
   let index;

   const onAdd = (product, quantity) => {

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
      setsize((prevsize) => prevsize = size);

      const newCartItems = cartItems.map(p => ({...p}));
      const checkProductInCart = newCartItems.find((item) =>  item?._id === product?._id && item.size === size);

      if (checkProductInCart) {
         checkProductInCart.quantity += quantity
      } else {
         const newProduct = {
            ...product,
            quantity,
            size
         }

         newCartItems.push(newProduct);
      }

      setCartItems(newCartItems);


      toast.success(`${qty} ${product.name} adaugat in cos.`);
   }

   const onRemove = (product) => {
      foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
      setCartItems(newCartItems);
   }

   const toggleCartItemQuanitity = (id, value) => {
      foundProduct = cartItems.find((item) => item._id === id)
      index = cartItems.findIndex((product) => product._id === id);
      const newCartItems = cartItems.filter((item) => item._id !== id)

      if (value === 'inc') {
         setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
         setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)

         }
      }
   }

   const incQty = () => {
      setQty((prevQty) => prevQty + 1);
   }

   const decQty = () => {
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;

         return prevQty - 1;
      });
   }

   return (
      <Context.Provider
         value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            size,
            setsize,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuanitity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
         }}
      >
         {children}
      </Context.Provider>
   )
}

export const useStateContext = () => useContext(Context);