import "./styles/HistoryMovements.css"
import { useEffect } from "react";
import useStore from "../services/useStore";
import LoaderMain from "../Components/LoaderMain";

export default  function HistoryMovementRoutes(){
    const {history, cargarDatosDesdeAPI} = useStore();

    useEffect(()=>{
        cargarDatosDesdeAPI();
    }, [cargarDatosDesdeAPI]);

    return(
        <section className="sectionListMovement">
            
            <div className="movement-subtitleInfo">
                <span className="span-tools">herramienta</span>
                <span className="span-cantidad">#</span>
                <span className="span-from">desde</span>
                <span className="span-to">hasta</span>
                <span className="span-date">fecha</span>
            </div>
            <ul>
                {
                    history.length > 0 ? history.reverse().map((registro)=>(
                        <li key={registro.id_register}>
                            <p className="p-tools">{registro.tool.nombre}</p>
                            <p className="p-cantidad">{registro.cantidad}</p>
                            <p className="p-from">{registro.previusWork?.nombre}</p>
                            <p className="p-to">{registro.currentrWork.nombre}</p>
                            <p className="p-date">{registro.fecha}<br/>
                            {registro.hora}
                            </p>
                        </li>
                    )) : <LoaderMain />
                }
                
            </ul>
        </section>
    )
}