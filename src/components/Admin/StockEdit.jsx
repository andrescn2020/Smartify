import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";
import style from "./Admin.module.css"
import swal from "sweetalert";

export default function StockEdit() {
  const dispatch = useDispatch();
  const [postsState, setPostsState] = useState([]);
  const [change, setChange] = useState({ do: "add", amount: 0 });
  const history = useHistory();

  useEffect(() => {
    userVerificate();
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  async function loadPosts() {
    try {
      let post = (await axios.get("https://back25ademo.herokuapp.com/admin/posts")).data;

      post = post.sort(function (a, b) {
        if (a.model.toLowerCase() > b.model.toLowerCase()) return 1;
        if (a.model.toLowerCase() < b.model.toLowerCase()) return -1;
        return 0;
      });

      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
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

  function settings(e) {
    setChange({
      ...change,
      [e.target.name]: e.target.value,
    });
  }

  async function editStock(id) {
    try {
      let stockInitial = postsState.find((el) => el.id === id).stock;
      let stockToChange = parseInt(document.getElementById(id).value);
      let actionToDo = document.getElementById("do").value;

      if (
        stockToChange === "NaN" ||
        (actionToDo === "remove" && stockToChange > stockInitial) ||
        stockToChange < 0
      ) {
        swal(
          "No se puede realizar la operacion debido. Revise stock actual  y valores unicamente positivos"
        );
      } else {
        let bod = { ...change, id: id };

        await axios.put("https://back25ademo.herokuapp.com/admin/modifica-stock", bod);

        setChange({ ...change, amount: 0 });
        
        document.getElementById(id).value = null;
        swal("Se edito el stock correctamente")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={style.fondo}>
      <Link to="/">
        <button className={style.btn}>Volver</button>
      </Link>

      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1
          style={{ background: "#4B657C" }}
          className="col-6 m-3 row justify-content-center shadow py-2 px-4 rounded text-white"
        >
          Cambio de stock
        </h1>
      </div>

      <div className="d-flex flex-column align-items-center ">
        {postsState?.map((el) => (
          <div className="row border rounded w-50 mb-2 h-5" key={el.id}>
            <div className="row ">
              <h6 className=" d-flex justify-content-center">
                {" "}
                {el.brand} - {el.model} - {el.stock} unidades{" "}
              </h6>
              {el.stock <= 5 ? <p>⚠️ Cantidad de stock crítica</p> : null}
            </div>
            <div className="row justify-content-center ">
              <select
                className="form-select w-50 m-2 "
                id="do"
                name="do"
                onChange={settings}
              >
                <option value="add">Agregar stock</option>
                <option value="remove">Quitar stock</option>
              </select>
              <div className="row w-25 justify-content-center align-items-center">
                <input
                  type="number"
                  className="form-control w-75  "
                  id={el.id}
                  name="amount"
                  onChange={settings}
                />
                {/* <label className=" ms-2 w-25">U</label> */}
              </div>

              <button
                className="btn btn-outline-secondary mt-2 mb-2 w-25 "
                onClick={() => editStock(el.id)}
              >
                Editar
              </button>

              <br />
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
