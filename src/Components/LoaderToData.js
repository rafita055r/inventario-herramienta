import {BarLoader} from "react-spinners"

export default function LoaderToData({color, textOfCharging, width}){
    return <div style={{
        padding: '0',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center'
    }}>
        <BarLoader
        color= {color ? color : "#1d5429"}
        width={width ? width : 150}
        speedMultiplier={0.4}
        />
        <p style={{color: color ? color : "#1d5429", fontSize: '16px'}}>{textOfCharging ? textOfCharging : "Cargando..."}</p>
    </div>
}