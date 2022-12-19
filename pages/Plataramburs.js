
import { useStateContext } from '../context/StateContext'; 
import { render } from 'preact-render-to-string';
import React, { useRef, useEffect } from 'react';
import {AiOutlineLeft } from 'react-icons/ai';
import { urlFor } from '../lib/client';
import axios from 'axios';
import { useRouter } from 'next/router';

const Plataramburs = () => {
    const cartRef = useRef();
    const formRef = useRef()
    const productRef = useRef()
    const router = useRouter();

    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity,size} = useStateContext();

    const onSubmit = data => console.log(data);

    const get_api_mail = () => {
      const domain_maill_api = location.protocol + "//" + location.hostname + ":3300"
      const api_mail = domain_maill_api + "/api/contact";
      return api_mail
    }

    useEffect(() => {
      console.log(get_api_mail())
    }, [])

    const handleForm = async (e) => {

      e.preventDefault()

      const formData = {

        firstName: formRef.current[0].value,
        lastName: formRef.current[1].value,
        email: formRef.current[2].value,
        province: formRef.current[3].value,
        city: formRef.current[4].value,
        adress: formRef.current[5].value,
        zipcode: formRef.current[6].value,
        phone: formRef.current[7].value,
        city: formRef.current[8].value,


      }
      const api_mail = get_api_mail();
      await axios.post(api_mail, {

        message: `${JSON.stringify(formData)} ${JSON.stringify(cartItems)}`
      })

    }
    return (
     
        <div className="Ramburs1" ref={cartRef}>
             <div className="Ramburs2">
           <button
             type="button"
             className="cart-heading"
             onClick={() => setShowCart(false) }>
               <AiOutlineLeft></AiOutlineLeft>
              
               <span className="cart-num-items">({totalQuantities} items)</span>
           </button>
           
           <div ref={productRef} className="product-container">
              {cartItems.length >= 1 && cartItems.map((item) => (
                <div style={{color: "#fff"}} className="product" key= { item.id }>
                  <img layout="intrinsic" src={urlFor(item?.image[0])} className="cart-product-image"></img>
                  <div className="item-desc">
                    <div className="flex-top">
                      <h5>{item.name}</h5>
                      <br></br>
                      <h4>{item.price}Lei</h4>
                      <br></br>
                      <h5>Marime</h5>
                      <h4>{item.size}</h4>
                    </div>                                
                    </div>
                  </div>   
              ))} 
           </div>
           
    
       <div className="RambursForm" background-color="white">
       <form ref={formRef} onSubmit={handleForm} >
          <label for="first">Nume:</label>
          <input  type="text" id="firstname" name="Nume" />
          <p></p>
          <label for="last">Prenume:</label>
          <input type="text" id="lastname" name="Prenume" />
          <p></p>
          <label for="email">E-mail:</label>
          <input  type="text" id="email" name="E-mail" />
          <p></p>
          <label for="judet">Judet:</label>
          <input  type="text" id="province" name="Judet" />
          <p></p>
          <label for="city">Oras/Sat:</label>
          <input  type="text" id="city" name="City" />
          <p></p>
          <label for="adresa">Adresa:</label>
          <input  type="text" id="adress" name="Adresa" />
          <p></p>
          <label for="zipcode">Cod postal:</label>
          <input  type="text" id="zipcode" name="Zipcode" />
          <p></p>
          <label for="numar de telefon">Numar de telefon:</label>
          <input  type="text" id="phone" name="Numar de telefon" required />
           <p></p>
          <button type="submit" onClick={() => router.replace('/success')} >Finalizeaza comanda!</button>
      </form>
      </div>
    </div>
    </div>
     
         
    )
}
export default Plataramburs