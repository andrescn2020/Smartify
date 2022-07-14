import React, { useState } from "react";
import { getPhonesByModel, pageOne } from "../../Actions";
import style from "./../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchBarLang } from "./searchBarLang";
import {BsSearch} from "react-icons/bs"

const SearchBar = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [model, setModel] = useState("");
  const lan = useSelector((state) => state.language);
  const page = useSelector((state) => state.currentPage);

  function handleSearch(e) {
    setModel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/");
    dispatch(getPhonesByModel(model));
    dispatch(pageOne());
  }
  return (
    <div className="input-group" style={{width: "40%", marginInline: "auto"}}>
  <div className="form-outline" style={{width: "90%"}}>
    <input placeholder={searchBarLang[lan].input} id="search-input" type="search" className="form-control" style={{height: "100%"}} onChange={handleSearch}/>
  </div>
  <button id="search-button" type="button" style={{borderRadius: "10px", width: "8%", marginInlineStart: "8px", backgroundColor: "#3A497E ", color: "white" }} className="btn" onClick={handleSubmit}>
    <BsSearch/>
  </button>
</div>
  );
};
export default SearchBar;
