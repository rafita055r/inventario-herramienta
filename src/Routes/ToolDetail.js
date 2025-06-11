import "./styles/ToolDetail.css"

export default function ToolDetail(){
    return (
        <main className="main-detail-tool">
            <section className="section-detail-tool">
                <img src="https://imgs.search.brave.com/kBu1TzPCR4MuKKuytVqM857wgngy7Db68ZtdBHFZYyA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zLmFs/aWNkbi5jb20vQHNj/MDQva2YvSGQyNzUy/YjM1ODQ0NzQwNTE4/NmNlNmJlZGEzMmFl/YWRhNi5qcGdfMzAw/eDMwMC5qcGc" alt="" className="img-detail-tool"/>
                <div className="div-nameAndObserv-tool">
                <div className="div-btnsDelEdit-detail-tool">
                    <button className="btn-edit-tool">Editar</button>
                    <button className="btn-del-tool">Eliminar</button>
                </div>
                    <h2>Martillo con cabeza de goma</h2>
                    <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
                </div>


                <div className="div-allQuantity-tool">
                    <h4>Cantidad total</h4><span style={{fontWeight: "600", color: "#16182d"}}>10</span>
                </div>
                <div className="div-table-ubication-quantity">
                    <div className="div-header-UbicQuant">
                        <span className="span-ubicationDetail">Ubicación</span>
                        <span className="span-quantityDetail">Cant</span>
                        <span className="span-voidSpace"></span>
                    </div>
                    <ul className="list-UbicQuant-detail">
                        <li>
                            <span className="span-nameWork-detailTool">Galpon almacenamiento de esquina</span>
                            <span className="span-quantity-detailTool">2</span>
                            <span className="span-move-detailTool">
                                <button>Mover</button>
                            </span>
                        </li>
                        <li>
                            <span className="span-nameWork-detailTool">Obra 2</span>
                            <span className="span-quantity-detailTool">3</span>
                            <span className="span-move-detailTool">
                                <button>Mover</button>
                            </span>
                        </li>
                        <li>
                            <span className="span-nameWork-detailTool">Obra 3</span>
                            <span className="span-quantity-detailTool">5</span>
                            <span className="span-move-detailTool">
                                <button>Mover</button>
                            </span>
                        </li>
                    </ul>
                </div>

            </section>
        </main>
    )
}