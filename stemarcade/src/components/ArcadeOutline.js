import outline from "../images/arcade-removebg-preview.png";
import './ArcadeOutline.css'

export default function ArcadeOutline({ children, style }){
    return(
        <div className="arcade-container" style={style}>
            <img src= { outline } className="arcade-frame"/>
            {children}
        </div>
    )
}