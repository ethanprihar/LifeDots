import React from 'react';
import logo from './logo.svg';
import './App.css';

import Genome from './models/Genome';
import Dot from './models/Dot';
import RandomRain from './models/FoodPlacers/RandomRain';
import Border from './models/WallPlacers/Border';
import CenterPit from './models/TrapPlacers/CenterPit';
import RandomStart from './models/DotPlacers/RandomStart';

var ndarray = require("ndarray");
var ops = require("ndarray-ops");
var gemm = require("ndarray-gemm");

function App() {
  console.log('Genome Test');
  let ally_min = -10.6;
  let ally_max = 100.4;
  let max_size = 200.2;
  let baby_frac = 0.8;
  let eat_ratio = 0.5;
  let speed = 4.2;
  let view = 1.1;
  let max_mut_pct = 0.1;
  let weights = ndarray(new Float64Array((view * 2 + 1) * (view * 2 + 1) * 5 * 10), [(view * 2 + 1) * (view * 2 + 1) * 5, 10]);
  let g1 = new Genome(ally_min, ally_max, max_size, baby_frac, eat_ratio, speed, view, weights, max_mut_pct);
  let g2 = g1.mutate();
  console.log(g1);
  console.log(g2);

  console.log('Dot Test');
  g2.max_mut_pct = 1
  let d = new Dot(g2.max_size * g2.baby_frac, g2);
  let move_input = ndarray(new Float64Array((view * 2 + 1) * (view * 2 + 1) * 5), [1,(view * 2 + 1) * (view * 2 + 1) * 5]);
  ops.random(move_input);
  console.log(d.move(move_input));
  console.log(d.split());
  d.size += 10000;
  console.log(d.split());
  console.log(d);

  console.log('RandomStart Test');
  let rs = new RandomStart(20,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1)
  let dgrid = rs.init(6, 7)
  console.log(dgrid)
  
  console.log('RandomRain Test');
  let tbr = 10;
  let dpr = 50;
  let fpd = 1;
  let rr = new RandomRain(tbr, dpr, fpd);
  let fgrid = rr.init(6, 7);
  console.log(ops.sum(fgrid));
  for (let i = 0; i < 100; i++)
  {
    rr.update(fgrid);
  }
  console.log(ops.sum(fgrid));

  console.log('CenterPit Test')
  let cp = new CenterPit(2, 10);
  let cpgrid = cp.init(6, 7);
  cp.update(cpgrid);
  console.log(ops.sum(cpgrid));
  console.log(ops.sum(fgrid));

  console.log('Border Test')
  let b = new Border();
  let bgrid = b.init(6, 7, dgrid, cpgrid, fgrid);
  b.update(bgrid, dgrid, cpgrid, fgrid)
  console.log(ops.sum(bgrid));
  console.log(ops.sum(cpgrid));
  console.log(ops.sum(fgrid));

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
