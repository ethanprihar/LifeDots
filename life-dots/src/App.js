import logo from './logo.svg';
import './App.css';
import ndarray from "ndarray";
//var ndarray = require("ndarray");
//var ops = require("ndarray-ops");
//var gemm = require("ndarray-gemm");

function App()
{
  let a = ndarray(new Float64Array(100), [10,10]);
  console.log(a)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
