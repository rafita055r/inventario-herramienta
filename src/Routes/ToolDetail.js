import { useLocation, useNavigate, useParams } from "react-router"
import "./styles/ToolDetail.css"
import useStore from "../services/useStore";
import { useState } from "react";
import LoaderToData from "../Components/LoaderToData";

const urlImgGeneric = "https://static.vecteezy.com/system/resources/previews/009/098/401/large_2x/tool-icon-collection-illustration-instrument-symbol-wrench-hammer-handsaw-screwdriver-adjustment-wrench-paint-brush-vector.jpg"

export default function ToolDetail(){
    const {id} = useParams();
    const location = useLocation()
    const {tool} = location.state;
    const navigate = useNavigate()
    const {cargarDatosDesdeAPI} = useStore();
    const [delLoader, setDelLoader] = useState(false)
    const [editLoader, setEditLoader] = useState(false)
    
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
                <img src={tool?.img ? tool.img : urlImgGeneric} alt="" className="img-detail-tool"/>
                <div className="div-nameAndObserv-tool">
                <div className="div-btnsDelEdit-detail-tool">
                    <button className="btn-edit-tool">Editar</button>
                    <button className="btn-del-tool" onClick={onClickDelete}>{delLoader ? <LoaderToData width={60} color={"#fefefe"} textOfCharging={"eliminando"}/> : "Eliminar"}</button>
                </div>
                    <h2>{tool.nombre}</h2>
                    <p>{tool.observacion}</p>
                </div>


                <div className="div-allQuantity-tool">
                    <h4>Cantidad total</h4><span style={{fontWeight: "600", color: "#16182d"}}>{tool.cantidad_total}</span>
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