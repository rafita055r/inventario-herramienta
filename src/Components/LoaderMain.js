
import {CircleLoader} from "react-spinners"

export default function LoaderMain(){
    return <div style={{
        padding: '30px',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    }}>
        <CircleLoader
  color="#1d5429"
  size={150}
  speedMultiplier={0.4}
/>
        <p style={{color: '#1d5429'}}>Cargando...</p>
    </div>
}