import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetails,
  addToCart,
  getUser,
  getQuestions,
  addToCartUser,
} from "../../Actions/index";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged, reload, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import styles from "./Detail.module.css";
import NavBar from "../NavBar/NavBar";
import BtnBack from "../back/BtnBack";

import { detailLang } from "./detailLang";
import { FormattedMessage, IntlProvider } from "react-intl";
import Footer from "../Footer/Footer";
import swal from "sweetalert";

export default function Detail() {
  const modo = useSelector(state => state.modo)
 

  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    userVerificate();
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const [review, setReview] = useState({
    comentario: "",
  });

  const [loggedUser, setLoggedUser] = useState();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // useEffect(() => {
  //   verificarQueHayaUsuarioLogueado();
  // }, []);

  // const verificarQueHayaUsuarioLogueado = () => {
  //   onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       let user = await axios.get(
  //         `http://localhost:3001/user/${currentUser.email}`
  //       );
  //       if(user.data.banned){

  //         history.push("/banned")

  //       }
  //     }
  //   });
  // };

  const PID = useSelector((state) => state.phonesId);

  const allQuestions = useSelector((state) => state.questions);
  const lan = useSelector((state) => state.language);

  //aca se setea el idioma
  const messages = detailLang[lan];

  function promedio() {
    if (PID.review) {
      let arr = PID.review?.map((el) => el.rating);

      let suma = 0;
      for (let i = 0; i < arr.length; i++) {
        suma = suma + arr[i];
      }

      return (suma / arr.length).toFixed(2);
    } else
      return (
        <FormattedMessage id="no fue ranqueado">
          {<p>{messages} </p>}
        </FormattedMessage>
      );
  }

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        setUser(user.data);
      }
    });
  };

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const publicar = async (e) => {
    // let productID = e.nativeEvent.path[1].id;
    if (input) {
      await axios.post(`http://localhost:3001/pregunta`, {
        question: input,
        user_email: user.username,
        product_ID: PID.id,
      });
      swal('La pregunta se realizo con exito!')
      window.location.reload();
    } else swal("Haga una pregunta antes de publicar");
  };

  return (
    <div className={styles.fondo}>
    <IntlProvider locale='es' messages={messages}>
      {/* <NavBar /> */}

      <BtnBack />
      <div className={styles.divContainer}>
        {/* <div className="ui-pdp-thumbnail__picture" style={{display: "inline-flex", flexFlow: "column wrap"}}>
        {PID.additionalphotos?.length >= 1
          ? PID.additionalphotos.map((el) => (
              <img
                src={el}
                width="44"
                height="44"
                style={{border: "solid black 1px", marginBottom: "8px"}}
                decoding="async"
                alt="No encontrada"
              />
            ))
          : null}
          </div>
        <div className={styles.container1}>
        <div className={modo}>
          <img src={PID.images} alt="marcas" width={300} />
          <img src={PID.images} alt="marcas" width={500} />
        </div> */}
        <div className="content">
          <div
            id="carouselExampleIndicators"
            className="carousel carousel-dark slide"
            data-bs-ride="true"
            style={{width: "700px", height: "500px"}}
          >
            <div className="carousel-indicators" style={{marginBottom: "-3rem", height: "50px"}}>
              <img
                src={PID.images}
                alt
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
                style={{
                    border: "1px solid blue",
                    borderRadius: "5px",
                    paddingBlock: "1%",
                    paddingInline: "3%",
                    backgroundColor: "transparent",
                    height: "100%"}}
              />
              <img
                src={PID.additionalphotos?.[0]}
                alt
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
                style={{
                  border: "1px solid blue",
                  borderRadius: "5px",
                  paddingBlock: "1%",
                  paddingInline: "3%",
                  backgroundColor: "transparent",
                  height: "100%"}}
              />
              <img
                src={PID.additionalphotos?.[1]}
                alt
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
                style={{
                  border: "1px solid blue",
                  borderRadius: "5px",
                  paddingBlock: "1%",
                  paddingInline: "3%",
                  backgroundColor: "transparent",
                  height: "100%"}}
              />
              <img
                src={PID.additionalphotos?.[2]}
                alt
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
                style={{
                  border: "1px solid blue",
                  borderRadius: "5px",
                  paddingBlock: "1%",
                  paddingInline: "3%",
                  backgroundColor: "transparent",
                  height: "100%"}}
              />
            </div>
            <div className="carousel-inner" style={{width: "700px", maxHeight: "max-content", display: "inline-flex", justifyContent: "center"}}>
              <div className="carousel-item active"  style={{marginRight: "0", width: "max-content", transition: "transform 0.5s ease-in-out"}}>
                <img src={PID.images} style={{maxWidth: "100%", maxHeight: "100%"}} alt="..." />
              </div>
              <div className="carousel-item" style={{marginRight: "0", width: "max-content"}}>
                <img
                  src={PID.additionalphotos?.[0]}
                  style={{maxWidth: "100%", maxHeight: "100%"}}
                  alt=""
                />
              </div>
              <div className="carousel-item" style={{marginRight: "0", width: "max-content"}}>
                <img
                  src={PID.additionalphotos?.[1]}
                  style={{maxWidth: "100%", maxHeight: "100%"}}
                  alt=""
                />
              </div>
              <div className="carousel-item" style={{marginRight: "0", width: "max-content"}}>
                <img
                  src={PID.additionalphotos?.[2]}
                  style={{maxWidth: "100%", maxHeight: "100%"}}
                  alt=""
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
        </div>
          </div>
          
        <hr />
        <div className={styles.container2}>
          <div>
            <h1>{PID.model}</h1>
            {/* {PID.additionalphotos?.length >= 1
              ? PID.additionalphotos.map((el) => (
                <div className={modo}>
                  <img src={el} width="150" alt="No encontrada" />
                  </div>
                ))
              : null} */}

            <h3>US${PID.price}</h3>
            <h3>Rating</h3>
            <div>
              <div>
                {promedio()}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  margin="4"
                  fill="currentColor"
                  className="bi bi-star-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>

              <br />
            </div>

            <form>
              {PID.stock > 0 ? (
                <div>
                  {auth.currentUser ? (
                    <Link to="#">
                      <button
                        type="submit"
                        className={styles.btn} style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px", fontWeight: "bold" }}
                        onClick={(e) =>
                          dispatch(addToCartUser(user.email, PID.id))
                        }
                      >
                        <p>Agregar al carrito</p>
                      </button>
                    </Link>
                  ) : (
                    <Link to="#">
                      <button
                        type="submit"
                        className={styles.btn}
                        onClick={(e) => dispatch(addToCart(PID.id))}
                      >
                        <FormattedMessage id="Agregar al carrito User">
                          {<p>{messages}</p>}
                        </FormattedMessage>
                      </button>
                    </Link>
                  )}

                  <br />
                  <FormattedMessage id="Disponibles">
                    {<p>{messages}</p>}
                  </FormattedMessage>
                  {PID.stock}
                </div>
              ) : (
                <p>AGOTADO!</p>
              )}
              {/* <button type="submit" className="btn btn-outline-dark"  onClick={e => dispatch(addToCart(PID.id))}>
              Agregar al Carrito
            </button> */}
            </form>
          </div>

          <div>
            <div>
              <FormattedMessage id="Especificaciones">
                {(messages) => <h3>{messages}</h3>}
              </FormattedMessage>

              <div>
                <ul>
                  <li>
                    <FormattedMessage id="Memoria RAM">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span> {PID.ram}</span>
                  </li>

                  <li>
                    <FormattedMessage id="Memoria ROM">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span> {PID.rom}</span>
                  </li>

                  <li>
                    <FormattedMessage id="Procesador">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span> {PID.processor}</span>
                  </li>

                  <li>
                    <FormattedMessage id="Conectividad">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span> {PID.network}</span>
                  </li>
                  <li>
                    <FormattedMessage id="Batería">
                      {<span>{messages}</span>}
                    </FormattedMessage>{" "}
                    <span>{PID.batery} mAh</span>
                  </li>
                  <li>
                    <FormattedMessage id="Camara frontal">
                      {<span>{messages}Mpx</span>}
                    </FormattedMessage>
                    {PID.frontal_cam}
                  </li>

                  <li>
                    <FormattedMessage id="Camara principal">
                      {<span>{messages}Mpx</span>}
                    </FormattedMessage>
                    <span>{PID.main_cam}</span>
                  </li>

                  <li>
                    <FormattedMessage id="Pantalla">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span>
                      {" "}
                      {PID.screen} - {PID.inches}
                    </span>
                  </li>

                  <li>
                    <FormattedMessage id="Resolucion">
                      {<span>{messages}</span>}
                    </FormattedMessage>
                    <span> {PID.resolution}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <hr></hr>

            <FormattedMessage id="Preguntas y Respuestas">
              {(messages) => <h3>{messages}</h3>}
            </FormattedMessage>
            {user ? (
              <div>
                <input
                  onChange={(e) => handlerChange(e)}
                  type="text"
                  className={styles.input}
                  placeholder={detailLang[lan].esc}
                />
                <button onClick={(e) => publicar(e)} className={styles.btn2} style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px", fontWeight: "bold" }}>
                  {detailLang[lan].Preguntar}
                </button>
              </div>
            ) : (
              <p></p>
            )}
            {allQuestions
              ? allQuestions.map((e) => {
                  console.log("id de producto", PID.id);
                  console.log("id de producto de la question", e.product_ID);
                  if (e.product_ID === PID.id) {
                    return (
                      <>
                        <div className={styles.question}>
                          <p>
                            {detailLang[lan].Usuario}: {e.user_email}
                          </p>
                          <p>- {e.question}</p>
                        </div>
                        <div className={styles.answer}>
                          <p>- {e.answer}</p>
                        </div>
                      </>
                    );
                  }
                })
              : console.log("id de producto", PID.id)}
          </div>
        </div>
      </div>

      <div className={styles.contact}>
        <FormattedMessage id="Comentarios">
          {(messages) => <h3>{messages}</h3>}
        </FormattedMessage>

        {PID.review ? (
          PID.review.map((e) => {
            return (
              <div>
                <p>{e.usuario}</p>
                <p>{e.comentario}</p>
              </div>
            );
          })
        ) : (
          <FormattedMessage id="Este articulo no tiene comentarios">
            {(messages) => <p>{messages}</p>}
          </FormattedMessage>
        )}
      </div>
      <Footer/>
    </IntlProvider>
    </div>
  );
}
