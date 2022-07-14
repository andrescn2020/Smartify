import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";
import { auth } from "../../firebase/firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import google from '../../images/google.png'
import logo from '../../images/SmartifyFinal.png'

import { useSelector } from "react-redux";
import { BsGoogle, BsWindowSidebar } from "react-icons/bs";
import { loginLang } from "./loginLang";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const Login = () => {
  const modo = useSelector(state => state.modo)
  const cart = useSelector(state => state.cart)
  const lan = useSelector((state) => state.language);

  const history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");

      for (let i = 0; i < cart.length; i++) {
          
        await axios.put(`https://back25ademo.herokuapp.com/cart/${auth.currentUser.email}/${cart[i].id}`)
        
      }

      history.push('/');

    } catch {{Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal, revisa que el mail o contraseña ingresados sean los correctos',
      footer: '<a href="/">Continuar sin iniciar sesión</a>'
    })}
    }
  };

  const loginWithGoogle = async () => {
    try {
      let createdUser;
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);
      let name = response.user.displayName.split(" ");

      if (response.user.email === "finalproyect25a@gmail.com") {
        createdUser = {
          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1],
          isAdmin: true,
          isVerified: true,
        };
      } else {
        createdUser = {
          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1],
        };
      }

      let database = await axios.get(`https://back25ademo.herokuapp.com/user/${response.user.email}`)
      if(database.data) {

        for (let i = 0; i < cart.length; i++) {
          
          await axios.put(`https://back25ademo.herokuapp.com/cart/${response.user.email}/${cart[i].id}`)
          
        }

        history.push('/');

      } else {

      await axios.post(`https://back25ademo.herokuapp.com/user`, createdUser);

      for (let i = 0; i < cart.length; i++) {
          
        await axios.put(`https://back25ademo.herokuapp.com/cart/${response.user.email}/${cart[i].id}`)
        
      }

      history.push('/');

    }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return function () {
      setLoginEmail("");
      setLoginPassword("");
      setUser({});
    };
  }, []);

  return (
    <div className={style.fondo}>
     <div className={style.login}>
      {user ? null : <div className={style.container} style={{width: "40%", marginInline: "auto", marginBlock: "1%"}}>
          <div className={style.containerImage} style={{width: "322px", height: "200px", marginBottom: "16%"}}>
          
          <div>
          <img src={logo} className={style.image} style={{maxWidth: "100%", maxHeight: "100%"}} alt='logo'/>
          </div>

        </div>
        <Box 
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch', marginBlock: "5%" },
        }}
        noValidate
        autoComplete="off"
        >
          <div style={{marginBlockStart: "60%"}}>
            <TextField
              //id="outlined-password-input"
              value={loginEmail}
              name="loginEmail"
              label={loginLang[lan].correoElectronico}
              type="email"
              id="email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <br/>
            <TextField
              //id="outlined-password-input"
              value={loginPassword}
              name="loginPassword"
              label={loginLang[lan].contraseña}
              type="password"
              id='password'
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
        </Box>
        {/* <div style={{marginTop: "15%"}}>
          <input
            autoFocus
            value={loginEmail}
            name="loginEmail"
            placeholder={loginLang[lan].correoElectronico}
            type="email"
            id="email"
            className={style.input}
            onChange={(e) => setLoginEmail(e.target.value)} />
        </div> */}
        {/* <div style={{marginTop: "15%"}}>
          <input
            value={loginPassword}
            name="loginPassword"
            placeholder={loginLang[lan].contraseña}
            type="password"
            id='password'
            className={style.input}
            onChange={(e) => setLoginPassword(e.target.value)} />
        </div> */}
        <a href="/identify" className={style.ancor}>{loginLang[lan].olvideMiContraseña}</a>
        <div className={style.register}>
          <button onClick={login} type="submit" className={style.btn}>{loginLang[lan].ingresar}</button>
          <br/><br/>
          <div className={modo}> 
          <button onClick={loginWithGoogle} type="submit" className={style.btn}>{loginLang[lan].ingresarConGoogle}<img src={google} alt='google' className={style.google}/></button>
          
          <br/><br/>
          <Link to="register" style={{textDecoration: "none"}}>
            <p className={style.ancor2}>{loginLang[lan].registrarme}</p>
          </Link>
          <Link to="home" style={{textDecoration: "none"}}>
            <p className={style.ancor2}>{loginLang[lan].volver}</p>
          </Link>
          </div>
        </div>
      </div>}
    </div>
    </div>

    
  );
};

export default Login;
