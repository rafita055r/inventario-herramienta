import './styles/Tools.css'
import { useState, useEffect } from 'react';
import FormAddTool from '../Components/FormAddTool';
import LoaderMain from "../Components/LoaderMain";
import { useNavigate } from 'react-router';
import useStore from '../services/useStore';

export default function ToolsRoute({toolsList}){
    const navigate = useNavigate()
    const {getToolByName} = useStore()
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notFoundTool, setNotFoundTool] = useState(false);
    const [resultSearch, setResultSearch] = useState([])
    const [dataSearching, setDataSearching] = useState("")

    const toolDetailRedirectPage = (tool)=>{
        navigate(`/herramientas/${tool.id}`, {state: {tool, page: "tool-detail"}})
    }

    const handleShowForm = (is_Show)=>{
        setShowForm(is_Show);
    }

    const handleSearching = (e)=>{
        const {value} = e.target
        setDataSearching(value)
    }

    const onClickSearch = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const searchedResult = await getToolByName(dataSearching)
        
        if(!searchedResult.length) {
            setResultSearch([])
            setNotFoundTool(true)
            return setLoading(false)
        }

        setResultSearch(searchedResult)
        return setLoading(false)
    }

    useEffect(()=>{
        if(dataSearching.trim() === "") setNotFoundTool(false)
    },[])
    return(
        <main className='main-tool'>

            {showForm && (
                <FormAddTool showForm={handleShowForm}/>
            )}

            <button className="add-tool-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancelar' : 'Agregar herramienta'}
            </button>

            <div>
                <input type="text" placeholder="Buscar herramientas" defaultValue={dataSearching} onChange={handleSearching} />
                <button onClick={onClickSearch} >🔎</button>
            </div>

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
                        loading ? <LoaderMain/> :
                        resultSearch.length && dataSearching.trim() !== '' ? resultSearch.map((tool)=> (
                            <li key={tool.id} onClick={()=>toolDetailRedirectPage(tool)}>
                                <p className="p-quantity">{tool.cantidad_total}</p>
                                <p className="p-state">{tool.estado}</p>
                                <p className="p-nameTools">{tool.nombre}</p>
                                <p className="p-brand">{tool.marca}</p>
                                <p className="p-measure">{tool.medidas}</p>
                                <p className="p-observation">{tool.observacion}</p>
                            </li>)) : !resultSearch.length && notFoundTool ? <span>No se encontraron herramientas con el nombre "{dataSearching}"</span> : toolsList.length > 0 ? toolsList.map((tool)=> (
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