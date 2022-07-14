import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./../home/Home.module.css";
import { aboutLang } from "./aboutLang";



    const About = () => {
        const modo = useSelector(state => state.modo)
        const lan = useSelector((state) => state.language)
        return(
            <div className={style.fondo}>
            <div className=" row y justify-content-center">
              <Link to="/">
                <button className={style.btn}>◀ {aboutLang[lan].volver}</button>
              </Link>
              <div className=" border border-sky-500 col-4 center d-grid gap-5">
                <h1 className=" row justify-content-center shadow py-2 px-4 rounded">{aboutLang[lan].conocenos}</h1>
                <h5 className="row justify-content-center col-auto">📲{aboutLang[lan].int}</h5>
                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4D03AQHWvYcqrDzmjA/profile-displayphoto-shrink_800_800/0/1657498691737?e=1663200000&v=beta&t=QvMfhp4MfswtRaeQPZXwrWUwCnlgLLxgKrWbu9vcEho" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Maximiliano Blanc</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/maxi-blanc-8a0049245/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/MaxiBlanc">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>
                <div>

                <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4D03AQFI-F-DDxxnpQ/profile-displayphoto-shrink_800_800/0/1654463778042?e=1663200000&v=beta&t=g8_XhC0PXNLi1qQr7G19nmkPGqNI1sEsLIPyobFiJDA" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Matias Britez</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/matias-britezdev/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/mattbritez7">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>

                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4E03AQFxNR6PAkQ4zA/profile-displayphoto-shrink_800_800/0/1651862727797?e=1663200000&v=beta&t=_A8mUiMG_rFZVbEcykl1OS4UbEqsnz-9VrHOKbNw8v0" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Andres Capano</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/andres-capano-009ba7239/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/andrescn2020">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>

                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C4E03AQG2HjhKBTdW6Q/profile-displayphoto-shrink_800_800/0/1652458528644?e=1663200000&v=beta&t=vviEf7VcU228CSCJuaGlET33gHFonoJTtErRG0GRRUE" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Facundo Leveratto</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/facundo-leveratto-bb30041b4/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/faculeveratto">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>

                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C5603AQEhfe9y6PR3hQ/profile-displayphoto-shrink_800_800/0/1569435588586?e=1663200000&v=beta&t=Q6EjKyBwlYVr5tXB9yHEKDC3WFsHlEO8_h8qqte0GyE" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Manuel Ricardes</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/manuel-ricardes-02a5b898/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/Melkor11">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>

                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://avatars.githubusercontent.com/u/96071220?v=4" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Santiago Serena</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/santiago-serena-17599a193/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/santiserena">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>

                <div className="">
                    <div className="col-auto row justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="row justify-content-center col-auto w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className={modo}>
                        <img className="img-circle rounded-circle" src="https://media-exp1.licdn.com/dms/image/C5603AQG3YbZnYhSd6Q/profile-displayphoto-shrink_800_800/0/1645720253825?e=1663200000&v=beta&t=C3oGCq-5b_s1qFe-ZSRRnQ0claM8eKntDbDQAOMS-38" alt="" height="250"/>
                    </div>
                    </div>
                    <h2 className="row justify-content-center col-auto">Franco Tejada</h2>
                    </div>
                    <div>
                    <a href="https://www.linkedin.com/in/francotejada3ba649223/">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
                    </div>
                    </a>
                    <a href="https://github.com/FrancoTejada1">
                    <div className={modo}>
                    <img className="mx-auto d-block" src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
                    </div>
                    </a>
                </div>
                </div>
              </div>
            </div>
            </div>

            
        
        
)}

// //            <div className="col-3 row y justify-content-center">
// <img src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" height="250"/>
// <div className="">
//     <h2>Maximiliano Blanc</h2>
// </div>
// <div className="">
// <img src="https://pbs.twimg.com/profile_images/1414990564408262661/r6YemvF9_400x400.jpg" alt="" width="50" height="50"/>
// <img src="https://www.m3s-surveys.com/wp-content/uploads/2020/02/linkedin-512.png" alt="" width="50" height="50"/>
// </div>
// </div>
export default About;