import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import Card from "../card/Card";
import UserNavBar from "../UserNavBar/UserNavBar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BtnBack from "../back/BtnBack";
import styles from './styles/Favourites.module.css'
import { comLang } from "./styles/MisComprasLang";
import { cancelLoadingPage, loadingPage } from "../../Actions";

export default function Favourites() {
  const [user, setUser] = useState();
  const history = useHistory()
  const favs = useSelector(state => state.favs)
  const lan = useSelector((state) => state.language);
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch();

  let emailUser = "";

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
    
  }, [favs]);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `https://back2demo2-production.up.railway.app/user/${currentUser.email}`
        );
        if(user.data.banned){

          history.push("/banned")

        }
        
        setUser(user.data);
        emailUser = auth.currentUser.email;
        
      }
      
    });
  };


  return (
    <div className={styles.fondo}>
      <UserNavBar />
      {user ? (
        <div>
          <BtnBack/>
          <h2 style={{textAlign: "center", marginBottom: "30px"}}>{comLang[lan].fav}</h2>
          <div className={styles.containerCard}>
          {user?.favourites?.map((e) => {
            return (
              <div key={e.id}>
                <Card
                  brand={e.brand}
                  model={e.model}
                  images={e.images}
                  price={e.price}
                  id={e.id}
                  stock={e.stock}
                />
              </div>
            );
          })}
          </div>
        </div>
        
      ) : (
        <h1>No tienes favoritos</h1>
      )}
    </div>
  );
}
