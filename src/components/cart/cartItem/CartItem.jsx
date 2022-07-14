import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
  removeFromCartUser,
} from "../../../Actions/index";
import { auth } from "../../../firebase/firebase-config";
import styles from "./CartItem.module.css";


const CartItem = (props) => {
  const modo = useSelector(state => state.modo)
  const {item} = props;

  const dispatch = useDispatch();

  const [input, setInput] = useState(item.qty);
  const [stockView, setStockView] = useState(0);

  useEffect( () => {

    axiosPeticionById();

  }, []);

  const axiosPeticionById = async () => {

    let st = (await axios.get(`http://localhost:3001/home/${item.id}`));
    setStockView(st.data.stock);

  }

  const mas = async (e) => {
   
    dispatch(adjustItemQty(props.item.id, input + 1));
    setInput(parseInt(input + 1));
    let post = await axios.get(`http://localhost:3001/home/${props.item.id}`)
    if (parseInt(input) > post.data.stock - 1) {
      setInput(post.data.stock)
    }
  }

  const menos = async (e) => {

    if (parseInt(input) < 1) {

      setInput(parseInt(0))
      dispatch(adjustItemQty(props.item.id, input));

    } else {

      dispatch(adjustItemQty(props.item.id, input - 1));
      setInput(parseInt(input - 1));

    }

    

    //let post = await axios.get(`http://localhost:3001/home/${props.item.id}`)

  }
  const onChangeHandler = async (e) => {

    setInput(e.target.value);
    dispatch(adjustItemQty(props.item.id, e.target.value));
    let post = (await axios.get(`http://localhost:3001/home/${props.item.id}`))
      .data;

    if (e.target.value > post.stock) {
      e.target.value = post.stock;
    } else if(isNaN(e.target.value)) {

      setInput(1)
      dispatch(adjustItemQty(props.item.id, input));

    }

  };
  return (
    <div className={styles.cartItem}>
      <div className={modo}>
      <img src={item.images} alt={item.model} class="img-rounded" width="200"/>
      </div>
      <div className={styles.cartItemDetails}>
        <p className={styles.detailsTitle}>{item.brand}</p>
        <p className={styles.detailsTitle}>{item.model}</p>
        <p className={styles.detailsDesc}>{item.resolution}</p>
        <p className={styles.detailsDesc}>{item.rom}</p>
        <p className={styles.detailsPrice}>US$ {item.price}</p>
      </div>
      <div className={styles.cartItemActions}>
        <div className={styles.cartItemQty}>
          <label htmlFor="qty">Cantidad:</label>
          <input
            min="1"
            type="text"
            id="qty"
            name="qty"
            className={styles.input}
            value={input}
            onChange={onChangeHandler}
          />
          <div className={styles.count}>
            <button className={styles.countMas} onClick={mas}>+</button>
            <button className={styles.countMenos} onClick={menos}>-</button>
          </div>
          
        </div>
        <p className={styles.prf}> ({stockView} U.) </p>
        {auth.currentUser ? (
          <button
            onClick={() =>
              dispatch(
                removeFromCartUser(auth.currentUser.email, item.id)
              )
            }
            className={styles.actions__deleteItemBtn}
          >
           🗑️
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className={styles.actions__deleteItemBtn}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
