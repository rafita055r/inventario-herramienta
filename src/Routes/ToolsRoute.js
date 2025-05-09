import { useState } from 'react';
import './styles/Tools.css'

const initialTools = [
    { name: 'moladora chica', brand: 'Makita', ubication: 'Ypf Norte', quantity: 2 },
    { name: 'Taladro', brand: 'Dewall', ubication: 'Ypf Norte', quantity: 2 },
    { name: 'Pala hancha', brand: 'Genericas', ubication: 'Ypf Norte', quantity: 2 },
    { name: 'Balde', brand: 'Generico', ubication: 'Ypf Norte', quantity: 2 }
];

export default function ToolsRoute(){
    const [tools, setTools] = useState(initialTools);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        ubication: '',
        quantity: undefined
    });

    const handleAddTool = (e) => {
        e.preventDefault();
        setTools([...tools, formData]);
        setFormData({ name: '', brand: '', ubication: '', quantity: 1 });
        setShowForm(false);
    };
    return(
        <section className="sectionTools">
             <button className="add-tool-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Agregar herramienta'}
            </button>

            {showForm && (
                <form className="tool-form" onSubmit={handleAddTool}>
                    

                    <input type="text" className="input-name" placeholder="Nombre" value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

                    <input type="text" className="input-brand" placeholder="Marca" value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required />

                    <input type="text" className="input-ubic" placeholder="Ubicación" value={formData.ubication}
                        onChange={(e) => setFormData({ ...formData, ubication: e.target.value })} required />
                    
                    <input type="number" min="1" className="input-quantity" placeholder="#" value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })} required />

                    <button type="submit" className="submit-btn">Guardar</button>
                </form>
            )}

            <div className="tools-subtitleInfo">
                <span className="span-quantity">#</span>
                <span className="span-nameTools">Nombre</span>
                <span className="span-brand">Marca</span>
                <span className="span-ubic">Ubicación</span>
            </div>
            <ul>
                {
                    tools.map((tool, key)=> (
                        <li key={key}>
                            <p className="p-quantity">{tool.quantity}</p>
                            <p className="p-nameTools">{tool.name}</p>
                            <p className="p-brand">{tool.brand}</p>
                            <p className="p-ubic">{tool.ubication}</p>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
}