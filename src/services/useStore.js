import { create } from "zustand";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const useStore = create((set, get) => ({
  herramientas: [],
  obras: [],
  history: [],
  // filteredWorks: [],

  setHerramientas: (data) => set({ herramientas: data }),
  setObras: (listWork) => set({ obras: listWork }),
  updateWork: (data) => {
    const obras = get().obras;
    const indexOfWork = obras.findIndex((work) => work.id === data.id);

    obras[indexOfWork] = {
      ...obras[indexOfWork],
      id: data.id,
      nombre: data.nombre,
      direccion: data.direccion,
    };

    set({ obras });
  },
  agregarHerramienta: (nuevaHerramienta) =>
    set((state) => ({
      herramientas: [...state.herramientas, nuevaHerramienta],
    })),
  agregarObra: (nuevaObra) =>
    set((state) => ({
      obras: [...state.obras, nuevaObra],
    })),

  getHerramienta: (idTool) => {
    const tools = get().herramientas;
    const tool = tools.find((tool) => tool.id === idTool);
    return tool;
  },
  // Devuelve una lista de las Obras donde está esa herramienta pero solo con la herramienta buscada
  searchToolsAndWorks: async (workName, toolName) => {
    try {
      const res = await fetch(
        `${apiBaseUrl}/obras?nameWork=${workName}&nameTool=${toolName}`
      );
      const filteredWorks = await res.json();
      console.log(filteredWorks);
      
      return filteredWorks;
    } catch (error) {
      return error;
    }
  },
  getToolByName: async (nameTool)=>{
    try {
      const result = await fetch(`${apiBaseUrl}/herramientas?name=${nameTool}`);
      if(!result.ok) throw new Error("Error HTTP: ", result.status)
      
      const data = await result.json()
      return data
    } catch (error) {
      console.log(error);
    }
  },

  cargarDatosDesdeAPI: async () => {
    const herramientasRes = await fetch(`${apiBaseUrl}/herramientas`);
    const obrasRes = await fetch(`${apiBaseUrl}/obras`);
    const historyRes = await fetch(`${apiBaseUrl}/history`);

    const herramientas = await herramientasRes.json();
    const obras = await obrasRes.json();
    const history = await historyRes.json();

    set({ herramientas, obras, history: history.reverse() });
  },
}));

export default useStore;
