
import { useStateContext } from '../context/StateContext';
import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { urlFor } from '../lib/client';
import axios from 'axios';
import { useRouter } from 'next/router';

const Plataramburs = () => {
  const cartRef = useRef();
  const formRef = useRef()
  const productRef = useRef()
  const router = useRouter();
   const [isSending, setIsSending] = useState(false);

  const {totalQuantities, cartItems, setShowCart } = useStateContext();

  const onSubmit = data => console.log(data);

  const get_api_mail = () => {
    const domain_maill_api = location.protocol + "//" + location.hostname + ":3300"
    const api_mail = domain_maill_api + "/api/contact";
    return location.hostname === "localhost" ? api_mail : "/api/contact"
  }

  useEffect(() => {
    console.log(get_api_mail())
  }, [])

  const handleForm = async (e) => {

    e.preventDefault()
    
    setIsSending(true)

    const formData = {
      firstName: formRef.current[0].value,
      lastName: formRef.current[1].value,
      email: formRef.current[2].value,
      province: formRef.current[3].value,
      city: formRef.current[4].value,
      adress: formRef.current[5].value,
      zipcode: formRef.current[6].value,
      phone: formRef.current[7].value,
    }
    const api_mail = get_api_mail();
    await axios.post(api_mail, {
      message: { formData, cartItems }
      // message: `${JSON.stringify(formData)} ${JSON.stringify(cartItems)}` Last form to send information to email.
    }).then(console.log).catch(console.error).finally(() => setIsSending(false))
    router.replace('/success')
  }
  return (

    <div className="Ramburs1" ref={cartRef}>
      <div className="Ramburs2">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft></AiOutlineLeft>

          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        <div ref={productRef} className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div style={{ color: "#fff" }} className="product" key={index}>
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
            <label htmlFor="first"></label>
            <input type="text" placeholder="Nume" id="firstname" name="Nume" required />
            <p></p>
            <label htmlFor="last"></label>
            <input type="text" placeholder="Prenume" id="lastname" name="Prenume" required />
            <p></p>
            <label htmlFor="email"></label>
            <input type="text" placeholder="E-mail" id="email" name="E-mail" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" required />
            <p></p>
            <label htmlFor="judet"></label>
            <input type="text" placeholder="Judet" id="province" name="Judet" required />
            <p></p>
            <label htmlFor="city"></label>
            <input type="text" placeholder="Oras/Sat" id="city" name="city" required />
            <p></p>
            <label htmlFor="adresa"></label>
            <input type="text" placeholder="Adresa" id="adress" name="Adresa" required />
            <p></p>
            <label htmlFor="zipcode"></label>
            <input type="text" placeholder="Cod postal" id="zipcode" name="Zipcode" required />
            <p></p>
            <label htmlFor="numar de telefon"></label>
            <input type="text" placeholder="Numar de telefon" id="phone" name="Numar de telefon" required />
            <p></p>
            <button type="submit" disabled={isSending}>Finalizeaza comanda!</button>

          </form>
        </div>
      </div>
    </div>


  )
}
export default Plataramburs