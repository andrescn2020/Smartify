import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from './Store/index';
//const App = React.lazy(() => import('./App'));
//import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
       
          <App />
        
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// reportWebVitals();
