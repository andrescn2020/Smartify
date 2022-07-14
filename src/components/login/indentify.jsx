import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { idLang } from "./indetifyLang";
import { useSelector } from "react-redux";
import styles from "./Login.module.css"
import swal from "sweetalert";

export default function Identify() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const lan = useSelector((state) => state.language)

    const resetPassword = async (e) => {

        e.preventDefault();

        try {

            setError("");
            await sendPasswordResetEmail(auth, email);
            swal("Revisa tu casilla de correo electronico en el mail que proporcionaste");

        } catch (error) {

            console.log(error.message);
            swal("Fallo al recuperar tu contraseña, revise si introdujo bien su email")

        }

    }

    return (
        <div className={styles.fondo}>
        <div className=" row y justify-content-center">
        <div className="display-flex justify-content-center row border border-sky-500 col-4 center d-grid gap-2 row shadow py-2 px-4 rounded">
 
            <h2 className="col-auto row justify-content-center py-2 px-4 rounded">{idLang[lan].rec}</h2>
            <br /><br />
            <h4>{idLang[lan].ing}</h4>
            <br />
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:bg-white w-100" type="email" onChange={(e) => setEmail(e.target.value)} placeholder={idLang[lan].plc}></input>
            <button className=' justify-content-center col-auto btn btn-primary btn-sm' style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px", fontWeight: "bold" }} onClick={resetPassword} type="submit">{idLang[lan].env}</button>
            <br /><br />
            <Link className="row justify-content-center" to="/login"><button className=' justify-content-center col-auto btn btn-secondary btn-sm' style={{ backgroundColor: "#3A497E", border: "none", borderRadius: "10px", fontWeight: "bold", textDecoration: "none" }}  type="submit">{idLang[lan].atras}</button></Link>
            </div>
        </div>
        </div>

    )

}