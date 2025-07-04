import { useLocation, useNavigate, useParams } from "react-router"
import "./styles/ToolDetail.css"
import useStore from "../services/useStore";
import { useEffect, useState } from "react";
import LoaderToData from "../Components/LoaderToData";

const urlImgGeneric = "https://static.vecteezy.com/system/resources/previews/009/098/401/large_2x/tool-icon-collection-illustration-instrument-symbol-wrench-hammer-handsaw-screwdriver-adjustment-wrench-paint-brush-vector.jpg"

function useEditedTool(tool){
    const [ toolEdited, setToolEdited ] = useState({
        nombre: tool.nombre,
        observacion: tool.observacion,
        cantidad_total: tool.cantidad_total
    })
    const [msgError, setMsgError] = useState("")

    const handleEditTool = (e)=>{
        const {name, value} = e.target
        console.log(name, value);
        
        if(name === "cantidad_total"){
            // if(value < tool.can)
        }
        
    }

    return {toolEdited, handleEditTool, msgError}
}

export default function ToolDetail(){
    const {id} = useParams();
    const location = useLocation()
    const {tool} = location.state;
    const navigate = useNavigate()
    const {cargarDatosDesdeAPI} = useStore();
    const [delLoader, setDelLoader] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const {toolEdited, handleEditTool, msgError} = useEditedTool(tool) 

    const onClickDelete = async ()=>{
        setDelLoader(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tool-delete/${id}`, {method: "DELETE"})

            if(res.ok){
                await cargarDatosDesdeAPI()
                navigate(-1)
            }else{
                const err = await res.json()
                throw err
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <main className="main-detail-tool">
            <section className="section-detail-tool">
                <div className="containImgTool_andButtonEdit">
                    <img src={tool?.img ? tool.img : urlImgGeneric} alt="" className="img-detail-tool"/>
                    {isEditing && <button>✏️</button>}
                </div>
                <div className="div-nameAndObserv-tool">
                    {isEditing ? 
                        <div className="div-btnsDelEdit-detail-tool">
                            <button className="btn-saveEdit-tool" onClick={()=> setIsEditing(true)}>Guardar</button>
                            <button className="btn-del-tool" onClick={()=>setIsEditing(false)}>Cancelar</button>
                        </div> 
                    :
                        <div className="div-btnsDelEdit-detail-tool">
                            <button className="btn-edit-tool" onClick={()=> setIsEditing(!isEditing)}>Editar</button>
                            <button className="btn-del-tool" onClick={onClickDelete}>{delLoader ? <LoaderToData width={60} color={"#fefefe"} textOfCharging={"eliminando"}/> : "Eliminar"}</button>
                        </div>
                    }
                    {isEditing ? <input type="text" value={toolEdited.nombre} onChange={handleEditTool} name="nombre"/> : <h2>{tool.nombre}</h2>}
                    {isEditing ? <textarea name="observacion" defaultValue={toolEdited.observacion} onChange={handleEditTool}/> : <p>{tool.observacion}</p>}
                </div>


                <div className={isEditing ? "div-allQuantity-tool editing" : "div-allQuantity-tool"}>
                    <h4>Cantidad total</h4>
                    {isEditing ? <>
                        <EditedQuantityTool handlerEdit={handleEditTool} tool={tool}/>
                        <p>Si le herramienta se encuentra en más de una obra no se puede restar la cantidad</p>
                        {msgError && <p className="p-editTool-error">{msgError}</p>}
                    </>
                    : <span style={{fontWeight: "600", color: "#16182d"}}>{tool.cantidad_total}</span>}
                </div>
                <div className="div-table-ubication-quantity">
                    <div className="div-header-UbicQuant">
                        <span className="span-ubicationDetail">Ubicación</span>
                        <span className="span-quantityDetail">Cant</span>
                        <span className="span-voidSpace"></span>
                    </div>
                    <ul className="list-UbicQuant-detail">
                        {
                            tool.ubications.map(ubic => (
                                <li key={ubic.id}>
                                    <span className="span-nameWork-detailTool">{ubic.work_name}</span>
                                    <span className="span-quantity-detailTool">{ubic.quantityOnWork}</span>
                                    <span className="span-move-detailTool">
                                        <button>Mover</button>
                                    </span>
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            </section>
        </main>
    )
}

function EditedQuantityTool ({handlerEdit, tool}){
    const [count, setCount] = useState({
        operation: "",
        value: 0
    })

    const [result, setResult] = useState(tool.cantidad_total)

    
    const handledChange = (e)=>{
        const value= parseInt(e.target.value)
        const name = e.target.name

        setCount({
            operation: name,
            value: isNaN(value) ? 0 : value
        });
    }

    useEffect(()=>{

        if(count.operation !== "" && count.value <= 0){
            setCount({
                operation: "",
                value: 0
            });
        }

        if(count.operation === "substract" && count.value > 0 && count.value < tool.cantidad_total) {
            setResult((tool.cantidad_total - count.value))
            handlerEdit({target:{value:count, name: "cantidad_total"}})
        }
        else if(count.operation === "addition" && count.value > 0) {
            setResult((tool.cantidad_total + count.value))
            handlerEdit({target:{value:count, name: "cantidad_total"}})
        }
        
    },[count, handlerEdit, tool.cantidad_total])

    return <div style={{display:"flex", gap: "20px", alignItems: "center"}}>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <label style={{fontSize:"1rem"}}>Quitar</label>
            <input type="number" name="substract" onChange={handledChange} disabled={count.operation === "addition"} min={0} max={tool.cantidad_total - 1}/>
        </div>
        <p>{result}</p>
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <label style={{fontSize:"1rem"}}>Agregar</label>
            <input type="number" name="addition" onChange={handledChange} disabled={count.operation === "substract"} min={0}/>
        </div>
    </div>
}