import { Link } from "react-router-dom";
import github from "../../images/GitHub.png";
import styles from "./Footer.module.css";
import { footerLang } from "./footerLang";
import { useSelector } from "react-redux";


export default function Footer(){
  const lan = useSelector((state) => state.language)
    return(
        <div className={styles.contorno} >
        <footer className="d-flex align-items-center justify-content-center ">
           <div className=" row mt-5 col-12 ">
            <div className=" row align-items-center justify-content-center">
<div className="col-5 align-items-center justify-content-center" style={{width: "auto", marginInlineStart: "auto"}}>
      <Link to='/about' className=" align-items-center justify-content-center text-decoration-none">
      <a className="text-decoration-none align-items-center justify-content-center"><h4  style={{fontWeight: "bold", color: "whitesmoke"}} className={styles.facu}>{footerLang[lan].nosotros} </h4></a>
      </Link>
    </div>
      <div className="align-items-center justify-content-center col-2" style={{marginInline: "auto", width: "auto"}}>
      <a href="https://github.com/FinalProyectHenry25a/FinalProyect25a">
      <img className="mx-auto d-block" src={github} alt="" width="50" height="50"/>
      </a>
      </div>
<div className="col-5 row justify-content-center align-items-center" style={{marginInlineEnd: "auto", width: "auto"}}>

            <Link to="/contacto" className="col-6 row justify-content-center align-items-center text-decoration-none">
      <a className="align-items-center justify-content-center text-decoration-none" >
        <h4 className={styles.facu}  style={{fontWeight: "bold", color: "whitesmoke"}}>
        {footerLang[lan].contacto}
              {/* {navBarLang[lan].contacto} */}
            </h4>
          </a>
            </Link>
          

          </div>
          </div>
<hr className="mt-5"/>
      <div className="row align-items-center justify-content-center">
      {footerLang[lan].henry}
      </div>
<div className="row align-items-center justify-content-center">
{footerLang[lan].derecho}
      </div>
      </div>
{/*         
  

      {/* <!-- Google --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #dd4b39;"
        href="#!"
        role="button"
        ><i className="fab fa-google"></i
      ></a>

      {/* <!-- Instagram --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #ac2bac;"
        href="#!"
        role="button"
        ><i className="fab fa-instagram"></i
      ></a>

      {/* <!-- Linkedin --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #0082ca;"
        href="#!"
        role="button"
        ><i className="fab fa-linkedin-in"></i
      ></a>
      {/* <!-- Github --> 
      <a
        className="btn btn-primary btn-floating m-1"
        // style="background-color: #333333;"
        href="#!"
        role="button"
        ><i className="fab fa-github"></i
      ></a>
    </section>
    {/* <!-- Section: Social media --> 
  </div>
  {/* <!-- Grid container --> 

  {/* <!-- Copyright --> 
  <div className="text-center p-3"> {/*style="background-color: rgba(0, 0, 0, 0.2)
    © 2020 Copyright:
    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  <!-- Copyright --> */}

</footer>
</div>
    )
}