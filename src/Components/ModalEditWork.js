

export default function ModalEditWork({id_work, nombre, direccion}){

    return <div className="background_modalEdtiWork">
        <div className="contain_form_editWork">
            <form>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre"/>

                <label htmlFor="direccion">Dirección</label>
                <input type="text" id="direccion" name="direccion"/>

                <button></button>
            </form>
        </div>
    </div>
}