import {BarLoader} from "react-spinners"

export default function LoaderToData(){
    return <div style={{
        padding: '10px',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    }}>
        <BarLoader
        color="#1d5429"
        width={150}
        speedMultiplier={0.4}
        />
        <p style={{color: '#1d5429', fontSize: '16px'}}>Cargando...</p>
    </div>
}