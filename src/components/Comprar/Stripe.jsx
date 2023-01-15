import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../Actions';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchstoken } from "../Contacto/fetchmetod";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import carrito from "../../images/carrito.png";
import BtnBackCart from '../back/BtnBackCart';
import { BsWindowSidebar } from 'react-icons/bs';

const stripePromise = loadStripe("pk_test_51LKOR4GnBCHzlELLHXedfDprn67bWjnqxJoone0DcZOpbZGhsFliKUgzZGIocqSfIg85nAscUdwWN4Ax5lGk0ozr00I4iU6QrF")

const CheckoutForm = () => {

    //////////////////////////////////// ESTADOS /////////////////////////////////////////////////////////////
    //////////////////////////////////// ESTADOS /////////////////////////////////////////////////////////////
    //////////////////////////////////// ESTADOS /////////////////////////////////////////////////////////////

    const stripe = useStripe();

    const [ cart, setCart ] = useState();

    const history = useHistory();

    const dispatch = useDispatch();

    const elements = useElements();

    const [ loading, setLoading ] = useState(false);

    const [ total, setTotal ] = useState();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////// USEEFFECT /////////////////////////////////////////////////////////////
    //////////////////////////////////// USEEFFECT /////////////////////////////////////////////////////////////
    //////////////////////////////////// USEEFFECT /////////////////////////////////////////////////////////////

    useEffect(() => {

        setCart(JSON.parse(localStorage.getItem("cart")))
        userVerificate();

    }, []);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////// FUNCION MAIL //////////////////////////////////////////////////////////
    //////////////////////////////////// FUNCION MAIL //////////////////////////////////////////////////////////
    //////////////////////////////////// FUNCION MAIL //////////////////////////////////////////////////////////

    const correoEmail = async () => {

        let obj = {
          contact_user: "Smartify",
          correo_user: auth.currentUser.email,
          asunto_user: "Compra realizada",
          descripcion_user: "Gracias por elegirnos!!! su producto fue despachado, estara llegando en un lapso de entre 7 a 21 dias.",
        }
    
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
    
        try {
    
          const resultCorreo = await fetchstoken('correo', obj, "POST");
    
          if (!resultCorreo.ok) {
    
            throw Error(resultCorreo.errors.msg);
    
          }
          Toast.fire({
            icon: 'success',
            title: 'La compra se realizo con exito!'
          });
    
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: "Hubo un error en el proceso de pago, Por favor vuelva a intentarlo."
          })
        }
      }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////// FUNCION LOGIN ///////////////////////////////////////////////////////
    ////////////////////////////////////// FUNCION LOGIN ///////////////////////////////////////////////////////
    ////////////////////////////////////// FUNCION LOGIN ///////////////////////////////////////////////////////

    const userVerificate = () => {

        onAuthStateChanged(auth, async (currentUser) => {

          if (currentUser) {

            let local = JSON.parse(localStorage.getItem("cart"))

            let totalAmount = 0

            for (let i = 0; i < local.length; i++) {
               
                totalAmount += local[i].qty * local[i].price
                
            }

            setTotal(parseInt(totalAmount));
            
          }

        });

      };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////// FUNCION DE COMPRA ///////////////////////////////////////////////////
    ////////////////////////////////////// FUNCION DE COMPRA ///////////////////////////////////////////////////
    ////////////////////////////////////// FUNCION DE COMPRA ///////////////////////////////////////////////////

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
    
            const { error, paymentMethod } = await stripe.createPaymentMethod({
    
                type: "card",
                card: elements.getElement(CardElement)
    
            });

            setLoading(true);
    
            if(!error) {
    
               const { id } = paymentMethod;
    
                await axios.post("https://back2demo2-production.up.railway.app/stripe/checkout", {

                id, 
                amount: total * 100

               });

               localStorage.removeItem('cart');

               dispatch(clearCart(auth.currentUser.email))

               correoEmail();
    
               elements.getElement(CardElement).clear(); 

               history.push("/");

              // window.location.reload()
    
            }

        } catch (error) {

            correoEmail();

            console.log(error);

            history.push("/");
            
        }

        setLoading(false);

    }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////

      //////////////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////////
      //////////////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////////
      //////////////////////////////////// RENDERIZADO /////////////////////////////////////////////////////////////

    return (
        

    <form onSubmit={handleSubmit} className="card card-body">

        <img src={carrito} alt="cart" className='img-fluid' />

        <div><hr />
            {cart?.map((productInCart) => (

                <div key={productInCart.id}>
                <span>Producto: {`${productInCart.brand} ${productInCart.model}`}</span><br />
                <span> Cantidad: {productInCart.qty}</span><br />
                <span> Precio de unidad: {productInCart.price}US$</span><hr />
                </div>

            ))}
        </div>

        <h3 className='text-center my-2'>Monto Total: US$ {total}</h3>

        <div className="form-group">
            <CardElement className='form-control' />
        </div>

        <button className='btn mt-4'  style={{backgroundColor: "#3A497E", fontWeight: "bold", color: "white"}} disabled={!stripe}>
            { loading ? (
                <div className="spinner-border text-light" role="status">
                    <span className='sr-only'></span>
                </div>
            ) : "Buy" }
        </button>

    </form>
    
    );

}

const Stripe = () => {


    return (
        <Elements stripe={stripePromise}>
             <BtnBackCart/>
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </Elements>
    )
}

export default Stripe