import '../Routes/styles/Tools.css'
import { useState } from 'react';
import useStore from '../services/useStore';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default function FormAddTool({showForm}){
    const [formData, setFormData] = useState({
        nombre: '',
        marca: '',
        cantidad_total: 1,
        estado: "",
        medidas: "",
        observacion: "",
        obra: ''
    });
    const [mensaje, setMensaje] = useState('');
    const addToolInStore = useStore((state) => state.agregarHerramienta);
    const {obras, cargarDatosDesdeAPI} = useStore();

    const handleFormData = (e) => {
        e.preventDefault();

        const {name, value} = e.target

        setFormData(data=>{
            return {
                ...data,
                [name]: value
            }
        })
        return
    };

    const submitNewTool = async (e)=>{
        e.preventDefault()
        e.target.disabled = true
        
        if(formData.estado === ''){
          e.target.disabled = false
          return setMensaje('Debe registrar el estado de la herramienta');
        } 

        const toolFormated = {
            ...formData,
            cantidad_total: Number(parseInt(formData.cantidad_total)),
            medidas: formData.medidas.length > 0 ? formData.medidas : null,
            marca: formData.marca.length > 0 ? formData.marca : 'Generico'
        }
        try {
            const res = await fetch(`${apiBaseUrl}/post-herramienta`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(toolFormated),
            });
            console.log(res);
            
            if (res.ok) {
              const {message, data} = await res.json(); // respuesta con la herramienta creada
              addToolInStore(data); // actualizamos el estado global
              setMensaje(message);
              setFormData({ nombre: '', marca: '', estado: '', cantidad_total: 1, medidas: "", observacion:"" });
              showForm(false);
              await cargarDatosDesdeAPI()
            } else {
              setMensaje('Error al agregar herramienta');
            }
          } catch (err) {
            console.error(err);
            setMensaje('Error de red');
          }
        
    }
    return (
        <form className="tool-form" onChange={handleFormData}>

            <input type="text" className="input-name" placeholder="Nombre" name='nombre' defaultValue={formData.nombre} required />

            <input type="text" className="input-brand" placeholder="Marca (por defecto Generico)" name='marca' defaultValue={formData.marca} />
            
            <select name='estado' required>
                <option >registre el estado</option>
                <option value={"bien"}>bien</option>
                <option value={"mal"}>mal</option>
                <option value={"mantenimiento"}>mantenimiento</option>
            </select>
            
            <input type="number" min="1" className="input-quantity" placeholder="# Ingrese Cantidad" name='cantidad_total' required />
            
            <input type="text" className="input-medidas" placeholder='medida (mm - " - cm)(opcional)' name='medidas' defaultValue={formData.medidas} />

            <select name="obra">
              <option>ubicacion</option>
              {
                obras.map((work)=>(
                  <option key={work.id} value={work.id}>{
                    work.nombre
                  }</option>
                ))
              }
            </select>
            <p style={{color:'#2a44a8', textAlign: 'center', fontSize: "14px"}}>La ubicacion de la herramienta por defecto es Galpon</p>
            
            <input type="text" className="input-observacion" name='observacion' defaultValue={formData.observacion} placeholder='observaciones'/>

            <button type="submit" name='asdfs' onClick={submitNewTool} className="submit-btn">Guardar</button>
            
            {mensaje && <p style={{color: 'red', fontSize: '16px'}}>{mensaje}</p>}
        </form>
    )
}