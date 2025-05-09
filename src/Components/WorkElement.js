import ItemToolInWork from './ItemToolInWork';
import './styles/WorkElement.css'
import { useState } from "react";


export default function WorkElement({work}){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <li className='li_Work'>
          <h3 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}>
            {work.name}
          </h3>
          <div className={`tools-container ${isOpen ? "open" : ""}`}>

            <ul className="listTools">
              {work.tools.map((tool, y) => (<ItemToolInWork nameTool={tool.name} quantity={tool.quantity} brand={tool.brand} key={y}/>))}
            </ul>
          </div>
        </li>
    )
}