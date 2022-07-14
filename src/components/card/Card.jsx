import React, { useEffect, useState } from "react";
import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart, addToCartUser, deleteFav, addFav, getLocalFavs } from "../../Actions";
import soldOut from "../../images/sold-out.png";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { cardLang } from "./cardLang";



export default function Card(props) {
  const modo = useSelector(state => state.modo)
  const [user, setUser] = useState(auth.currentUser);
  const favslocal = useSelector((state) => state.favs)
  const lan = useSelector((state) => state.language)
  
  useEffect(() => {

    userVerificate();
    dispatch(getLocalFavs())

  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };

  const dispatch = useDispatch();

  const addToFavourites = async () => {
    try {

      let info = await axios.get(`http://localhost:3001/user/${user.email}`);
      
      let userInfo = info.data;

      dispatch(addFav(userInfo.email, props.id))

    } catch (error) {

      alert("No se pudo agregar la publicacion a favoritos.");
      console.log(error);

    }

  };

  async function deleteFavourites() {
    try {

    dispatch(deleteFav(user.email, props.id))

    } catch (error) {
      alert("No se pudo elimino la publicacion a favoritos.");
      console.log(error);
    }
  }

  return (
    <div
      
    >
      <div className={style.card}>
      <div style={{ height: 300 + "px" }}>
        {props.stock > 0 ? (
          <div className={modo}>
          
          <img src={props.images} style={{ maxHeight: "300px"}} alt="..." />
           
          </div>
        ) : (
          <div className={modo}>
          <img src={soldOut} style={{ height: 200 + "px" }} alt="..."  />
          </div>
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title" style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>{props.brand}</h3>
        <h3 style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>{props.model}</h3>
        <h2 style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>US$ {props.price}</h2>
        <div className="card-text">
        {props.stock > 0 ? (
          <div>
            {auth.currentUser ? (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-100"
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    justifyContent: "center",
                    marginBottom: '10px'
                  }}
                  onClick={() => dispatch(addToCartUser(user.email, props.id))}
                >
                  {cardLang[lan].AgregarAlCarrito}
                </button>
              </Link>
            ) : (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-80"
                  type="submit"
                  style={{
                    fontWeight: "bold",
                    justifyContent: "center",
                    
                    marginBottom: '10px'
                  }}
                  onClick={() => dispatch(addToCart(props.id))}
                >
                  {cardLang[lan].AgregarAlCarrito}
                </button>
              </Link>
            )}
            {/* <p style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>{cardLang[lan].Disponibles}: {props.stock}</p> */}
          </div>
        ) : (
          <div>
          {/* <p className="btn w-100 mb-2 ">{cardLang[lan].AGOTADO}</p>
          <p className="btn w-100 mb-0">{cardLang[lan].NoDisponible}</p> */}
          </div>
        )}

        <div className="d-flex flex-row justify-content-center alig-items-center">
    {user ? favslocal?.includes(props.id) ? (
            <button className="mb-3" style={{border: "none", background: "transparent"}} onClick={deleteFavourites}>
              <FaHeart />
            </button>
          ) : (
            <button className="mb-3" style={{border: "none", background: "transparent"}} onClick={addToFavourites}>
              <FiHeart />
            </button>
          ) : null}
        
        {user ? <Link className="btn btn-outline-dark, w-80 mb-3 ms-5" style={{
                          fontWeight: "bold",
                    justifyContent: "center",
                  
                    
                  }} to={"/home/" + props.id}>
          {cardLang[lan].Detalle}
        </Link> : <Link className="btn btn-outline-dark, w-80 mb-3" style={{
                          fontWeight: "bold",
                    justifyContent: "center",
                  
                    
                  }} to={"/home/" + props.id}>
          {cardLang[lan].Detalle}
        </Link>}
        </div>
        
          </div>
          
    </div>
      </div>
    </div>
  );
}
