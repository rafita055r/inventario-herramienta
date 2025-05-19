import './styles/WorkElement.css'
import useStore from '../services/useStore';
import ItemToolInWork from './ItemToolInWork';
import { useState } from "react";


export default function WorkElement({work}){
  const {getHerramienta} = useStore()
  const [isOpen, setIsOpen] = useState(false);
    
  return(
    <li className='li_Work'>
      <h3 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
        {work.nombre}
      </h3>
      <div className={`tools-container ${isOpen ? "open" : ""}`}>

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