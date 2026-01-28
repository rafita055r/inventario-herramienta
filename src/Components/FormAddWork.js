import { useState } from "react";
import "../Routes/styles/Works.css";
import useStore from "../services/useStore";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export function FormAddWork({ showForm }) {
  const addWorkToStore = useStore((state) => state.agregarObra);
  const [work, setWork] = useState({
    nombre: "",
    direccion: "",
  });

  const handleChangeForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name.trim() === "") return;

    setWork((work) => {
      return {
        ...work,
        [name]: value.trim(),
      };
    });
  };

  const submitWork = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiBaseUrl}/post-obra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(work),
      });

      console.log(res);

      if (res.ok) {
        const { data } = await res.json();

        addWorkToStore(data);
        showForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="add-work-form"
      onChange={handleChangeForm}
      onSubmit={submitWork}
    >
      <input
        type="text"
        placeholder="Nombre de la obra"
        name="nombre"
        defaultValue={work.nombre}
        required
      />
      <input
        type="text"
        placeholder="Dirección (opcional)"
        name="direccion"
        defaultValue={work.direccion}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
