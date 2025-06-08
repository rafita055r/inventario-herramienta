import { useState } from 'react'
import useStore from '../services/useStore'
import './styles/MoveTool.css'
import LoaderToData from './LoaderToData'
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default function MoveTool({nameTool, fromWork, quantityInWork, medida, closeModal, id_tool}){
    const {obras, cargarDatosDesdeAPI} = useStore()
    const workFiltered = obras.filter(work=> work.id !== fromWork.id)
    const [dataToMove, setDataToMove] = useState({
        herramienta_id: id_tool,
        obra_origen_id: fromWork.id,
        obra_destino_id: null,
        cantidad: 1,
    })
    const [msg, setMsg]=useState('')
    const [loaded, setLoaded]=useState(false)

    const handleChangeDataToMove = (e)=>{
        e.preventDefault()
        setMsg('')
        const {name, value} = e.target
        setDataToMove((data)=>({
            ...data,
            [name]: value
        }))
        console.log(dataToMove);
        
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        
        
        if(dataToMove.obra_destino_id === null){
            setMsg('Debes elegir una obra donde mover')
            return
        }
        setLoaded(true)
        const res = await fetch(`${apiBaseUrl}/move-tool`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToMove)
        })

        if(res.ok){
            await cargarDatosDesdeAPI();
            closeModal();
            setLoaded(false) 
            
            return
        }else{
            const msg = await res.json()
            console.error(msg.error);
            setMsg('error de servidor')
            
        }
    }

    return (
        <div className='backgroundMoveTool' onClick={closeModal}>
            <form className='containModal' onClick={(e) => e.stopPropagation()} onChange={handleChangeDataToMove} onSubmit={handleSubmit}>
                <p className='nameTool_modal'>{nameTool}</p>
                <p className='fromWork_modal'>Desde: {fromWork.nombre}</p>
                <p className='measures_modal'>Medida: {medida}</p>
                    <label htmlFor='input-quantity'>
                        Cantidad
                    <input id='input-quantity'  className='inputQuantity_modal' type="number" max={quantityInWork} min={1} required name='cantidad' defaultValue={dataToMove.cantidad}/>
                    </label>
                <select className='selectToWork_modal' name='obra_destino_id'>
                    <option>Elige la obra</option>
                    {
                        workFiltered.map(work=>(
                            <option value={work.id} key={work.id}>{work.nombre}</option>
                        ))
                    }
                </select>
                {
                    msg !== '' && <p style={{color: 'red', fontSize: '15px', textAlign: 'center'}}>{msg}</p>
                }
                {
                    loaded && <LoaderToData/>
                }
                {
                    !loaded && <button className='btnMoveTool_modal'>Mover herramienta</button>
                }
            </form>
        </div>
    )
}