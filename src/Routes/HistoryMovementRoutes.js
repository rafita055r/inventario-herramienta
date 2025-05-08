import "./styles/HistoryMovements.css"

export default  function HistoryMovementRoutes(){
    return(
        <section className="sectionListMovement">
            <div className="movement-subtitleInfo">
                <span className="span-tools">herramienta</span>
                <span className="span-from">desde</span>
                <span className="span-to">hasta</span>
                <span className="span-date">fecha</span>
            </div>
            <ul>
                <li>
                    <p className="p-tools">moladora marca chica</p>
                    <p className="p-from">galpon</p>
                    <p className="p-to">YPF</p>
                    <p className="p-date">03/08/25<br/>
                    11:50</p>
                </li>
            </ul>
        </section>
    )
}