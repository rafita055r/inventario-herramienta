import "./styles/ModalDelWork.css"
import { useState } from "react"
import LoaderToData from "./LoaderToData"

export default function ModalConfirmDeleteWork({work_name, work_id, closeModal}){
    const [confirmName, setConfirmName] = useState("")
    const [msg, setMsg] = useState("")
    const [loaded, setLoaded] = useState(false)

    const handleChange = (e)=>{
        setMsg("")
        const {value} = e.target
        setConfirmName(value)
    }

    const handleClick = async(e)=>{
        e.preventDefault()
        console.log(confirmName === work_name);
        
        if(confirmName === work_name){
            setLoaded(true)
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/delete-work`,{
                method: "DELETE",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({id: work_id})
            })
            
            if(!res.ok) {
                setMsg("Error de servidor")  
                return console.log(res)
            };

            window.location.reload()
        }else{
            setMsg("No hay coincidencia")
            return
        }
    }

    return (
        <div className="background_modaldelWork">
            <div className="contain_form_delWork">
                <p className="p-delConfirm">Debes confirmar la eliminación</p>
                <form onChange={handleChange} className="form_delWork">
                    <label htmlFor="input-confirmDelete">Escribe exactamente <span style={{color: 'red'}}>{work_name}</span></label>

                    {
                        msg.length > 0 && <p style={{fontSize: "1rem", textAlign: "center", color: "#e35752", fontWeight: '600'}}>{msg}</p>
                    }

                    <input type="text" id="input-confirmDelete" autoComplete="off"/>
                    <div className="contain-btnModalDelet">
                        {
                            !loaded ? (<>
                            <button onClick={closeModal} className="btns-del-modal btn-cancel">Cancelar</button>
                            <button onClick={handleClick} className="btns-del-modal btn-del">Eliminar</button>
                            </>) : <LoaderToData />
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}