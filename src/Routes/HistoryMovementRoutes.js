import "./styles/HistoryMovements.css"
import { useEffect, useState } from "react";
import useStore from "../services/useStore";
import LoaderMain from "../Components/LoaderMain";

export default  function HistoryMovementRoutes(){
    const {history, cargarDatosDesdeAPI} = useStore();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        toolMoved: '',
        from: '',
        to: '',
        date: '',
        horary: ''
    });
    
    // const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ toolMoved: '', from: '', to: '', date: '', horary: '' });
        setShowForm(false);
    };

    useEffect(()=>{
        cargarDatosDesdeAPI();
    }, [cargarDatosDesdeAPI]);

    return(
        <section className="sectionListMovement">
            {/* <button className="btn-add" onClick={toggleForm}>
                {showForm ? "Cancelar" : "Agregar Movimiento"}
            </button> */}

            {showForm && (
                <form className="form-movement" onSubmit={handleSubmit}>
                    <input name="toolMoved" placeholder="herramienta" value={formData.toolMoved} onChange={handleChange} required />
                    <input name="from" placeholder="desde" value={formData.from} onChange={handleChange} required />
                    <input name="to" placeholder="hasta" value={formData.to} onChange={handleChange} required />
                    <input name="date" placeholder="fecha (dd/mm/aa)" value={formData.date} onChange={handleChange} required />
                    <input name="horary" placeholder="hora (hh:mm)" value={formData.horary} onChange={handleChange} required />
                    <button type="submit">Guardar</button>
                </form>
            )}
            
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