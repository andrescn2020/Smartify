import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import styles from './Comprar.module.css'

//import axios from 'axios'

export default function Comprar({ productos, data }){
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const cart = useSelector(state => state.cart)
 useEffect(()=>{
  const script = document.createElement('script');
  const attr_data_preference = document.createAttribute('data-preference-id')
  //const attr_nonce = document.createAttribute('nonce')

  attr_data_preference.value = data.id
  //attr_nonce.value = 'abcdefg'
  script.src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  script.setAttributeNode(attr_data_preference)
 // script.setAttributeNode(attr_nonce)

  document.getElementById('form1').appendChild(script)
  return () =>{
    document.getElementById('form1').removeChild(script);
  }
 },[])
 useEffect(() => {
  let items = 0;
  let price = 0;

  cart.forEach((item) => {
    items += item.qty;
    price += item.qty * item.price;
  });

  setTotalItems(items);
  setTotalPrice(price);
  
}, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
    return(
        <div className={styles.fondo}>

  <form id='form1' className={styles.ul}>

        <h2>Listado de Compras</h2>
        <ul >
        {productos.map((producto) => {
            return(
              <>
                <li key={producto.id} className={styles.li}>{producto.brand}  {producto.model} ${producto.price} - cantidad: {producto.qty}</li>
                </>
            )
          })} </ul>  
        
          <h2>Total: $ {totalPrice}</h2>  
      </form>

     </div>
    )
}