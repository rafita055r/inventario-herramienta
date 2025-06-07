import "./styles/Works.css";
import { useEffect, useState } from "react";
import WorkElement from "../Components/WorkElement";
import { FormAddWork } from "../Components/FormAddWork";
import useStore from "../services/useStore";
import LoaderMain from "../Components/LoaderMain";
import ModalEditWork from "../Components/ModalEditWork";
import ModalConfirmDeleteWork from "../Components/ModalConfirmDeletWork";

export default function WorksRoute({worksList}) {
    const [showForm, setShowForm] = useState(false);
    const [searchTool, setSearchTool] = useState('')
    const {getWorkByNameTool} = useStore()
    const [workWithTool, setWorkWithTool] = useState([])
    const [data_work, setDataWork] = useState({})
    const [showEditWork, setShowEditWork] =useState(false)
    const [modalDel, setModalDel] = useState(false)

    const setWorkIdToEdit = (work) => {setDataWork(work); setShowEditWork(!showEditWork)}
    const setWorkIdToDelete = (work) => {setDataWork(work); setModalDel(!showEditWork)}
    
    const openModalToEdit = ()=> setShowEditWork(!showEditWork)
    const openModalToDelete = () => setModalDel(!modalDel)

    const handleShowForm = (is_Show)=>{
        setShowForm(is_Show);
    }

    const handleChangeSearchTool = (e)=>{
        const {value} = e.target;
        setSearchTool(value)
    }

    useEffect(()=>{
        setWorkWithTool(getWorkByNameTool(searchTool));
        
        if (searchTool.trim() === '') {
            setWorkWithTool([]);
        }

    },[getWorkByNameTool, searchTool])

    return (
        <section className="sectionWorks">
            <input type="text" placeholder="Buscar Herramienta" onChange={handleChangeSearchTool} defaultValue={searchTool} className="input-search"/>


            {showForm && (
                <FormAddWork showForm={handleShowForm}/>
            )}
            <button onClick={() => setShowForm(!showForm)} className="add-work-button"
            >
                {showForm ? "Cancelar" : "Agregar Obra"}
            </button>
            <ul className="ul-listWorks">
                {
                    workWithTool.length > 0 ? workWithTool.map((work)=>(<WorkElement setWorkData={setWorkIdToEdit} key={work.id} work={work}/>)) :
                    worksList.length > 0 
                    ? worksList.map((work)=>(<WorkElement setWorkData={setWorkIdToDelete} key={work.id} work={work}/>)) 
                    : <LoaderMain/>
                }
            </ul>
            {
                showEditWork && <ModalEditWork dataWork={data_work} closeModal={openModalToEdit}/>
            }
            {
                modalDel && <ModalConfirmDeleteWork work_name={data_work.nombre} work_id={data_work.id} closeModal={openModalToDelete}/>
            }
        </section>
  );
}
