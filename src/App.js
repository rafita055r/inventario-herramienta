import './App.css';
import { HashRouter, Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import HistoryMovementRoutes from './Routes/HistoryMovementRoutes';
import WorksRoute from './Routes/WorksRoute';
import ToolsRoute from './Routes/ToolsRoute';
import useStore from './services/useStore';
import { useEffect } from 'react';
import ToolDetail from './Routes/ToolDetail';

function App() {
  const {herramientas, obras, history, cargarDatosDesdeAPI} = useStore()

  useEffect(()=>{
    cargarDatosDesdeAPI()
  },[cargarDatosDesdeAPI])

  return (
    <HashRouter>
      <NavBar>
        <Routes>
          <Route path='/' element={<HistoryMovementRoutes history={history} />} />
          <Route path='/obras' element={<WorksRoute worksList={obras} />} />
          <Route path='/herramientas' element={<ToolsRoute toolsList={herramientas} />} />
          <Route path='/herramientas/:id' element={<ToolDetail />} />
        </Routes>
      </NavBar>
    </HashRouter>
  );
}

export default App;
