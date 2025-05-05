import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Router, Routes} from "react-router"
import reportWebVitals from './reportWebVitals';
import NavBar from './Routes/NavBar';
import HistoryMovement from './Routes/HistoryMovement';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <NavBar />
    <Routes>
      <Route path='/' element={<HistoryMovement />} />
    </Routes>
  </BrowserRouter>
);

// reportWebVitals();
