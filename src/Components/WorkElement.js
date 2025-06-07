import './styles/WorkElement.css'
import useStore from '../services/useStore';
import ItemToolInWork from './ItemToolInWork';
import { useState } from "react";


export default function WorkElement({work, setWorkData}){
  const {getHerramienta} = useStore()
  const [isOpen, setIsOpen] = useState(false);
  
  const openToolList = ()=>{
    setIsOpen(!isOpen)
  }
  const dataToEdit = {
    id: work.id,
    nombre: work.nombre,
    direcccion: work.direcccion
  }

  const onClickDeleteWork = async (e)=>{
    const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/delete-work`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: work.id})
    })

    if(!res.ok) return console.log(res);

    const data = await res.json()
    return console.log(data);
  }

  return(
    <li className='li_Work'>
      <h3 className={isOpen ? 'listToolOpen' : null} onClick={openToolList} style={{ cursor: "pointer" }}>
        {work.nombre}
      </h3>
      <div className={`tools-container ${isOpen ? "open" : ""}`}>
        <div className='contain_btnDel_btnUpd'> 
          <button className='btn_editWork' onClick={()=>setWorkData({...dataToEdit})}>Editar</button>
          <button className='btn_delWork' onClick={onClickDeleteWork}>Eliminar</button>
        </div>
        <ul className="listTools">
          {
            work.herramientas_enObra.length > 0 ? work.herramientas_enObra.map((tool) => {
              const toolFormated = getHerramienta(tool.herramienta_id)
              return <ItemToolInWork 
                  nombre={toolFormated.nombre} 
                  cantidad={tool.cantidad} 
                  marca={toolFormated.marca} 
                  estado={toolFormated.estado}
                  medidas={toolFormated.medidas}
                  work={work}
                  id_tool={toolFormated.id}
                  key={toolFormated.id}/>
            }) : <>no hay herramientas</>
          }
        </ul>
      </div>
    </li>
    )
}