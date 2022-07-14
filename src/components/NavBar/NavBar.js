/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { getLocalCart, modoOscuro, language, loadingPage } from "../../Actions/index";
import styles from "./../NavBar/NavBar.module.css";
import SmartifyFinal from "../../images/SmartifyFinal.png";
import { navBarLang } from "./navBarLang";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";

//import styles from "./../NavBar/NavBar.module.css";

const NavBar = ({ setCurrentPage }) => {
  
  const modo = useSelector((state) => state.modo);
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const lan = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount, setCartCount]);
  useEffect(() => {
    dispatch(getLocalCart());
  }, []);

  useEffect(() => {
    dispatch(getLocalCart());
  }, []);

  const change = () => {
    setOpen(!open);
  };
  

  {
    /* <nav className={styles.navContainer}>
      <div className={styles.container}>
        <Link className={styles.ancor} to="/">
          <img src="https://i.ibb.co/1nF48KZ/logo-removebg.webp" alt="logo" className={styles.logo} />
        </Link>
      </div>
      
      <select onChange={(e) =>dispatch(modoOscuro(e.target.value))} id='modoOscuro'  >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} className={styles.search}/>
      </div>
        <Link to="#" className={styles.toggleButton} onClick={change}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </Link> 
      <div className={`${open ? styles.navbarLinksActive : styles.navbarLinks}`}>
        <ul>
          <li>
            {modo === 'dark' 
            ? <BsFillSunFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("light"))} id='modoOscuro'/> 
            : <BsFillMoonFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("dark"))} id='modoOscuro'/>}
          </li>
          <li>
            <button onClick={(e) => dispatch(language("es"))}>🇪🇸</button>
            <button onClick={(e) => dispatch(language("en"))}>ingles</button>
          </li>
          <li>
            <Link className={styles.cart} to="/cart">
              <BsFillCartFill /> {cartCount}
            </Link> 
          </li>
          <li>
            <Link to="/login" className={styles.links}>
              {navBarLang[lan].ingresa}
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.links}>
              {navBarLang[lan].creaTuCuenta}
            </Link>
          </li>
          <li>
            <Link to="/contacto" className={styles.links}>
              {navBarLang[lan].contacto}
            </Link>
          </li>
        </ul>
      </div>
    </nav> */
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid" style={{ margin: "10px" }}>
        <Link to="/">
          <div className={modo}>
        <img src={SmartifyFinal} className={styles.logo} />
        </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto" style={{marginLeft: "auto", marginInlineEnd: "40px"}}>
          <li className="nav-item" style={{margin: "8px"}}>
            {modo === 'dark' 
            ? <BsFillSunFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("light"))} id='modoOscuro'/> 
            : <BsFillMoonFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("dark"))} id='modoOscuro'/>}
          </li>
        
          <li style={{margin: "9px"}}>
            {lan === "es" 
            ? <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("en"))}>EN</button>
            : <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("es"))}>ES</button>}
            {/* <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("en"))}>🇬🇧</button> */}
          </li>
       
          <li className="nav-item">
          <Link to="/login" className="nav-link active">
            {navBarLang[lan].ingresa}
          </Link>
          </li>
          {/* <li className="nav-item">
          <Link to="/register" className="nav-link active">
            {navBarLang[lan].creaTuCuenta}
            </Link>
          </li> */}
          {/* <li className="nav-item">
          <Link to="/contacto" className="nav-link active">
            {navBarLang[lan].contacto}
          </Link>
          </li> */}
            <li className="nav-item">
              <Link className="nav-link active" to="/cart">
                <BsFillCartFill /> {cartCount}
              </Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
