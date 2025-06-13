import './styles/Tools.css'
import { useState } from 'react';
import FormAddTool from '../Components/FormAddTool';
import LoaderMain from "../Components/LoaderMain";
import { useNavigate } from 'react-router';

export default function ToolsRoute({toolsList}){
    const navigate = useNavigate()
    const [showForm, setShowForm] = useState(false);

    const toolDetailRedirectPage = (tool)=>{
        navigate(`/herramientas/${tool.id}`, {state: {tool, page: "tool-detail"}})
    }

    const handleShowForm = (is_Show)=>{
        setShowForm(is_Show);
    }

    return(
        <main className='main-tool'>

            {showForm && (
                <FormAddTool showForm={handleShowForm}/>
            )}

            <button className="add-tool-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Agregar herramienta'}
            </button>
            <section className="sectionTools">
                <div className="tools-subtitleInfo">
                    <span className="span-quantity">#</span>
                    <span className="span-state">Estado</span>
                    <span className="span-nameTools">Nombre</span>
                    <span className="span-brand">Marca</span>
                    <span className="span-measure">Medidas</span>
                    <span className="span-observation">Observación</span>
                </div>
                <ul className='ul_tools'>
                    {
                        toolsList.length > 0 ? toolsList.map((tool)=> (
                            <li key={tool.id} onClick={()=>toolDetailRedirectPage(tool)}>
                                <p className="p-quantity">{tool.cantidad_total}</p>
                                <p className="p-state">{tool.estado}</p>
                                <p className="p-nameTools">{tool.nombre}</p>
                                <p className="p-brand">{tool.marca}</p>
                                <p className="p-measure">{tool.medidas}</p>
                                <p className="p-observation">{tool.observacion}</p>
                            </li>
                        )) : <LoaderMain/>
                    }
                </ul>
            </section>
        </main>
    )
}