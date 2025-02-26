import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
        {/* <ToastContainer /> */}
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
);
