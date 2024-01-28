import './App.css';
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <h1>Math VS Martians</h1>
      <Home x={50} y={50} width={50} height={50} />
    </div>
  );
};


export default App;
