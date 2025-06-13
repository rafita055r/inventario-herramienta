
import React, { useState } from 'react';
import './styles/NavBar.css';
import { NavLink, useLocation } from 'react-router';

const routeTitles = {
    '/': 'Movimientos',
    '/obras': 'Obras',
    '/herramientas': 'Herramientas',
  };

export default  function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const state = location?.state    
  
    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
  
    // Obtiene el título de la ruta actual
    const pageTitle = routeTitles[location.pathname] ? routeTitles[location.pathname] : state?.page === "tool-detail" ? "Herramienta" : 'Página no encontrada';
    return (
        <>
            <header className="header">
                <button className="toggle-btn" onClick={toggleDrawer}>☰</button>
                <h1 className="page-title">{pageTitle}</h1>
            </header>
        
            <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleDrawer}>
                ✖
                </button>
                <nav className="drawer-nav">
                <ul>
                    <li><NavLink onClick={toggleDrawer} to="/obras">Obras</NavLink></li>
                    <li><NavLink onClick={toggleDrawer} to="/herramientas">Herramientas</NavLink></li>
                    <li><NavLink onClick={toggleDrawer} to="/">Movimientos</NavLink></li>
                </ul>
                </nav>
            </div>
        
          {/* Fondo oscuro opcional */}
          {isOpen && <div className="backdrop" onClick={toggleDrawer}></div>}
        </>
      );
}

