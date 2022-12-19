import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext';
import { getClientBuildManifest } from 'next/dist/client/route-loader';


const ProductDetails = ({ product, products}) => {
  const { image, name, details, price,sizes} = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart,size,setsize} = useStateContext();
  const handleChange = event => {
   setsize(event.target.value);
}
  const handleBuyNow = () => {
   onAdd(product, qty,sizes);
   
   setShowCart(true);
  }
  return (
    <div>
        <div className="product-detail-container">
           <div>
              <div className="image-container">
                 <img src={urlFor(image && image [index])} className="product-detail-image" />
              </div>
              <div className="small-image-container">
                      {image?.map((item, i) => (
                        <img
                           key={i}
                           src={urlFor(item)}
                           className={i === index ? 'small-image selected-image' : 'small-image'}
                           onMouseEnter={() => setIndex(i) }
                        ></img>
                      ))}
                      </div> 
           </div>

           <div className="product-detail-desc">
            <h1>{name}</h1>
            <div className="reviews">
               <div>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiFillStar></AiFillStar>
                <AiOutlineStar></AiOutlineStar>
                </div> 
                <p>
                   (40) 
                </p>
            </div>
            <h4>Detali:</h4>
            <p>{details}</p>
            <p className="price">{price}Lei</p>
            <div className="quantity">
               <h3>Cantitate</h3>
               <p className="quantity-desc" >
                  <span className="minus" onClick={decQty}><AiOutlineMinus></AiOutlineMinus></span>
                  <span className="num" onClick="">{qty}</span>
                  <span className="plus" onClick={incQty}><AiOutlinePlus></AiOutlinePlus></span>
               </p>
            </div> 
            <br></br><br></br>
            <div className="quantity">
               <h3>Selecteaza marimea</h3>
               <select value={size} onChange = {handleChange}>
               <option value=''required>Alege o marime</option>
               {sizes.map(size => 
                 <option key= {size} value={size}>{size}</option> )}
               
               </select>
              
               
            </div>
              
            <div className="buttons">
               <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Adauga in cos</button>
               <button type="button" className="buy-now" onClick={handleBuyNow}>Cumpara acum</button>
               
            </div>
           </div>
        </div>

        <div className="maylike-products-wrapper">
            <h2>Poate te intereseaza</h2>
            <div className="marquee">
               <div className="maylike-products-container track">
                  {products.map((item) =>(
                    <Product key={item._id} product={item}></Product>
                  ))}
               </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current
      }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery)

    console.log(product);
    
    return{
      props: { products, product }
    }
  }

export default ProductDetails