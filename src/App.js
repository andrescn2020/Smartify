import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/home';
import Detail from './components/Detail/detail';
import Created from './components/Created/created';
import Admin from './components/Admin/Admin';
import Posts from './components/Admin/posts';
import StockEdit from './components/Admin/StockEdit';
import UsersControl from './components/Admin/UsersControl';
import MiPerfil from './components/User/MiPerfil';
import Cart from './components/cart/Cart';
import Favourites from './components/User/Favourites';
import MisCompras from './components/User/MisCompras';
import mp from './components/MP/mp';
import Identify from './components/login/indentify';
import Contacto from './components/Contacto/contacto';
import ProductToEdit from './components/Admin/ProductToEdit';
import Users from './components/Admin/users';
import BannedUser from './components/User/BannedUser';
import Preguntas from './components/Admin/Preguntas';
import LandingPage from './components/landingPage/LandingPage';
import About from './components/About/About';
import "./App.css"
//-----------NO BORRAR------------
import bootstrap from "bootstrap"
//--------------------------------
import { useSelector } from 'react-redux';
import Stripe from './components/Comprar/Stripe';

function App() {
  const modo = useSelector(state => state.modo)
  return (
    <BrowserRouter>
      <Switch>
    <div className={modo}>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/banned" component={BannedUser} />
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/identify" component={Identify} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/mi-perfil" component={MiPerfil} />
        <Route exact path="/favoritos" component={Favourites} />
        <Route exact path="/mis-compras" component={MisCompras} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/mercadopago" component={mp}/>
        <Route exact path="/stripe" component={Stripe}/>
        <Route exact path="/admin/agregar-publicacion" component={Created} />
        <Route exact path="/admin/publicaciones" component={Posts} />
        <Route exact path="/admin/editar-stock" component={StockEdit}/>
        <Route exact path="/admin/control-de-usuarios" component={UsersControl}/>
        <Route exact path="/admin" component={Admin} />      
        <Route exact path="/admin/users" component={Users}/> 
        <Route exact path="/admin/ProductToEdit/:id" component={ProductToEdit}/> 
        <Route exact path="/contacto" component={Contacto} /> 
        <Route exact path="/admin/preguntas" component={Preguntas}/>
    </div>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
