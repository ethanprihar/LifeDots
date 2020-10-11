import React from 'react';
import logo from './logo.svg';
import './App.css';
import Genome from './models/Genome';

//import Dot from './models/Dot.js';

var math = require("mathjs");
var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

const view = 5

function App() {
  console.log('Genome Test')
  let ally_min = -10.6;
  let ally_max = 100.4;
  let max_size = 200.2;
  let baby_frac = 0.8;
  let eat_ratio = 0.5;
  let speed = 4.2;
  let weights = ndarray(new Float64Array((view * 2 + 1) * (view * 2 + 1) * 5 * 10), [(view * 2 + 1) * (view * 2 + 1) * 5, 10]);
  let g1 = new Genome(ally_min, ally_max, max_size, baby_frac, eat_ratio, speed, weights);
  let g2 = g1.mutate(0.1);
  console.log(g1);
  console.log(g2);
  
  console.log('Matrix Multiplication Test')
  let a = ndarray(new Float64Array((view * 2 + 1) * (view * 2 + 1) * 5), [1,(view * 2 + 1) * (view * 2 + 1) * 5]);
  ops.random(a)
  let c = ndarray(new Float64Array(10), [1,10]);
  let t = window.performance.now();
  for (let i = 0; i < 1000; i++)
  {
    gemm(c, a, g2.weights);
  }
  console.log(window.performance.now() - t);
  
  console.log('Test Getting View')
  let row = 3;
  let col = 4;
  let test1 = [];
  for (let r = row-1; r < row + 2; r++)
  {
    for (let c = col - 1; c <= col + 1; c++)
    {
      test1.push(g2.weights.get(r, c));
    }
  }
  console.log(test1);
  let x = g2.weights.hi(row + 2, col + 2).lo(row - 1, col - 1);
  let test2 = [];
  for (let r = 0; r < x.shape[0]; r++)
  {
    for (let c = 0; c < x.shape[1]; c++)
    {
      test2.push(x.get(r, c))
    }
  }
  console.log(test2)
  console.log(x.data)


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
