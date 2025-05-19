import { create } from 'zustand';
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

const useStore = create((set, get) => ({
  herramientas: [],
  obras: [],
  history: [],
  
  setHerramientas: (data) => set({ herramientas: data }),
  setObras: (data) => set({ obras: data }),
  agregarHerramienta: (nuevaHerramienta)=> set((state)=> ({
    herramientas: [...state.herramientas, nuevaHerramienta]
  })),
  agregarObra: (nuevaObra)=> set((state)=> ({
    obras: [...state.obras, nuevaObra]
  })),

  getHerramienta: (idTool)=>{
    const tools = get().herramientas
    return tools.find(tool=> tool.id === idTool)
  },
  
  getWorkByNameTool: (nameTool)=>{
    const works = get().obras
    
    const toolsInWork = works.map((work)=>{
      let isFind = false
      
      for(const tool of work.herramientas_enObra){        
        
        isFind = tool.nombre.trim().toLowerCase().includes(nameTool.toLowerCase())

        if(isFind) {
          return work
        }
      };
      return undefined
    })
    
    return toolsInWork.filter((elem)=> elem !== undefined)
  },

  cargarDatosDesdeAPI: async () => {
    const herramientasRes = await fetch(`${apiBaseUrl}/herramientas`);
    const obrasRes = await fetch(`${apiBaseUrl}/obras`);
    const historyRes = await fetch(`${apiBaseUrl}/history`)

    const herramientas = await herramientasRes.json();
    const obras = await obrasRes.json();
    const history = await historyRes.json();

    set({ herramientas, obras, history });
  }
}));

export default useStore;
