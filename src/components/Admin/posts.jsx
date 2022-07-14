import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../../Actions";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

export default function Posts(props) {

  const dispatch = useDispatch();
  const [postsState, setPostsState] = useState([]);
  const history = useHistory();

  useEffect( () => {

    userVerificate();
    loadPosts();

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      if(currentUser === null){

        history.push("/");
  
      }

      try {

        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin || info.payload.banned){

          history.push("/");

        }
    
      } catch (error) {

        console.log(error);
        
      }

    });
  };
  
  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:3001/admin/posts")).data;
      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      await axios.delete(`http://localhost:3001/admin/post/${id}`);
      await loadPosts();
      swal("Publicación borrada");
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <Link to="/">
        <button className="btn btn-secondary m-3">Volver</button>
      </Link>
      
      

      {postsState?.map((el) => (
        <div className="p-2 m-1" key={el.id}>
          <h4 className="m-4">
            {el.brand} - {el.model}
          </h4>

          <div
            className="d-flex flex-row justify-content-around" /* style={{ height: "40em" }} */
          >
            <ul className="list-group col-3">
              <li className="list-group-item">Lanzamiento: {el.releaseDate}</li>
              <li className="list-group-item">Precio: ${el.price}</li>
              <li className="list-group-item">Procesador: {el.processor}</li>
              <li className="list-group-item">Memoria RAM: {el.ram}</li>
              <li className="list-group-item">Memoria ROM: {el.rom}</li>
              <li className="list-group-item">Red: {el.network}</li>
              <li className="list-group-item">Batería: {el.batery}</li>
            </ul>

            <ul className="list-group col-3">
              <li className="list-group-item">
                Cámara frontal: {el.frontal_cam}
              </li>
              <li className="list-group-item">
                Camara principal: {el.main_cam}
              </li>
              <li className="list-group-item">Pantalla: {el.screen}</li>
              <li className="list-group-item">Pulgadas: {el.inches}</li>
              <li className="list-group-item">Resolución: {el.resolution}</li>
              <li className="list-group-item">Colores: {el.color}</li>
              <li className="list-group-item">Puntuación: {el.rating}</li>
            </ul>

            <div className="border rounded col-1 d-flex justify-content-center align-items-center p-2 ">
              <div>
                <img src={el.images} className="img-fluid" alt="" />
              </div>
            </div>

            <div className="border rounded col-3 d-flex flex-row justify-content-around align-items-center">
              {el.additionalphotos?.length >= 1
                ? el.additionalphotos.map((elem, index) => (
                    <div key={index}>
                      <img className="img-fluid" src={elem} alt="" />
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="m-3">
            <Link to={`/admin/ProductToEdit/${el.id}`}>
              <button className="btn btn-secondary m-2">Editar</button>
            </Link>
            <button className="btn btn-secondary m-2" onClick={() => deletePost(el.id)}> Borrar </button>
          </div>

          <div className="d-flex flex-row m-3 p-3"></div>

          
        </div>
      ))}
    </div>
  );
}
