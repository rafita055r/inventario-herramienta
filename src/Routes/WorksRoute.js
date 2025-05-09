import { useState } from "react";
import WorkElement from "../Components/WorkElement";
import "./styles/Works.css";





const initialWorks = [
    {
      name: "Ypf Norte",
      tools: [
        { name: "Moladora loca chica con cable 20 metros", quantity: 2, brand: "Makita" },
        { name: "Pala Hancha", quantity: 4, brand: "Generico" },
        { name: "Balde", quantity: 5, brand: "Generico" },
      ]
    },
    {
      name: "Olivetti",
      tools: [
        { name: "Moladora", quantity: 2, brand: "Makita" },
        { name: "Pala Hancha", quantity: 4, brand: "Generico" },
        { name: "Balde", quantity: 5, brand: "Generico" },
      ]
    },
    {
      name: "Galpon",
      tools: [
        { name: "Moladora", quantity: 2, brand: "Makita" },
        { name: "Pala Hancha", quantity: 4, brand: "Generico" },
        { name: "Balde", quantity: 5, brand: "Generico" },
      ]
    },
  ];
  

export default function WorksRoute() {
    const [works, setWorks] = useState(initialWorks);
    const [showForm, setShowForm] = useState(false);
    const [newWorkName, setNewWorkName] = useState("");

    const handleAddWork = (e) => {
        e.preventDefault();
        if (newWorkName.trim() === "") return;

        const newWork = {
        name: newWorkName,
        tools: []
        };

        setWorks([...works, newWork]);
        setNewWorkName("");
        setShowForm(false);
    };


  return (
    <section className="sectionWorks">
        <button onClick={() => setShowForm(!showForm)} className="add-work-button"
        >
            {showForm ? "Cancelar" : "Agregar Obra"}
        </button>

        {showForm && (
            <form className="add-work-form" onSubmit={handleAddWork} style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    placeholder="Nombre de la obra"
                    value={newWorkName}
                    onChange={(e) => setNewWorkName(e.target.value)}
                />
                <button type="submit">Guardar</button>
            </form>
        )}
        <ul>
            {
                works.map((work)=>(<WorkElement work={work}/>))
            }
        </ul>
    </section>
  );
}
