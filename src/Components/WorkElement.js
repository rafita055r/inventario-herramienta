import './styles/WorkElement.css'
import useStore from '../services/useStore';
import ItemToolInWork from './ItemToolInWork';
import { useState } from "react";

export default function WorkElement({work, setWorkDataToDel, setWorkDataToEdit}){
  const {getHerramienta} = useStore()
  const [isOpen, setIsOpen] = useState(false);
  
  const openToolList = ()=>{
    setIsOpen(!isOpen)
  }
  const data_work = {
    id: work.id,
    nombre: work.nombre,
    direcccion: work.direcccion
  }

  return(
    <li className='li_Work'>
      <h3 className={isOpen ? 'listToolOpen' : null} onClick={openToolList} style={{ cursor: "pointer" }}>
        {work.nombre}
      </h3>
      <div className={`tools-container ${isOpen ? "open" : ""}`}>
        <div className='contain_btnDel_btnUpd'> 
          <button className='btn_editWork' onClick={()=>setWorkDataToEdit({...data_work})}>Editar</button>
          <button className='btn_delWork' onClick={()=>setWorkDataToDel({...data_work})}>Eliminar</button>
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