import {  createStore, applyMiddleware} from 'redux' // apllyMiddleware permite usar los middleware, por ej thunk
import { composeWithDevTools } from "redux-devtools-extension" //
import thunk from "redux-thunk" // permite invocar creadores de acciones que devuelve una funcion en vez de un objeto de accion
import rootReducer from "../Reducers/index";  // 

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))) 
