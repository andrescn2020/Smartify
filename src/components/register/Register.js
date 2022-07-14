import React, { useEffect, useState } from 'react'
import style from './../register/Register.module.css'
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchstoken } from "../Contacto/fetchmetod";
import Swal from 'sweetalert2';
import swal2 from 'sweetalert'
import {Link} from 'react-router-dom';
import { registerLang } from './registerLang';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { async } from '@firebase/util';


const Register = () => {

  const cart = useSelector((state) => state.cart);
  const lan = useSelector((state) => state.language);

  const [mails, setEmails] = useState();

  const getEmails = async () => {
    let allM = (await axios.get("https://back25ademo.herokuapp.com/user")).data;
    allM = allM.map((elem) => elem.email);
    setEmails(allM);
  };
  
    useEffect(()=>{
      getEmails()
    },[])

  
  const history = useHistory();
  
  const [input, setInput] = useState({
    
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    address: ""
    
  });
  const [correo, SetCorreo] = useState({
    contact_user: "Smartify",
    correo_user: "",
    asunto_user:"Estas registrado",
    descripcion_user:"Bienvenido a Smartify, ya estas registrado. Dirigete a mi perfil y solicita el mail de verificación para verificar tu cuenta y poder comprar en nuestra pagina.",
  })  

  const [error,setError] = useState({}) 
  const correoEmail = async(e) =>{
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) =>{
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    try{
      const resultCorreo = await fetchstoken('correo', correo , "POST");
      if(!resultCorreo.ok){
        throw Error(resultCorreo.errors.msg);
      };
      SetCorreo({
        contact_user: "Smartify",
        correo_user:"",
        asunto_user:"Estas registrado",
        descripcion_user:"Bienvenido a Smartify, ya estas registrado. Dirigete a mi perfil y solicita el mail de verificación para verificar tu cuenta y poder comprar en nuestra pagina.", 
      });
    } catch (error) {
    }
  }

  const register = async () => {

    if (
      error.email ||
      error.password ||
      error.username ||
      error.firstname ||
      error.lastname ||
      error.address 
   ){Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Algo salio mal, revisa de completar todas las casillas correctamente!',
    footer: '<a href="/">Continuar sin registrarme</a>'
  })
  } else {
        await createUserWithEmailAndPassword(auth, input.email, input.password);
        const newUser = {
          email: input.email,
          username: input.username,
          firstname: input.firstname,
          lastname: input.lastname,
          address: input.address
        }
        await axios.post("https://back25ademo.herokuapp.com/user", newUser);

        for (let i = 0; i < cart.length; i++) {
          
          await axios.put(`https://back25ademo.herokuapp.com/cart/${auth.currentUser.email}/${cart[i].id}`)
          
        }

        setInput({

          email: "",
          password: "",
          username: "",
          firstname: "",
          lastname: "",
          address: ""

        });
      
      
      swal2({
        title: "Buen Trabajo!",
        text: "Te registraste correctamente!",
        icon: "success",
      });

      history.push('/');

    } 

  }

  function validation (input){
    let error = {}
    if (!input.email) error.email = "Ingresa el email del usuario"
    if (mails.includes (input.email)) error.email = "Mail ya existente"
    if (!input.password) error.password = "Ingresa la contraseña del usuario"
    if (!input.username) error.username = "Ingresa el nombre de usuario"
    if (!input.firstname) error.firstname = "Ingresa el nombre del usuario"
    if (!input.lastname) error.lastname = "Ingresa el apellido del usuario"
    if (!input.address) error.address = "Ingresa la direccion del usuario"
    return error
  }

const handleChange = (e) => {
  
  setInput((prevState) => {
    
        const newState = {

          ...prevState,
          [e.target.name]: e.target.value

        };
        setError(validation({
          ...prevState,
          [e.target.name]: e.target.value
        }))
        
        return newState;
        
      });
      
    }

    const handleChangeEmail = (e) => {
  
      setInput({
        ...input,
        email: e.target.value
      })
      
    }
  
  
    const onChangeCorreo = (e) => {
      const { name, value } = e.target;
      SetCorreo({
        ...correo,
        correo_user: value,
      })
     }
    
    const DOS = (e) => {
      correoEmail(e);
      register();
    }
        
        
        return (
          <div className={style.fondo}>
          <div className={style.reg}>
      <div className={style.container}>
        <div className={style.image}>
          <h1>{registerLang[lan].formularioDeRegistro}</h1>
        </div>
        <div className={style.container2}>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 3, width: '30ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          error={error.username}
          //id="outlined-required"
          label={registerLang[lan].nombreDeUsuario}
          type="text"
          id='username'
          name="username"
          helperText={error.username}
          placeholder={registerLang[lan].nombreDeUsuario}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <TextField
          required
          error={error.firstname}
          //id="outlined-required"
          label={registerLang[lan].nombre}
          type="text"
          id='firstname' 
          name="firstname"
          helperText={error.firstname}
          placeholder={registerLang[lan].nombre}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <br/>
        <TextField
          required
          error={error.lastname}
          //id="outlined-required"
          label={registerLang[lan].apellido}
          type="text"
          id='lastname'
          name="lastname"
          helperText={error.lastname}
          placeholder={registerLang[lan].apellido}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <TextField
          required
          error={error.address}
          //id="outlined-required"
          label={registerLang[lan].direccion}
          type="text"
          id='address'
          name="address"
          helperText={error.address}
          placeholder={registerLang[lan].direccion}
          onBlur={handleChange}
          onChange={handleChange}
        />
        <br/>
        <TextField
          required
          error={error.email}
          //id="outlined-required"
          label={registerLang[lan].correoElectronico}
          type='email'
          name="correo_user"
          value={correo.correo_user}
          helperText={error.email}
          placeholder={registerLang[lan].correoElectronico}
          onChange={ (e) => { {onChangeCorreo(e)} {handleChangeEmail(e)} } }
        />
        <TextField
          required
          error={error.password}
          //id="outlined-required"
          label={registerLang[lan].contraseña}
          type="password"
          id='password'
          name="password"
          helperText={error.password}
          onBlur={handleChange}
          placeholder={registerLang[lan].contraseña}
          onChange={handleChange} 
        />
        </div>
        </Box>
        {/*   <input placeholder={registerLang[lan].nombreDeUsuario} type="text" id='username' name="username" className={style.input} required onChange={handleChange}></input>
        {error.username && <p>{error.username}</p>}</div>
        <div> */}
          {/* <input placeholder={registerLang[lan].nombre} type="text" id='firstname' name="firstname" className={style.input} required onChange={handleChange}></input>
        {error.firstname && <p>{error.firstname}</p>}</div>
        <div> */}
          {/* <input placeholder={registerLang[lan].apellido} type="text" id='lastname' name="lastname" className={style.input} required onChange={handleChange}></input>
        {error.lastname && <p>{error.lastname}</p>}</div>
        <div>
          <input placeholder={registerLang[lan].direccion} type="text" id='address' name="address" className={style.input} required onChange={handleChange}></input>
        {error.address && <p>{error.address}</p>}</div> */}
        {/* <div>
          <input placeholder="Email..." autoFocus type="email" id='email' name="email" required onChange={handleChange}></input>
          {error.email && <p>{error.email}</p>}</div> */}
        {/* <div>
        <input type='email' name="correo_user" placeholder={registerLang[lan].correoElectronico} className={style.input} value={correo.correo_user} onChange={ (e) => { {onChangeCorreo(e)} {handleChangeEmail(e)} } }/>
        </div>
        <div>
          <input placeholder={registerLang[lan].contraseña} type="password" id='password' name="password" className={style.input} required onChange={handleChange}></input>
        {error.password && <p>{error.password}</p>}</div> */}
        {/* <div>
          <input placeholder="Repetir Contraseña" type="password" name="password" className={style.input} required></input>
        </div> */}
        <div className={style.register} >
          <button style={{backgroundColor: "#02155A", fontWeight: "bold", color: "white"}} onClick={DOS} type='submit' className={style.btn}>{registerLang[lan].registrarse}</button>
          <br/>
          <Link to="/login">
            <button style={{backgroundColor: "#02155A", fontWeight: "bold", color: "white", width: "30%"}} className={style.btn}>{registerLang[lan].volver}</button>
          </Link>
        </div>
        {/* <div className={style.register}>
          <button className={style.btn}>Ingresar con Google</button>
        </div>
        <div>
          <button className={style.btn}>Ingresar con Github</button>
        </div> */}
      </div>
      </div>
    </div>
    </div>
  );
}

export default Register