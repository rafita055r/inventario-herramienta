import { useState } from 'react'
import './styles/ModalEditWork.css'
import useStore from '../services/useStore'
import LoaderToData from './LoaderToData'

export default function ModalEditWork({dataWork, closeModal}){
    const {updateWork} = useStore()
    const [ data, setData ] = useState({
        id: dataWork.id,
        nombre: dataWork.nombre,
        direccion: dataWork.direccion ? dataWork.direccion : ''
    })
    const [ msg, setMsg ] = useState('')
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e)=> {
        const {name, value} = e.target
        setMsg('')
        setData(obra=>({
            ...obra,
            [name]: value
        }))
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.nombre.trim().length > 0 || data.direccion.trim().length > 0){
            setLoading(true)
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/update-work`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data
                })
            })
            
            if(res.ok){
                const data = await res.json()
                updateWork(data)
                closeModal()
            }else{
                setLoading(false)
                return setMsg('Error de servidor')
            }
        }

        return setMsg('No se puede enviar campos vacios')
    }

    return <div className="background_modalEdtiWork" onClick={closeModal}>
        <div className="contain_form_editWork" onClick={(e) => e.stopPropagation()}>
            <form className='form_editWork' onChange={handleChange}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" defaultValue={data.nombre}/>

                <label htmlFor="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion" defaultValue={data.direccion}/>

                <p style={{color:'#2a44a8', textAlign: 'center', fontSize: "14px"}}>{msg}</p>
                {
                    loading ? <LoaderToData /> : <button onClick={handleSubmit}>Guardar</button>
                }
            </form>
            <button onClick={closeModal}>Cancelar</button>
        </div>
    </div>
}