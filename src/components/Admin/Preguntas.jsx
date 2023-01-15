import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import {getAllUsers, getQuestions, getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

import style from "./Admin.module.css"

export default function Preguntas(){
const allQuestions = useSelector((state) => state.questions)

const history = useHistory();
const dispatch = useDispatch()
const [input, setInput] = useState("");

useEffect(()=>{

      userVerificate()
    dispatch(getQuestions())
    
},[dispatch])

const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {

        if(currentUser === null){

          history.push("/");
    
        }

        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
 

    const handlerChange = (e) => {
        
        setInput(e.target.value);
    };
    const responder = async (e) => {
        let questionID = e.nativeEvent.path[1].id;
        
        if(input){
    
        await axios.put(`https://back2demo2-production.up.railway.app/pregunta/${questionID}`, {

          answer: input
        });
        swal("Respuesta enviada")
        window.location.reload()
      }else swal("Haga una pregunta antes de publicar")
    
    };

const editar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id;
    
    await axios.put(`https://back2demo2-production.up.railway.app/pregunta/${questionID}`, {

        answer: null
      });
      swal("Respuesta Eliminada")
      window.location.reload()
}

const eliminar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id
   
    await axios.delete(`https://back2demo2-production.up.railway.app/pregunta/${questionID}`);
    swal("Pregunta Eliminada")
      window.location.reload()
}

return (
  <div className={style.fondo}>
    <div className="vh-100">
    <Link to="/">
      <button className={style.btn}>Volver</button>
    </Link>


    <div className="d-flex justify-content-center">
      <h1
        style={{ background: "#4B657C" }}
        className="col-6 row justify-content-center shadow py-2 px-4 rounded text-white"
      >
        Preguntas
      </h1>
    </div>

    {allQuestions ? (
      allQuestions.map((e) => {
        return (
          <div className="row justify-content-center mt-4">
            <div
              id={e.id}
              className="border rounded align-items-center justify-content-center w-75"
            >
              <p>Usuario: {e.user_email}</p>
              <p>-{e.question}</p>

              {!e.answer ? (
                <div id={e.id} className="w-100 row">
                  <input
                    className="form-control w-50 me-3"
                    onChange={(e) => handlerChange(e)}
                    type="text"
                    placeholder="responder..."
                  />
                  <button
                    className="btn btn-secondary w-25"
                    onClick={(e) => responder(e)}
                  >
                    Responder
                  </button>
                </div>
              ) : (
                <div id={e.id}>
                  <hr/>
                  <p>-{e.answer}</p>
                  {/* <div className="d-flex justify-content-center"> */}
                    <button
                      className="m-1 btn btn-secondary d-flex justify-content-center align-items-center"
                      onClick={(e) => editar(e)}
                    >
                      Borrar respuesta
                    </button>
              <button
                className="m-1 d-flex justify-content-center btn btn-danger"
                onClick={(e) => eliminar(e)}
              >
                Eliminar pregunta
              </button>
                  {/* </div> */}
                </div>
              )}
              <br />
              <div></div>
            </div>
          </div>
        );
        // quiero retornar TODAS las preguntas de TODOS los celulars

        //   e.map(el=>{

        //          return(
        //              <div>
        //                 <p>lsa preguntas son: </p>

        //                 {/* <p>{el.pregunta}</p> */}

        //              </div>
        //          )

        //      })
      })
    ) : (
      <p>No hay preguntas</p>
    )}
  </div>
  </div>
);
}