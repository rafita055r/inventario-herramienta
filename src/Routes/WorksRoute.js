import "./styles/Works.css";
import { useState } from "react";
import WorkElement from "../Components/WorkElement";
import { FormAddWork } from "../Components/FormAddWork";
import useStore from "../services/useStore";
import LoaderMain from "../Components/LoaderMain";
import ModalEditWork from "../Components/ModalEditWork";
import ModalConfirmDeleteWork from "../Components/ModalConfirmDeletWork";

export default function WorksRoute({ worksList }) {
  const { searchToolsAndWorks } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [searchingData, setSearchingData] = useState({
    workName: "",
    toolName: "",
  });
  const [resultSearching, setResultSearching] = useState([]);
  const [data_work, setDataWork] = useState({});
  const [showEditWork, setShowEditWork] = useState(false);
  const [modalDel, setModalDel] = useState(false);

  const setWorkIdToEdit = (work) => {
    setDataWork(work);
    setShowEditWork(!showEditWork);
  };
  const setWorkIdToDelete = (work) => {
    setDataWork(work);
    setModalDel(!showEditWork);
  };

  const openModalToEdit = () => setShowEditWork(!showEditWork);
  const openModalToDelete = () => setModalDel(!modalDel);

  const handleShowForm = (is_Show) => setShowForm(is_Show);

  const handleSearchWork = (e) => {
    const { value, name } = e.target;

    setSearchingData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onClickSearching = async () =>
    setResultSearching(
      await searchToolsAndWorks(searchingData.workName, searchingData.toolName)
    );
  return (
    <section className="sectionWorks">
      <input
        type="text"
        name="toolName"
        placeholder="Buscar Herramienta"
        onChange={handleSearchWork}
        className="input-search"
      />
      <input
        type="text"
        name="workName"
        placeholder="Buscar Obra"
        onChange={handleSearchWork}
        className="input-search"
      />

      {showForm && <FormAddWork showForm={handleShowForm} />}
      {searchingData.toolName.length > 0 ||
      searchingData.workName.length > 0 ? (
        <button onClick={onClickSearching} className="work-searching-button">
          Buscar
        </button>
      ) : null}

      <button
        onClick={() => setShowForm(!showForm)}
        className="add-work-button"
      >
        {showForm ? "Cancelar" : "Agregar Obra"}
      </button>

      <ul className="ul-listWorks">
        {resultSearching.length > 0 ? (
          resultSearching.map((work) => (
            <WorkElement
              setWorkData={setWorkIdToEdit}
              key={work.id}
              dataWork={work}
            />
          ))
        ) : worksList.length > 0 ? (
          worksList.map((work) => (
            <WorkElement
              setWorkDataToDel={setWorkIdToDelete}
              setWorkDataToEdit={setWorkIdToEdit}
              key={work.id}
              dataWork={work}
            />
          ))
        ) : (
          <LoaderMain />
        )}
      </ul>
      {showEditWork && (
        <ModalEditWork dataWork={data_work} closeModal={openModalToEdit} />
      )}
      {modalDel && (
        <ModalConfirmDeleteWork
          work_name={data_work.nombre}
          work_id={data_work.id}
          closeModal={openModalToDelete}
        />
      )}
    </section>
  );
}
