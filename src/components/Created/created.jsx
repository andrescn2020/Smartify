import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, postPhone, setSelects } from "../../Actions/index";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Swal from 'sweetalert2';
import style from "./../home/Home.module.css";
import swal from "sweetalert";

export default function PhoneCreate() {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [fotoP, setFotoP] = useState("");
  const [fotosSec, setFotosSec] = useState([]);
  const history = useHistory();

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin) {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const [input, setInput] = useState({
    brand: "",
    model: "",
    releaseDate: "",
    rating: "",
    price: "",
    images: "",
    color: "",
    processor: "",
    ram: "",
    rom: "",
    network: "",
    batery: "",
    frontal_cam: "",
    main_cam: "",
    inches: "",
    screen: "",
    resolution: "",
    stock: "",
  });

  function validation(input) {
    let error = {};
    if (input.brand.length < 1) error.brand = "Selecciona la marca del celular";
    if (!input.model) error.model = "Ingresa el modelo de celular";
    if (!input.releaseDate)
      error.releaseDate = "Selecciona la fecha de lanzamiento del celular";
    if (input.rating < 1 || input.rating > 5)
      error.rating = "Asigna un rating valido (de 1 a 5) para el celular";
    if (input.price <= 0)
      error.price = "El precio del celular debe ser mayor que $0";
    if (!input.images) error.images = "Ingresa al menos una imagen del celular";
    if (!input.color) error.color = "Ingresa el color del celular";
    if (!input.processor) error.processor = "Ingresa el procesador de celular";
    if (input.ram.length < 1)
      error.ram = "Selecciona la memoria ram del celular";
    if (input.rom.length < 1)
      error.rom = "Selecciona la memoria rom del celular";
    if (input.network.length < 1)
      error.network = "Selecciona la conectividad del celular";
    if (!input.batery || input.batery <= 0) error.batery = "Ingresa la bateria del celular (solo numeros positivos)";
    if (!input.frontal_cam || input.frontal_cam <= 0)
      error.frontal_cam = "Ingresa los mpx de la camara frontal del celular (solo numeros positivos)";
    if (!input.main_cam || input.main_cam <= 0)
      error.main_cam = "Ingresa los mpx de la camara trasera del celular (solo numeros positivos)";
    if (!input.inches || input.inches <= 0) error.inches = "Ingresa las pulgadas del celular (solo numeros positivos)";
    if (!input.screen)
      error.screen = "Ingresa el modelo de pantalla del celular";
    if (input.stock <= 0)
      error.stock = "El stock del celular debe ser mayor a 0 productos";
    if (!input.resolution)
      error.resolution = "Ingresa la resolucion del celular";
    if (!input.resolution.includes(" X ") && !input.resolution.includes(" x "))
      error.resolution =
        "Ingresa la resolucion del celular de la manera indicada (ancho X alto)";
    return error;
  }

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    //console.log(error)
  }

  function handleBrand(e) {
    setInput({
      ...input,
      brand: e.target.value,
    });
    setError(
      validation({
        ...input,
        brand: [...input.brand, e.target.value],
      })
    );
  }

  function handleRAM(e) {
    setInput({
      ...input,
      ram: e.target.value,
    });
    setError(
      validation({
        ...input,
        ram: [...input.ram, e.target.value],
      })
    );
  }
  function handleROM(e) {
    setInput({
      ...input,
      rom: e.target.value,
    });
    setError(
      validation({
        ...input,
        rom: [...input.rom, e.target.value],
      })
    );
  }
  function handleNetwork(e) {
    setInput({
      ...input,
      network: e.target.value,
    });
    setError(
      validation({
        ...input,
        network: [...input.network, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      error.model ||
      error.releaseDate ||
      error.rating ||
      error.price ||
      error.images ||
      error.color ||
      error.processor ||
      error.ram ||
      error.rom ||
      error.network ||
      error.batery ||
      error.frontal_cam ||
      error.main_cam ||
      error.inches ||
      error.screen ||
      error.stock ||
      error.resolution
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "No pudo crearse la publicación, revisa bien los campos",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      //console.log(input);

      dispatch(postPhone(input));
      dispatch(setSelects());
      swal("La publicacion se creo exitosamente");

      setInput({
        brand: "",
        model: "",
        releaseDate: "",
        rating: "",
        price: "",
        images: "",
        color: "",
        processor: "",
        ram: "",
        rom: "",
        network: "",
        batery: "",
        frontal_cam: "",
        main_cam: "",
        inches: "",
        screen: "",
        resolution: "",
        stock: "",
      });

      window.location.reload();
    }
  }

  const base64Convert = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;
      setFotoP(base64);
      setInput({ ...input, images: base64 });
    };
  };

  const base64Multiple = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      let aux = fotosSec;
      aux.push(base64);

      setInput({ ...input, additionalphotos: aux });
    };
  };

  const takeOut = (index) => {
    let aux2 = fotosSec.filter((elem, ind) => ind !== index);

    setFotosSec(aux2);
    setInput({ ...input, additionalphotos: aux2 });
  };

  return (
    <div className={style.fondo}>
      <div className=" row y justify-content-center">
        <Link to="/">
          <button className={style.btn}>Volver</button>
        </Link>
        <div className=" border border-sky-500 col-4 center">
          <h1 style={{'background':'#4B657C'}} className=" row justify-content-center shadow py-2 px-4 rounded text-white">
            Crea una Publicación
          </h1>
          <form
            className="col-auto row justify-content-center w-full max-w-lg"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
              {" "}
              <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <h5 className="row justify-content-center col-auto">Brand</h5>
                <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    <input
                      type="text"
                      onChange={(e) => handleBrand(e)}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                    />
                  </label>
                  {error.brand && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.brand}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="row justify-content-center col-auto">Modelo</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                    type="text"
                    value={input.model}
                    name="model"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.model && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.model}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="row justify-content-center col-auto">
                {" "}
                Precio en US$
              </h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  <input
                    className="row justify-content-center col-auto appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={(e) => handleOnChange(e)}
                  />
                </label>
                {error.price && (
                  <p className="text-danger col-auto row y justify-content-center">
                    {error.price}
                  </p>
                )}
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="row justify-content-center col-auto"> Stock</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  <input
                    className="row justify-content-center col-auto appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                    type="number"
                    value={input.stock}
                    name="stock"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.stock && (
                    <p className=" text-danger col-auto row y justify-content-center">
                      {error.stock}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className=" block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5 className="col-auto row justify-content-center">
                  Imagen principal
                </h5>
                <input
                  className="form-control form-control-sm"
                  type="file"
                  onChange={(ev) => base64Convert(ev)}
                />
                <br />
                {fotoP !== "" ? (
                  <img
                    src={fotoP}
                    width="50"
                    height="60"
                    alt="no se pudo cargar la imagen"
                  />
                ) : null}
                {error.images && (
                  <p className="text-danger col-auto row y justify-content-center">
                    {error.images}
                  </p>
                )}
              </label>
              <label className=" block tracking-wide text-gray-700 text-xs font-bold mb-2">
                <h5 className="col-auto row justify-content-center">
                  Imagenes secundarias (máximo 3)
                </h5>
                {fotosSec?.length <= 2 ? (
                  <input
                    className="form-control form-control-sm"
                    type="file"
                    onChange={(ev) => base64Multiple(ev)}
                  />
                ) : null}

                {fotosSec?.length >= 1 ? (
                  <div>
                    {" "}
                    {fotosSec.map((el, index) => (
                      <div key={index}>
                        <img
                          src={el}
                          width="50"
                          height="60"
                          alt="no se pudo cargar la imagen"
                        />
                        <button onClick={() => takeOut(index)}>X</button>
                      </div>
                    ))}{" "}
                  </div>
                ) : null}
              </label>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">RAM</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  <input
                    type="text"
                    onChange={(e) => handleRAM(e)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                  />
                  {/* <select
                  defaultValue="select RAM"
                  className="w-75 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleRAM(e)}
                >
                  <option disabled> select RAM </option>
                  <option value="4Gb">4Gb</option>
                  <option value="6Gb">6Gb</option>
                  <option value="8Gb">8Gb</option>
                  <option value="12Gb">12Gb</option>
                </select> */}
                  {error.ram && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.ram}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">ROM</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    type="text"
                    onChange={(e) => handleROM(e)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white w-75"
                  />
                  {/* <select
                  defaultValue="select ROM"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleROM(e)}
                >
                  <option disabled> select ROM </option>
                  <option value="32Gb">32Gb</option>
                  <option value="64Gb">64Gb</option>
                  <option value="128Gb">128Gb</option>
                  <option value="256Gb">256Gb</option>
                </select> */}
                  {error.rom && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.rom}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">Color</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={input.color}
                    name="color"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.color && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.color}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">Rating</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    value={input.rating}
                    name="rating"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.rating && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.rating}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">Inches</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    value={input.inches}
                    name="inches"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.inches && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.inches}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <h5 className="col-auto row justify-content-center">
                    Processor
                  </h5>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={input.processor}
                    name="processor"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.processor && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.processor}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <h5 className="col-auto row justify-content-center">
                    Resolution
                  </h5>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="ancho X alto"
                    value={input.resolution}
                    name="resolution"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.resolution && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.resolution}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">Network</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    type="text"
                    onChange={(e) => handleNetwork(e)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  />
                  {/* <select
                  defaultValue="select Network"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleNetwork(e)}
                >
                  <option disabled> select Network </option>
                  <option value="3G">3G</option>
                  <option value="4G">4G</option>
                  <option value="5G">5G</option>
                </select> */}
                  {error.network && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.network}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <h5 className="col-auto row justify-content-center">
                    Batery
                  </h5>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    value={input.batery}
                    name="batery"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.batery && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.batery}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">
                Frontal Camera
              </h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    value={input.frontal_cam}
                    name="frontal_cam"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.frontal_cam && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.frontal_cam}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">
                Main Camera
              </h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="number"
                    value={input.main_cam}
                    name="main_cam"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.main_cam && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.main_cam}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">Screen</h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    value={input.screen}
                    name="screen"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.screen && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.screen}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <h5 className="col-auto row justify-content-center">
                Release Date
              </h5>
              <div className=" w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="row justify-content-center col-auto block tracking-wide text-gray-700 text-xs font-bold mb-2">
                  {" "}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-5 mb-3 leading-tight focus:outline-none focus:bg-white"
                    type="date"
                    value={input.releaseDate}
                    name="releaseDate"
                    onChange={(e) => handleOnChange(e)}
                  />
                  {error.releaseDate && (
                    <p className="text-danger col-auto row y justify-content-center">
                      {error.releaseDate}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <button
              className="row justify-content-center shadow py-2 px-4 rounded w-50 mt-5 mb-5 btn btn-primary "
              type="submit"
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}