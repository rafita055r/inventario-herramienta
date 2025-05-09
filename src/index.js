import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import {BrowserRouter, Route, Routes} from "react-router"
import NavBar from './Components/NavBar';
import HistoryMovementRoutes from './Routes/HistoryMovementRoutes';
import ToolsRoute from './Routes/ToolsRoute';
import WorksRoute from './Routes/WorksRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <NavBar />
    <Routes>
      <Route path='/' element={<HistoryMovementRoutes />} />
      <Route path='/obras' element={<WorksRoute />} />
      <Route path='/herramientas' element={<ToolsRoute />} />
    </Routes>
  </BrowserRouter>
);

// reportWebVitals();
