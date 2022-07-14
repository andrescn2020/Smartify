import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import Comprar from '../Comprar/Comprar'
import axios from 'axios'
import {getLocalCart} from '../../Actions'
import { auth } from '../../firebase/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useHistory } from 'react-router-dom'
import styles from './MP.module.css'
import BtnBack from '../back/BtnBack'
function App() {
  
  const [datos, setDatos] = useState("");
  const [user, setUser] = useState({}) 
  const cart = useSelector(state => state.cart);
  const history = useHistory();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        setUser(user);
        if(user.data.banned){

          history.push("/banned")

        }
      }
    });
  };
  


  //  useEffect(()=>{
  //    axios
  //    .get("http://localhost:3001/mercadopago/")
  //    .then((data)=>{
  //      setDatos(data.data)
  //      console.info('Contenido de data:', data)
  //    }).catch(err => console.error(err))
  //  },[])
  const productos = cart.map(e => ({
    title: e.model,
    unit_price: e.price,
    quantity: e.qty
  }))


  useEffect(()=>{
    let pack = []
    pack.push(cart)
    pack.push(auth.currentUser.email)
    axios
    .post(`http://localhost:3001/mercadopago`, pack)
    .then((data)=>{
      setDatos(data.data)
    }).catch(err => console.error(err))
  },[])

  return (
    <div className="App">
       { !datos
        ? <p>Aguarde un momento....</p>  
        : <>
        <BtnBack/>
          <div className={styles.container}>
            <h1>Información de la Compra</h1>
            <div className={styles.containerDatos}>
            <h1>Información de entrega:</h1>
                <h3>Nombre: {user.data.username}</h3>
                <h3>Email: {user.data.email}</h3>
                <h3>Dirección de entrega: {user.data.address}</h3>
            </div>
              <Comprar productos={cart} data={datos} className={styles.comprar} />
            </div> 
          </>
       } 
    </div>
  );
}

export default App;