import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  banUser,
  getAllUsers,
  getUser,
  unbanUser,
  usersAdmin,
} from "../../Actions";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BtnBack from "../back/BtnBack";
import { Button, Grid } from "@mui/material";
import style from "./Admin.module.css"
import swal from "sweetalert";

export default function Users() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { email } = useParams();

  const users = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function deleteUsers(email) {
    try {
      await axios.delete(`https://back2demo2-production.up.railway.app/admin/users/${email}`);
      swal("Usuario eliminado");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  function Row(props) {

    const { row } = props;

    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              width="1%"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" align="center" width="12%">
            {row.email}
          </TableCell>
          <TableCell align="center" width="12%">
            {row.username}
          </TableCell>
          <TableCell align="center" width="12%">
            {row.firstname}
          </TableCell>
          <TableCell align="center" width="12%">
            {row.lastname}
          </TableCell>
          <TableCell align="center" width="12%">
            {row.address}
          </TableCell>
          <TableCell align="center" width="12%">
            {/* <Button variant="contained" color="secondary" onClick={() => deleteUsers(row.email)}>Eliminar</Button> */}
            <button
              className={style.btn}
              onClick={() => deleteUsers(row.email)}
            >
              Eliminar
            </button>
          </TableCell>
          <TableCell align="center" width="12%">
            {row.banned ? (
              <button
                className={style.btn}
                onClick={() => dispatch(unbanUser(row.email))}
              >
                Desbanear
              </button>
            ) : (
              <button
                className={style.btn}
                onClick={() => dispatch(banUser(row.email))}
              >
                Banear
              </button>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Historial
                </Typography>
                <Table size="large" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width="12%">
                        Marca
                      </TableCell>
                      <TableCell align="center" width="12%">
                        Modelo
                      </TableCell>
                      <TableCell align="center" width="12%">
                        Color{" "}
                      </TableCell>
                      <TableCell align="center" width="12%">
                        Monto
                      </TableCell>
                      <TableCell align="center" width="12%">
                        Cantidad
                      </TableCell>
                      <TableCell align="center" width="12%">
                        Precio Total (US$)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row?.shopping?.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell align="center">{historyRow.brand}</TableCell>
                        <TableCell
                          align="center"
                          width="12%"
                        >{`${historyRow.model}`}</TableCell>
                        <TableCell align="center" width="12%">
                          {historyRow.color}
                        </TableCell>
                        <TableCell align="center" width="12%">
                          US${historyRow.price}
                        </TableCell>
                        <TableCell align="center" width="12%">
                          {historyRow.qty}
                        </TableCell>
                        <TableCell align="center" width="12%">
                          US$
                          {Math.round(
                            (historyRow.price * historyRow.qty * 100) / 100
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (

    <TableContainer component={Paper}>

      <BtnBack className={style.btn}>Volver</BtnBack>
        <div className="d-flex justify-content-center">
        <h1 style={{'background':'#4B657C'}} className="col-6 row justify-content-center shadow py-2 px-4 rounded text-white">
            Usuarios
        </h1>
          </div> 
    

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="1%" />
            <TableCell align="center" width="12%">
              Correo electrónico
            </TableCell>
            <TableCell align="center" width="12%">
              Nombre de usuario
            </TableCell>
            <TableCell align="center" width="12%">
              Nombre
            </TableCell>
            <TableCell align="center" width="12%">
              Apellido
            </TableCell>
            <TableCell align="center" width="12%">
              Dirección
            </TableCell>
            <TableCell align="center" width="12%">
              {" "}
            </TableCell>
            <TableCell align="center" width="12%">
              {" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Row key={row.email} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  {/* <div className=" d-flex justify-content-center align-items-center mt-3 mb-2">
  / <button className="btn btn-danger me-2" onClick={() => deleteUsers(row.email)}>Eliminar</button>
  {row.banned ? <button className="btn btn-secondary" onClick={() => dispatch(unbanUser(row.email))}>Desbanear</button> : <button  className="btn btn-danger" onClick={() => dispatch(banUser(row.email))}>Banear</button>}
</div> */}
}
{
  /* <Link to="/">
  <button className={style.btn}>Volver</button>
          </Link>
          <h1 className="d-flex justify-content-center align-items-center">Usuarios</h1>
          
          <br />
          <br />
          
          {users?.map((el) => {
            return (
              <div className=" d-flex justify-content-center align-items-center mt-4">
            <div className=" border rounded w-75" key={el.email}>
              <h6 className="mt-2  d-flex justify-content-center align-items-center" >
                {el.email} - {el.username} 
              </h6>
              <div className=" d-flex justify-content-center align-items-center mt-3 mb-2">
              <button className="btn btn-danger me-2" onClick={() => deleteUsers(el.email)}>Eliminar</button>
              {el.banned ? <button className="btn btn-secondary" onClick={() => dispatch(unbanUser(el.email))}>Desbanear</button> : <button  className="btn btn-danger" onClick={() => dispatch(banUser(el.email))}>Banear</button>}
            </div>
            </div>
            </div>
            )
            })} */
}
