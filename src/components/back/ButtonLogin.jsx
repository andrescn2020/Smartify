import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { backLang } from './backLang';
import styles from './BtnBack.module.css'

const BtnBack = () => {
  const lan = useSelector((state) => state.language);
  return (
    <>
        <Link to='/login' className={styles.link}>
            <button className={styles.btn}>
            {backLang[lan].login}
            </button>
        </Link>
    </>
  )
}

export default BtnBack