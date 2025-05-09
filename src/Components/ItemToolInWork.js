import './styles/ItemToolInWorks.css'
export default function ItemToolInWork({nameTool, quantity, brand}){

    return (
        <li className='toolInWork'>
            <p className="tool-quantity">x{quantity}</p>
            <p className="tool-nameTools">{nameTool}</p>
            <p className="tool-brand">{brand}</p>
        </li>
    )
}
