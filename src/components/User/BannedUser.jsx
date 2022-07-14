import React from 'react'
import { Link } from 'react-router-dom';
import style from "./../Admin/Admin.module.css"
import { banLang } from "./styles/bannedUserLang";
import { useSelector } from "react-redux";

const BannedUser = () => {
  const lan = useSelector((state) => state.language)
  return (
    <div d-flex justify-content-center align-items-center>
      <Link to="/">
        <button style={{ marginBottom: "2em" }} className={style.btn}>
          Volver
        </button>
      </Link>
      <div className="container-fluid border rounded w-75  'd-flex justify-content-center align-items-center' ">
        <h6 className="p-4  d-flex justify-content-center align-items-center">
        {banLang[lan].ban}
        </h6>
      </div>
    </div>
  );
}

export default BannedUser