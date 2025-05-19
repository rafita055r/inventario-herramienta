import { useState } from 'react'
import MoveTool from './MoveTool'
import './styles/ItemToolInWorks.css'


export default function ItemToolInWork({nombre, cantidad, marca, medidas, estado, work, id_tool}){
    const [showModal, setShowModal] = useState(false)

    const handleShowModal = ()=>(setShowModal(!showModal))

    return (
        <li className='toolInWork'>
            <p className="tool-quantity">x{cantidad}</p>
            <p className="tool-nameTools">{nombre}</p>
            <p className="tool-medidas">{medidas}</p>
            <p className="tool-brand">{marca}</p>
            <p className="tool-state">{estado}</p>

            <button className='moveToolBtn' onClick={handleShowModal}>mover</button>

            {showModal && <MoveTool closeModal={handleShowModal} quantityInWork={cantidad} nameTool={nombre} fromWork={work} medida={medidas} id_tool={id_tool}/>}
        </li>
    )
}
