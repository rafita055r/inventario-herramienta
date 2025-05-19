import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import HistoryMovementRoutes from './Routes/HistoryMovementRoutes';
import WorksRoute from './Routes/WorksRoute';
import ToolsRoute from './Routes/ToolsRoute';
import useStore from './services/useStore';
import { useEffect } from 'react';

function App() {
  const {herramientas, obras, history, cargarDatosDesdeAPI} = useStore()

  useEffect(()=>{
    cargarDatosDesdeAPI()
  },[cargarDatosDesdeAPI])

  return (
    <BrowserRouter>
        <NavBar />
      <Routes>
        <Route path='/' element={<HistoryMovementRoutes history={history} />} />
        <Route path='/obras' element={<WorksRoute worksList={obras} />} />
        <Route path='/herramientas' element={<ToolsRoute toolsList={herramientas} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
