import React from 'react';
import logo from './logo.svg';
import './App.css';

import Genome from './models/Genome.js';
import Dot from './models/Dot.js';
import {} from 'mathjs'

function App() {
  var g = new Genome([100, 200], [0.9, 0.5], [0.1, 0.2], [10, 5], [3, 0], [0.8, 0.7], [2, 1], [0, 5], [15, 10], 2, [0.5, 0.5], [math.zeros(7, 11), math.zeros(1, 10)]);
  var d = new Dot(true, g);
  var m = d.move(0,0,[math.ones(30, 20), math.ones(30, 20), math.ones(30, 20), math.ones(30, 20), math.ones(30, 20)]);
  console.log(m)

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
