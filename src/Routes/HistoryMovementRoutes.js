import { useState } from "react";
import "./styles/HistoryMovements.css"

const historyMovements = [
    {toolMoved: 'moladora marca chica', from: 'galpon', to: 'YPF', date: '03/08/25', horary: '11:50'}
]
export default  function HistoryMovementRoutes(){
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        toolMoved: '',
        from: '',
        to: '',
        date: '',
        horary: ''
    });

    const toggleForm = () => setShowForm(!showForm);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        historyMovements.push({ ...formData });
        setFormData({ toolMoved: '', from: '', to: '', date: '', horary: '' });
        setShowForm(false);
    };

    return(
        <section className="sectionListMovement">
            <button className="btn-add" onClick={toggleForm}>
                {showForm ? "Cancelar" : "Agregar Movimiento"}
            </button>

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
                <span className="span-from">desde</span>
                <span className="span-to">hasta</span>
                <span className="span-date">fecha</span>
            </div>
            <ul>
                {
                    historyMovements.map((movement, key)=>(
                        <li>
                            <p className="p-tools">{movement.toolMoved}</p>
                            <p className="p-from">{movement.from}</p>
                            <p className="p-to">{movement.to}</p>
                            <p className="p-date">{movement.date}<br/>
                            {movement.horary}
                            </p>
                        </li>
                    ))
                }
                
            </ul>
        </section>
    )
}