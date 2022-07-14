import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import swal from "sweetalert";
import { getDetails, editPost, getUser, cleanUp } from "../../Actions";
import { auth } from "../../firebase/firebase-config";
import style from "./Admin.module.css"

export default function ProductToEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const PID = useSelector((state) => state.phonesId);
  const [state, setState] = useState({});

  useEffect(() => {
    userVerificate();
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      let producto = await dispatch(getDetails(id));

      setState(producto.payload);
      if (currentUser === null) {
        history.push("/");
      }
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

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  function handleRAM(e) {
    setState({
      ...state,
      ram: e.target.value,
    });
  }

  function handleROM(e) {
    setState({
      ...state,
      rom: e.target.value,
    });
  }

  function handleNetwork(e) {
    setState({
      ...state,
      network: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    console.log(state);
    dispatch(editPost(id, state));
    swal("Cambios guardados exitosamente");
    history.push("/admin/publicaciones");
  };

  const base64Convert = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      //aca en base64 el archivo ya esta convertido a texto
      setState({ ...state, images: base64 });
    };
  };

  const addNewPicture = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      let array = state.additionalphotos;
      array.push(base64);

      setState({ ...state, additionalphotos: array });
    };
  };

  const takeOut = (index) => {
    let arr = state.additionalphotos;
    let arrAux = [];

    for (let i = 0; i < arr?.length; i++) {
      if (i !== index) arrAux.push(arr[i]);
    }

    setState(() => ({ ...state, additionalphotos: arrAux }));
  };

  return (
    <div className={style.fondo}>
      <Link to="/admin/publicaciones">
        <button className={style.btn}>Volver</button>
      </Link>
<div className="d-flex flex-column align-items-center justify-content-center">
    <div className="border rounded col-5">
      <div className="col-12 d-flex flex-column align-items-center justify-content-center">
      <h1 style={{'background':'#4B657C'}} className="col-12 row justify-content-center shadow py-2 px-4 rounded text-white">
            Edición de Publicación
          </h1>
        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Marca</label>
          <input
            type="text"
            className="form-control"
            placeholder={state.brand}
            name="brand"
            id="brand"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Fecha de lanzamiento</label>
          <input
            className="form-control"
            placeholder={state.releaseDate}
            type="text"
            name="releaseDate"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Modelo</label>
          <input
            className="form-control"
            placeholder={state.model}
            type="text"
            name="model"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Precio</label>
          <input
            className="form-control"
            placeholder={state.price}
            type="number"
            name="price"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Puntuación</label>
          <input
            className="form-control"
            placeholder={state.rating}
            type="number"
            name="rating"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <label className="form-label">Imagen principal</label>
        <div className="border rounded col-8 d-flex flex-column align-items-center justify-content-center">
          <div className="mb-3 col-4 d-flex flex-column align-items-center">
            <div className="p-3">
              <img
                src={state.images}
                width="50"
                height="50"
                alt="no encontrada"
              />
            </div>
            <input
              className="form-control"
              type="file"
              onChange={(ev) => base64Convert(ev)}
              required
            />
          </div>
        </div>

        <label className="form-label p-3">Imagenes secundarias-max: 3</label>

        <div className="border rounded col-8 d-flex flex-column align-items-center">

          <div className=" mb-4 col-12 d-flex flex-row justify-content-center align-items-center">
            {state.additionalphotos?.map((el, index) => (
              <div key={index}>
                <div className="p-4">
                  <img src={el} width="50" height="50" alt="no encontrada" />
                </div>

                <button
                  className="form-control p-1"
                  onClick={() => takeOut(index)}
                >
                  Quitar
                </button>
                <br />
              </div>
            ))}
          </div>

          <div className=" col-4 mb-3">
            {state.additionalphotos?.length < 3 ? (
              <input
                className="form-control"
                type="file"
                onChange={(ev) => addNewPicture(ev)}
                required
              />
            ) : null}
          </div>
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label p-3">Color</label>
          <input
            className="form-control"
            placeholder={state.color}
            type="text"
            name="color"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Procesador</label>
          <input
            className="form-control"
            placeholder={state.processor}
            type="text"
            name="processor"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Memoria RAM</label>
          <select className="form-control" onChange={(e) => handleRAM(e)}>
            <option disabled> select RAM </option>
            <option value="4Gb">4Gb</option>
            <option value="6Gb">6Gb</option>
            <option value="8Gb">8Gb</option>
            <option value="12Gb">12Gb</option>
          </select>
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Memoria ROM</label>
          <select className="form-control" onChange={(e) => handleROM(e)}>
            <option disabled> select ROM </option>
            <option value="32Gb">32Gb</option>
            <option value="64Gb">64Gb</option>
            <option value="128Gb">128Gb</option>
            <option value="256Gb">256Gb</option>
          </select>
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Red</label>
          <select className="form-control" onChange={(e) => handleNetwork(e)}>
            <option disabled> select Network </option>
            <option value="3G">3G</option>
            <option value="4G">4G</option>
            <option value="5G">5G</option>
          </select>
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Batería(mAh)</label>
          <input
            className="form-control"
            placeholder={state.batery}
            type="number"
            name="batery"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Cámara principal</label>
          <input
            className="form-control"
            placeholder={state.main_cam}
            type="number"
            name="main_cam"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Camara frontal</label>
          <input
            className="form-control"
            placeholder={state.frontal_cam}
            type="number"
            name="frontal_cam"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Pulgadas (for screen)</label>
          <input
            className="form-control"
            placeholder={state.inches}
            type="number"
            name="inches"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Pantalla (type)</label>
          <input
            className="form-control"
            placeholder={state.screen}
            type="text"
            name="screen"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3 col-8 d-flex flex-column align-items-center">
          <label className="form-label">Resolución</label>
          <input
            className="form-control"
            placeholder={state.resolution}
            type="text"
            name="resolution"
            required
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className={style.btn} onClick={handleSubmit}>Guardar cambios</button>
      </div>
      </div>
      </div>
    </div>
  );
}
