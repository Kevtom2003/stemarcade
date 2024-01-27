import { Stage, Sprite } from '@inlet/react-pixi/index'
import './App.css';
import wizard from "./wizard.png"

const App = () => {
  return(
  <Stage
  width={300} 
  height={300} 
  options={{ 
  backgroundColor: 0x012b30, 
  antialias: true 
  }}>
    <Sprite image={wizard} x={150} y={150}/>
  </Stage>
)}

export default App;
