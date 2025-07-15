import { useLocation, useNavigate, useParams } from "react-router"
import "./styles/ToolDetail.css"
import useStore from "../services/useStore";
import { useEffect, useMemo, useState } from "react";
import LoaderToData from "../Components/LoaderToData";

const urlImgGeneric = "https://static.vecteezy.com/system/resources/previews/009/098/401/large_2x/tool-icon-collection-illustration-instrument-symbol-wrench-hammer-handsaw-screwdriver-adjustment-wrench-paint-brush-vector.jpg"



export default function ToolDetail(){
    const {id} = useParams();
    const location = useLocation()
    const {tool} = location.state;
    const navigate = useNavigate()
    const {cargarDatosDesdeAPI} = useStore();
    const [delLoader, setDelLoader] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

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
            {!isEditing ?
                <>
                    <img src={tool?.img ? tool.img : urlImgGeneric} alt="" className="img-detail-tool"/>
                    
                    <div className="div-nameAndObserv-tool">
                        <div className="div-btnsDelEdit-detail-tool">
                            <button className="btn-edit-tool" onClick={()=> setIsEditing(!isEditing)}>Editar</button>
                            <button className="btn-del-tool" onClick={onClickDelete}>{delLoader ? <LoaderToData width={60} color={"#fefefe"} textOfCharging={"eliminando"}/> : "Eliminar"}</button>
                        </div>

                        <h2>{tool.nombre}</h2>
                        <p>{tool.observacion}</p>
                        <p><b>Marca:</b>{tool.marca}</p>
                        <p><b>Medidas:</b>{tool.medidas}</p>
                        <p><b>Estado:</b>{tool.estado}</p>
                    </div>


                    <div className={isEditing ? "div-allQuantity-tool editing" : "div-allQuantity-tool"}>
                        <h4>Cantidad total</h4>
                        <span style={{fontWeight: "600", color: "#16182d"}}>{tool.cantidad_total}</span>
                    </div>
                </> : <EditedTool tool={tool} setIsEditing={(is)=>setIsEditing(is)}/>
                }
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

function EditedTool({tool, setIsEditing}){
    const navigate = useNavigate()
    const {cargarDatosDesdeAPI} = useStore()
    const {toolEdited, handlerEdtiTool, msgError, setMsgError} = useEditedTool(tool) 
    const {operation,handleChangeQuantity,result} = useEditQuantity(tool, handlerEdtiTool)
    const statePermited = ["bien", "mal", "mantenimiento"]
    const selectElem = document.getElementById("select-state")
    const [waitEditing, setWait] = useState(false)
    
    const onClickEdited = async ()=>{
        const isEqual = 
        toolEdited.estado === tool.estado &&
        toolEdited.marca === tool.marca &&
        toolEdited.medidas === tool.medidas &&
        toolEdited.nombre === tool.nombre &&
        toolEdited.observacion === tool.observacion &&
        toolEdited.quantityToModify.quantityValue === 0
        
        if(isEqual) return setIsEditing(false)
            
        console.log(toolEdited);
        if(toolEdited.nombre.trim() === "") return setMsgError("El campo 'nombre' está vacío")
        if(!statePermited.includes(toolEdited.estado)) return setMsgError("El valor de 'Estado' no es correcto")
        if(toolEdited.marca.trim() === "") toolEdited.marca = "Generico"
        if(toolEdited.quantityToModify.operation === "") toolEdited.quantityToModify.operation = undefined
        
        try {
            setWait(true)
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/edit-tool/${tool.id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(toolEdited)
            })

            if(res.ok){
                await cargarDatosDesdeAPI()
                return navigate(-1)
            }
            setWait(false)

            const {error} = await res.json()
            throw error

        } catch (error) {
            console.log(error);
            setMsgError(error)
            
        }
    }

    useEffect(()=> {
        if(selectElem){
            if(toolEdited.estado === statePermited[0]){
                selectElem.style.backgroundColor = "#0a823e"
            }else if(toolEdited.estado === statePermited[1]){
                selectElem.style.backgroundColor = "#b63737"
            }else if(toolEdited.estado === statePermited[2]){
                selectElem.style.backgroundColor = "#724923"
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[toolEdited])
    return (
        <div className="containEditTool">
            <div className="containImgTool_andButtonEdit">
                <img src={tool?.img ? tool.img : urlImgGeneric} alt="" className="img-detail-tool"/>
                <button>✏️</button>
            </div>

            <div className="div-nameAndObserv-tool">
                <div className="div-btnsDelEdit-detail-tool">
                    {   
                        waitEditing ? <LoaderToData /> :<>
                            <button className="btn-saveEdit-tool" onClick={onClickEdited}>Guardar</button>
                            <button className="btn-del-tool" onClick={()=>setIsEditing(false)}>Cancelar</button>
                        </>
                    }
                </div> 
                    
                <input type="text" defaultValue={toolEdited.nombre} onChange={handlerEdtiTool} name="nombre" className="inputModifyTool" placeholder="Nombre"/> 
                <textarea name="observacion" defaultValue={toolEdited.observacion} onChange={handlerEdtiTool} style={{width:"90vw", maxWidth: '90vw'}} placeholder="Observaciones..."/> 
                    <label>
                        <b style={{fontSize: '1.3rem'}}>Marca:</b>
                        <input type="text" name="marca" onChange={handlerEdtiTool} defaultValue={tool.marca} className="inputModifyTool" placeholder="Marca"/>
                    </label>
                    <label>
                        <b style={{fontSize: '1.3rem'}}>Medidas:</b>
                        <input type="text" name="medidas" onChange={handlerEdtiTool} defaultValue={tool.medidas} className="inputModifyTool"/>
                    </label>
                    <label className="labelSelectState">
                        <b style={{fontSize: '1.3rem'}}>Estado:</b>
                        <select defaultValue={tool.estado} name="estado" onChange={handlerEdtiTool} className="selectModifyState" id="select-state">
                            <option value={"bien"} className="optionGood">bien</option>
                            <option value={"mal"} className="optionBad">mal</option>
                            <option value={"mantenimiento"} className="optionMaintenance">mantenimiento</option>
                        </select>
                    </label>
            </div>

            <div className="div-allQuantity-tool editing" >
                <h4>Cantidad total</h4>
                    
                <div style={{display:"flex", gap: "20px", alignItems: "center"}}>
                    <div className="div-containModifyQuant">
                        <label className="labelSubstract">Quitar</label>
                        <input type="number" name="substract" onChange={handleChangeQuantity} disabled={operation === "addition" || tool.ubications.length > 1} min={0} max={tool.cantidad_total - 1}/>
                    </div>
                    <p>{result}</p>
                    <div className="div-containModifyQuant">
                        <label className="labelAddition">Agregar</label>
                        <input type="number" name="addition" onChange={handleChangeQuantity} disabled={operation === "substract"} min={0}/>
                    </div>
                </div>
                <p>Si la herramienta se encuentra en más de una obra no se puede restar la cantidad</p>
                {msgError && <p className="p-editTool-error">{msgError}</p>} 
            </div>
        </div>
    )
}

function useEditQuantity(tool, handlerEdit){
    const [count, setCount] = useState(0)
    const [operation, setOperation] = useState("")

    
    const handleChangeQuantity = (e)=>{
        const {name: op} = e.target

        const raw = parseInt(e.target.value, 10)
        const value = Number.isNaN(raw) ? 0 : raw;

        // si value es cero no se hara ninguna operacion
        setOperation(value > 0 ? op : "")
        setCount(value);
    }

    const result = useMemo(()=>{
        if(!count || !operation) return tool.cantidad_total

        return operation === 'substract' 
        ? tool.cantidad_total - count 
        : tool.cantidad_total + count
    },[count, operation, tool.cantidad_total])

    useEffect(()=>{
        handlerEdit({
            target:{
                name: 'quantityToModify',
                value: {operation, quantityValue: count}
            }
        })
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[operation, count])

    return {
        operation,
        count,
        handleChangeQuantity,
        result
    }
}

function useEditedTool(tool){
    const [ toolEdited, setToolEdited ] = useState({
        nombre: tool.nombre,
        observacion: tool.observacion,
        quantityToModify: tool.cantidad_total,
        marca: tool.marca,
        medidas: tool.medidas,
        estado: tool.estado
    })
    const [msgError, setMsgError] = useState("")

    const handlerEdtiTool = (e)=>{
        const {name, value} = e.target

        setToolEdited((tool)=>({
            ...tool,
            [name]: value
        }))
        
    }

    return {toolEdited, handlerEdtiTool, msgError, setMsgError}
}