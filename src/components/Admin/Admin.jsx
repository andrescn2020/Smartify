import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllUsers, getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

export default function Admin() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users)
  const history = useHistory();

  const userVerificate = async () => {
 
    await onAuthStateChanged(auth, async (currentUser) => {
      if(currentUser === null){

        history.push("/");
  
      }
      dispatch(getAllUsers());
      try {

        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {

  
    userVerificate();
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <h1>Administración de la página</h1>
      <Link to="/admin/agregar-publicacion">
        <button>Publicar nuevo artículo</button>
      </Link>
      <br />
      <Link to="/admin/publicaciones">
        <button>Publicaciones</button>
      </Link>
      <br />
      <Link to="/admin/editar-stock">
        <button>Modificar stock de productos</button>
      </Link>
      <br />
      <Link to="/admin/control-de-usuarios">
        <button>Administrar usuarios</button>
      </Link>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to={`/admin/users`}>
        <button>Usuarios</button>
      </Link>
      <Link to={`/admin/preguntas`}>
        <button>Preguntas</button>
      </Link>
      <h3>Ventas realizadas:</h3>
        {<div>
          
          {allUsers ? allUsers.map((el) => {
            return (
              <div key={el.email}>
              <h6>
                 {el?.shopping?.map(e => {
                  return (
                    <div key={e.id}>
                    <h6>
                    {e.brand} - {e.model} - {e.releaseDate} - {e.price} - {e.rating} - {e.color} - {e.processor} - {e.ram} - {e.rom} - {e.network} - {e.batery} - {e.frontal_cam} - {e.main_cam} - {e.inches} - {e.screen} - {e.resolution}
                    </h6>
                    <img src={e.images} alt={e.model}/>
                    </div>
                  )
                })}
              </h6>
            </div>
            )
            }): <span>Sin Ventas</span>}
            
        </div> }
      
    </div>
  );
}
