import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
//import Carrousel from "../carrousel/Carrousel";
import style from "./../home/Home.module.css";
import NavBar from "../NavBar/NavBar";
import { filters, getLocalCart, getLocalFavs, loadingPage, getLocalFilter, getPhones, getUser, language, pageOne, setPage, setSelects, modoOscuro} from "../../Actions/index";
import Paginado from "../Paginate/paginate";
import UserNavBar from "../UserNavBar/UserNavBar";
import { onAuthStateChanged, reload, signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase/firebase-config";
import { fetchstoken } from "../Contacto/fetchmetod";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { homeLang } from "./homeLang";
import { FormattedMessage, IntlProvider } from 'react-intl'
import Carrousel from "../carrousel/Carrousel";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/Searchbar";

const Home = () => {

  //////////////////////////////////////// CONSTANTES /////////////////////////////////////////////////////////
  //////////////////////////////////////// CONSTANTES /////////////////////////////////////////////////////////
  //////////////////////////////////////// CONSTANTES /////////////////////////////////////////////////////////

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const allPhones = useSelector((state) => state.phones);
  const allPhonesForSelect = useSelector((state) => state.phonesForSelect)
  const filtrados = useSelector((state) => state.filtered);
  const lan = useSelector((state) => state.language)
  const page = useSelector(state => state.currentPage)
  const brands = useSelector((state) => state.brands);
  const rams = useSelector((state) => state.rams);
  const roms = useSelector((state) => state.roms);
  const networks = useSelector((state) => state.networks);
  const processors = useSelector((state) => state.processors);
  const [phonesPerPage] = useState(4);
  const indexOfLastPhones = page * phonesPerPage;
  const indexOfFirstPhones = indexOfLastPhones - phonesPerPage;
  const cart = useSelector(state => state.cart)
  const favs = useSelector(state => state.favs)
  const currentPhones = allPhones.slice(indexOfFirstPhones, indexOfLastPhones);

  const [filtered, setFiltered] = useState({
    byRom: null,
    byRam: null,
    byBrand: null,
    byPrice: null,
    byNetwork: null,
    byProcessor: null,
    byOrder: null,
  });

  const [loggedUser, setLoggedUser] = useState();

    //acá se setea el idioma
    const messages = homeLang[lan]

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////// USEEFFECTS //////////////////////////////////////////////////////////////////////////////////
  //////////// USEEFFECTS //////////////////////////////////////////////////////////////////////////////////
  //////////// USEEFFECTS //////////////////////////////////////////////////////////////////////////////////
  //////////// USEEFFECTS //////////////////////////////////////////////////////////////////////////////////

  useEffect(async () => {
    dispatch(loadingPage())
    await dispatch(getPhones());
     
    userVerificate();
    //document.getElementById('langu').value = JSON.parse(localStorage.getItem("l"))
    document.getElementById('modoOscuro').value = JSON.parse(localStorage.getItem("modoOscuro"))

    dispatch(setSelects())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPhones]);

  useEffect(() => {

    dispatch(getLocalFavs());
    dispatch(getLocalCart());

  }, [])

  useEffect(() => {
    dispatch(getLocalFilter())
    let localfilter = JSON.parse(localStorage.getItem("filter"))
    localfilter !== null ?
      dispatch(filters(localfilter)) :
      dispatch(filters(filtered))
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('favs', JSON.stringify(favs));
  }, [cart, favs])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////



  /////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////
  /////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////
  /////////////////////////// FUNCIONES ///////////////////////////////////////////////////////////

  const userVerificate = () => {

    onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        let info = await dispatch(getUser(currentUser.email))

        if (currentUser.emailVerified) {

          await axios.put(`http://localhost:3001/verification/${currentUser.email}`)

        }

        setLoggedUser(info.payload);

      }
    });
  };

  const paginado = (pageNumber) => {

    dispatch(setPage(pageNumber));

  };



  function filtersSetters(e) {
    let price = document.getElementById("price").value;
    if (price === "null") {
      price = null;
    } else {
      price = document.getElementById("price").value.split(",");
      price = [
        parseInt(document.getElementById("price").value.split(",")[0]),
        parseInt(document.getElementById("price").value.split(",")[1]),
      ];
    }

    setFiltered(() => ({
      byBrand:
        document.getElementById("brand").value === "null"
          ? null
          : document.getElementById("brand").value,
      byRom:
        document.getElementById("rom").value === "null"
          ? null
          : document.getElementById("rom").value,
      byRam:
        document.getElementById("ram").value === "null"
          ? null
          : document.getElementById("ram").value,
      byNetwork:
        document.getElementById("network").value === "null"
          ? null
          : document.getElementById("network").value,
      byOrder:
        document.getElementById("order").value === "null"
          ? null
          : document.getElementById("order").value,
      byPrice: price,
      byProcessor:
        document.getElementById("processor").value === "null"
          ? null
          : document.getElementById("processor").value,
    }));


  }


  const send = async (e) => {
    dispatch(filters(filtered));
    localStorage.setItem('filter', JSON.stringify(filtered));
    dispatch(pageOne());

  };

  const clearFilter = (e) => {

    document.getElementById("brand").value = "null"
    document.getElementById("rom").value = "null"
    document.getElementById("price").value = "null"
    document.getElementById("ram").value = "null"
    document.getElementById("network").value = "null"
    document.getElementById("order").value = "null"
    document.getElementById("processor").value = "null"

    let clear = {
      byBrand: null,
      byRom: null,
      byRam: null,
      byNetwork: null,
      byOrder: null,
      byPrice: null,
      byProcessor: null,
    }

    localStorage.removeItem("filter")
    dispatch(filters(clear));
    // setCurrentPage(1);

  };

  const logout = async () => {

    await signOut(auth);

  };

  // const lang = (e) => {

  //   dispatch(language(e.target.value));

  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////
  
  /////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////
  /////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////
  /////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////

  return (

    <div>

      {!loading ? <IntlProvider locale='es' messages={messages}>
    
      <div className={style.fondo}>
      <div className="display-flex row y justify-content-center g-0">


            {/* <button onClick={logout}>desloguear</button> */}

            {loggedUser ? <UserNavBar /> : <NavBar />}
            
            <Carrousel/>
            
            <div style={{marginInline: "auto"}}>
            <br/>
            <SearchBar/>
            </div>

            <div className="d-flex flex-row justify-content-center alig-items-center mt-3" id="filtros" >
<br/>
              <select id='brand' className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px", fontWeight: "bold"  }} onChange={e => filtersSetters(e)}>
                <option value="null">{homeLang[lan].Todas}</option>
                {brands?.map((brand) =>
                  <option key={brand} value={brand}>{brand}</option>
                )}
                  </select>


              {/* por Ram--------------------------------------------------- */}
              <select id="ram" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px", fontWeight: "bold"  }} onChange={(e) => filtersSetters(e)}>
                <option value="null">Ram</option>
                {rams?.map((ram) =>
                  <option key={ram} value={ram}>{ram}</option>
                )}
              </select>

              {/* por network----------------------------------------------- */}
              <select id="network" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" , fontWeight: "bold" }} onChange={(e) => filtersSetters(e)}>
                <option value="null">{homeLang[lan].Red}</option>
                {networks?.map((network) =>
                  <option key={network} value={network}>{network}</option>
                )}
              </select>

              {/* por Rom--------------------------------------------------- */}
              <select id="rom" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px", fontWeight: "bold"  }} onChange={(e) => filtersSetters(e)}>
                <option value="null">Rom</option>
                {roms?.map((rom) =>
                  <option key={rom} value={rom}>{rom}</option>
                )}
              </select>

              {/* por orden--------------------------------------------------- */}
              <select id="order" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" , fontWeight: "bold" }} onChange={(e) => filtersSetters(e)}>
                <option value="null">{homeLang[lan].Pordefecto}</option>
                <option value="rating">{homeLang[lan].Porpuntuacion}</option>
                <option value="ascendingPrice">{homeLang[lan].Ordenascendiente}</option>
                <option value="descendingPrice">{homeLang[lan].Ordendescendiente}</option>
              </select>

              {/* por precio--------------------------------------------------- */}
              <select id="price" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px", fontWeight: "bold"  }} onChange={(e) => filtersSetters(e)}>
                <option value="null">{homeLang[lan].precio}</option>
                <option value={[0, 500]}>de u$ 0 a u$ 500</option>
                <option value={[500, 1000]}>de u$ 500 a u$ 1000</option>
                <option value={[1000, 1500]}>de u$ 1000 a u$ 1500</option>
              </select>

              {/* por processor--------------------------------------------------- */}
              <select id="processor" className="form-select form-select-m mb-3 text-truncate " aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px", fontWeight: "bold"  }} onChange={(e) => filtersSetters(e)}>
                <option value="null" >{homeLang[lan].Procesador}</option>
                {processors?.map((processors) =>
                  <option key={processors} value={processors}>{processors}</option>
                )}
              </select>
     
            </div>

            <div className="d-flex flex-row justify-content-center alig-items-center mt-1">
            <div className="center-block">
              <button className="p-3 mb-2 text-white " style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px" , fontWeight: "bold"}} onClick={() => clearFilter()}>{homeLang[lan].Limpiarfiltros}</button>
              <button className="p-3 mb-2 text-white ms-2" style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px", fontWeight: "bold" }}  onClick={() => send()}>{homeLang[lan].Buscar}</button>
              </div>
              </div>
            {/* filtrado************************************ */}
            <div className={style.flex}>
              {currentPhones && allPhones.length ? (
                currentPhones?.map((e) => {
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
                })
              ) : (
                <div>
                  <h1>{homeLang[lan].noseenc}</h1>
                </div>
              )}
            </div>
            <br />
            <Paginado
              phonesPerPage={phonesPerPage}
              allPhones={allPhones.length}
              paginado={paginado}
            />
            <div className="display-flex align-items-center justify-content-center col-auto">
      {/* <Link to='/about'>
      <button className="btn btn-secondary align-items-center justify-content-center col-auto"><h4>conocenos...</h4></button>
      </Link> */}
    </div>
          </div>
        </div>

        <Footer/>
    </IntlProvider>
: <div class="d-flex justify-content-center align-items-center" style={{marginBlock: "25%"}}>
<div style={{width: "10rem", height: "10rem"}} class="spinner-grow" role="status">
 
</div>
</div>}
</div>
  );
};

export default Home;