import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import NavBar from "../NavBar/NavBar";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import SearchBar from "../SearchBar/Searchbar";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocalCart, modoOscuro, language, loadingPage, cancelLoadingPage } from "../../Actions";
import SmartifyFinal from "../../images/SmartifyFinal.png";
import styles from "../UserNavBar/usernavbar.module.css";
import { userNavBarLang } from "./userNavBarLang";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FiLogOut } from "react-icons/fi";
import { BsFillMoonFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { BsGearWideConnected } from "react-icons/bs";
import { loadBundle } from "firebase/firestore";


const StyledMenu = styled((props) => (
  

  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function UserNavBar({ setCurrentPage }) {

  const loading = useSelector((state) => state.loading)
  const modo = useSelector((state) => state.modo);
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const lan = useSelector((state) => state.language);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const history = useHistory()

  const dispatch = useDispatch();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();

  }, []);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  useEffect(() => {
    dispatch(getLocalCart());
  }, []);
  const change = () => {
    setOpen(!open);
  };

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `https://back2demo2-production.up.railway.app/user/${currentUser.email}`
        );
        setUser(user.data);
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(false);
    history.push("/");
     window.location.reload();

    // window.location.reload()
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElP, setAnchorElP] = React.useState(null);
  const profileOpen = Boolean(anchorElP);
  const handleClickk = (event) => {
    setAnchorElP(event.currentTarget);
  };
  const handleClosee = () => {
    setAnchorElP(null);
  };

 
    {/* <nav className="navbar navbar-expand-lg bg-light">
      {user ? (
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Henry Store
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle active m-3" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsPersonCircle /> {user.username}
                </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="/mi-perfil/">Mi perfil</Link></li>
            <li><Link className="dropdown-item" to="/mis-compras">Mis compras</Link></li>
            <li><Link className="dropdown-item" to="/favoritos">Favoritos</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/" onClick={logout}>Cerrar Sesion</Link></li>
          </ul>
        </li>
            </ul>
            {user.isAdmin ? <Link className="nav-link active m-3" to="admin">
              <button>Admin Menu</button>
            </Link> : null}
            <Link className="nav-link active m-3" to="cart">
              <BsFillCartFill /> {cartCount}
            </Link>
          </div>
        </div>
      ) : (
        <NavBar />
      )}
    </nav> */}
   return (
    <nav className="navbar navbar-expand-lg">
      {user ? (
        user.isAdmin ? (
          auth.currentUser.email === "finalproyect25a@gmail.com" ? (
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
          <ul className="navbar-nav ml-auto" style={{marginLeft: "auto"}}>
          <li className="nav-item dropdown">
            <Link className="nav-link active text-truncate" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <BsGearWideConnected/>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" to="/admin/publicaciones">Productos</Link></li>
              <li><Link className="dropdown-item" to="/admin/agregar-publicacion">Crear Publicacion</Link></li>
              <li><Link className="dropdown-item" to="/admin/editar-stock">Editar Stock</Link></li>
              <li><Link className="dropdown-item" to="/admin/users">Usuarios</Link></li>
              <li><Link className="dropdown-item" to="/admin/preguntas">Preguntas</Link></li>
              <li><Link className="dropdown-item" to="/admin/control-de-usuarios">Administrar Usuarios</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" onClick={logout}><FiLogOut style={{marginInlineEnd: "10px"}}/>{userNavBarLang[lan].CerrarSesion}</Link></li>
              </ul>
            </li>
          <li className="nav-item" style={{margin: "6px"}}>
            {modo === 'dark' 
            ? <BsFillSunFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("light"))} id='modoOscuro'/> 
            : <BsFillMoonFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("dark"))} id='modoOscuro'/>}
          </li>

          <li style={{margin: "6px", marginInlineEnd: "100px"}}>
          {lan === "es" 
            ? <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("en"))}>EN</button>
            : <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("es"))}>ES</button>}
            {/* <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("es"))}>🇪🇸</button>
            <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("en"))}>🇬🇧</button> */}
          </li>
      
            {/* <li className="nav-item">
            <Button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "black",
                  }}
                  id="demo-customized-button"
                  aria-controls={menuOpen ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                >
                  Menu de admin
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/publicaciones">
                      Productos
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link
                      className="dropdown-item"
                      to="/admin/agregar-publicacion"
                    >
                      Crear Publicacion
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/editar-stock">
                      Editar Stock
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/users">
                      Usuarios
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link
                      className="dropdown-item"
                      to="/admin/control-de-usuarios"
                    >
                      Administrar Usuarios
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/preguntas">
                      Preguntas
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={logout} disableRipple>
                    CerrarSesion
                  </MenuItem>
                </StyledMenu>
            </li> */}
          </ul>
        </div>
      </div>
      ) : (
      <>
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
          <ul className="navbar-nav ml-auto" style={{marginLeft: "auto"}}>
          <li className="nav-item dropdown">
            <Link className="nav-link active text-truncate" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <BsGearWideConnected/>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" to="/admin/publicaciones">Productos</Link></li>
              <li><Link className="dropdown-item" to="/admin/agregar-publicacion">Crear Publicacion</Link></li>
              <li><Link className="dropdown-item" to="/admin/editar-stock">Editar Stock</Link></li>
              <li><Link className="dropdown-item" to="/admin/users">Usuarios</Link></li>
              <li><Link className="dropdown-item" to="/admin/preguntas">Preguntas</Link></li>
              </ul>
            </li>
          <li className="nav-item" style={{margin: "6px"}}>
            {modo === 'dark' 
            ? <BsFillSunFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("light"))} id='modoOscuro'/> 
            : <BsFillMoonFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("dark"))} id='modoOscuro'/>}
          </li>
       
          <li style={{margin: "6px"}}>
          {lan === "es" 
            ? <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("en"))}>EN</button>
            : <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("es"))}>ES</button>}
            {/* <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("es"))}>🇪🇸</button>
            <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("en"))}>🇬🇧</button> */}
          </li>
     
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle active text-truncate" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <BsPersonCircle /> {user.username}
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><Link className="dropdown-item" to="/mi-perfil/">{userNavBarLang[lan].Miperfil}</Link></li>
              <li><Link className="dropdown-item" to="/mis-compras">{userNavBarLang[lan].MisCompras}</Link></li>
              <li><Link className="dropdown-item" to="/favoritos">{userNavBarLang[lan].Favoritos}</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" onClick={logout}><FiLogOut style={{marginInlineEnd: "10px"}}/>{userNavBarLang[lan].CerrarSesion}</Link></li>
            </ul>
          </li>
          
          {/* <li>
            <Button
              style={{
                border: "none",
                background: "transparent",
                color: "black",
                marginBlock: "4px"
              }}
              id="demo-customized-button"
              aria-controls={
                menuOpen ? "demo-customized-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
            >
              <BsGearWideConnected/>
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} disableRipple>
                <Link
                  className="dropdown-item"
                  to="/admin/publicaciones"
                >
                  Productos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <Link
                  className="dropdown-item"
                  to="/admin/agregar-publicacion"
                >
                  Crear Publicacion
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <Link
                  className="dropdown-item"
                  to="/admin/editar-stock"
                >
                  Editar Stock
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose} disableRipple>
                <Link className="dropdown-item" to="/admin/users">
                  Usuarios
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose} disableRipple>
                <Link
                  className="dropdown-item"
                  to="/admin/control-de-usuarios"
                >
                  Administrar Usuarios
                </Link>
              </MenuItem> 
              <MenuItem onClick={handleClose} disableRipple>
                <Link className="dropdown-item" to="/admin/preguntas">
                  Preguntas
                </Link>
              </MenuItem>
            </StyledMenu>
          </li> */}
          <li className="nav-item" style={{margin: "-1px"}}>
              <Link className="nav-link active" to="/cart">
                <BsFillCartFill /> {cartCount}
              </Link> 
            </li>
        </ul>
        </div>
      </div>
      </>
      )) : (
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
            <ul className="navbar-nav ml-auto" style={{marginLeft: "auto"}}>
            <li className="nav-item" style={{margin: "6px"}}>
              {modo === 'dark' 
              ? <BsFillSunFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("light"))} id='modoOscuro'/> 
              : <BsFillMoonFill style={{cursor: "pointer"}} onClick={(e) =>dispatch(modoOscuro("dark"))} id='modoOscuro'/>}
            </li>
            {/* <div className={modo}> */}
            <li style={{margin: "8px"}}>
            {lan === "es" 
            ? <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("en"))}>EN</button>
            : <button style={{border: "none", background: "transparent", fontWeight: "bold"}} onClick={(e) => dispatch(language("es"))}>ES</button>}
              {/* <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("es"))}>🇪🇸</button>
              <button style={{border: "none", background: "transparent"}} onClick={(e) => dispatch(language("en"))}>🇬🇧</button> */}
            </li>
            {/* </div> */}
            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle active text-truncate" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsPersonCircle /> {user.username}
                </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/mi-perfil/">{userNavBarLang[lan].Miperfil}</Link></li>
                <li><Link className="dropdown-item" to="/mis-compras">{userNavBarLang[lan].MisCompras}</Link></li>
                <li><Link className="dropdown-item" to="/favoritos">{userNavBarLang[lan].Favoritos}</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" onClick={logout}><FiLogOut style={{marginInlineEnd: "10px"}}/>{userNavBarLang[lan].CerrarSesion}</Link></li>
              </ul>
            </li>
            <li className="nav-item" style={{margin: "-1px"}}>
                    <Link className="nav-link active" to="/cart">
                      <BsFillCartFill /> {cartCount}
                    </Link> 
                  </li>
            </ul>
          </div>
                 
                  {/* <Menu anchorEl={anchorEl} id="account-menu" open={profileOpen} onClose={handleClosee} onClick={handleClosee}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar />
                      <Link to="/mi-perfil" className={styles.links}>
                        {userNavBarLang[lan].Miperfil}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/mis-compras" className={styles.links}>
                        {userNavBarLang[lan].MisCompras}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/favoritos" className={styles.links}>
                        {userNavBarLang[lan].Favoritos}
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout} disableRipple>
                      <ListItemIcon>
                        <FiLogOut fontSize="small" />
                      </ListItemIcon>
                      {userNavBarLang[lan].CerrarSesion}
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div> */}
        </div>
          )) :  <NavBar/>}
    </nav>
    );
}

/*  <nav className={styles.navbar}>
      {user ? (
        user.isAdmin ? (
          auth.currentUser.email === "finalproyect25a@gmail.com" ? (
            <nav className={styles.navbar}>
              <div className={styles.brandLogo}>
                <Link to="/">
                  <img src="https://i.ibb.co/1nF48KZ/logo-removebg.webp" alt="logo" className={styles.logo} />
                </Link>
              </div>
              <div className={styles.search}>
                <SearchBar
                  setCurrentPage={setCurrentPage}
                  className={styles.search}
                />
              </div>
              <Link to="#" className={styles.toggleButton} onClick={change}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </Link>
              <div
                className={`${
                  open ? styles.navbarLinksActive : styles.navbarLinks
                }`}
              >
                <Button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "black",
                  }}
                  id="demo-customized-button"
                  aria-controls={menuOpen ? "demo-customized-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                >
                  Menu de admin
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/publicaciones">
                      Productos
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link
                      className="dropdown-item"
                      to="/admin/agregar-publicacion"
                    >
                      Crear Publicacion
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/editar-stock">
                      Editar Stock
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/users">
                      Usuarios
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link
                      className="dropdown-item"
                      to="/admin/control-de-usuarios"
                    >
                      Administrar Usuarios
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <Link className="dropdown-item" to="/admin/preguntas">
                      Preguntas
                    </Link>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={logout} disableRipple>
                    CerrarSesion
                  </MenuItem>
                </StyledMenu>
              </div>
            </nav>
          ) : (
            <>
              <div className={styles.brandLogo}>
                <Link to="/">
                  <img src="https://i.ibb.co/1nF48KZ/logo-removebg.webp" alt="logo" className={styles.logo} />
                </Link>
              </div>
              <div className={styles.search}>
                <SearchBar
                  setCurrentPage={setCurrentPage}
                  className={styles.search}
                />
                <p className={styles.prf2}>Hola {user.username}!</p>
              </div>
              <Link to="#" className={styles.toggleButton} onClick={change}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </Link>
              <div
                className={`${
                  open ? styles.navbarLinksActive : styles.navbarLinks
                }`}
              >
                <ul>
                  <li>
                    <Link className={styles.cart} to="/cart">
                      <BsFillCartFill /> {cartCount}
                    </Link>
                  </li>
                  <li>
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClickk}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={profileOpen ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={profileOpen ? "true" : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {user.username[0]}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={profileOpen}
                      onClose={handleClosee}
                      onClick={handleClosee}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Avatar />
                        <Link to="/mi-perfil" className={styles.links}>
                          {userNavBarLang[lan].Miperfil}
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/mis-compras" className={styles.links}>
                          {userNavBarLang[lan].MisCompras}
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/favoritos" className={styles.links}>
                          {userNavBarLang[lan].Favoritos}
                        </Link>
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemIcon>
                          <FiLogOut fontSize="small" />
                        </ListItemIcon>
                        {userNavBarLang[lan].CerrarSesion}
                      </MenuItem>
                    </Menu>
                  </li>
                  <li>
                    <Button
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "black",
                      }}
                      id="demo-customized-button"
                      aria-controls={
                        menuOpen ? "demo-customized-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={menuOpen ? "true" : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClick}
                    >
                      Menu de admin
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu"
                      MenuListProps={{
                        "aria-labelledby": "demo-customized-button",
                      }}
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose} disableRipple>
                        <Link
                          className="dropdown-item"
                          to="/admin/publicaciones"
                        >
                          Productos
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Link
                          className="dropdown-item"
                          to="/admin/agregar-publicacion"
                        >
                          Crear Publicacion
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Link
                          className="dropdown-item"
                          to="/admin/editar-stock"
                        >
                          Editar Stock
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose} disableRipple>
                        <Link className="dropdown-item" to="/admin/users">
                          Usuarios
                        </Link>
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose} disableRipple>
                        <Link
                          className="dropdown-item"
                          to="/admin/control-de-usuarios"
                        >
                          Administrar Usuarios
                        </Link>
                      </MenuItem> 
                      <MenuItem onClick={handleClose} disableRipple>
                        <Link className="dropdown-item" to="/admin/preguntas">
                          Preguntas
                        </Link>
                      </MenuItem>
                    </StyledMenu>
                  </li>
                </ul>
              </div>
            </>
          )
        ) : (
          <>
            <div className={styles.brandLogo}>
              <Link to="/">
                <img src="https://i.ibb.co/1nF48KZ/logo-removebg.webp" alt="logo" className={styles.logo} />
              </Link>
            </div>
            <div className={styles.search}>
              <SearchBar
                setCurrentPage={setCurrentPage}
                className={styles.search}
              />
              <p className={styles.prf2}>Hola {user.username}!</p>
            </div>
            <Link to="#" className={styles.toggleButton} onClick={change}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </Link>
            <div
              className={`${
                open ? styles.navbarLinksActive : styles.navbarLinks
              }`}
            >
              <ul>
                <li>
                  <Link className={styles.cart} to="/cart">
                    <BsFillCartFill /> {cartCount}
                  </Link>
                </li> 
                <li>
                  <Tooltip title="Account settings">
                    <IconButton onClick={handleClickk} size="small" sx={{ ml: 2 }} aria-controls={profileOpen ? "account-menu" : undefined} aria-haspopup="true" aria-expanded={profileOpen ? "true" : undefined}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {user.username[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu anchorEl={anchorEl} id="account-menu" open={profileOpen} onClose={handleClosee} onClick={handleClosee}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar />
                      <Link to="/mi-perfil" className={styles.links}>
                        {userNavBarLang[lan].Miperfil}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/mis-compras" className={styles.links}>
                        {userNavBarLang[lan].MisCompras}
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/favoritos" className={styles.links}>
                        {userNavBarLang[lan].Favoritos}
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <FiLogOut fontSize="small" />
                      </ListItemIcon>
                      {userNavBarLang[lan].CerrarSesion}
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div>
          </>
        )
      ) : (
        <NavBar />
      )}
      </nav> */
  
