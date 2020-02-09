import React, { Component } from "react";
import "../src/App.css";
import P5Wrapper from "./P5Wrapper";
import sketch2 from "./sketches/pointsOnText/sketch";
import flockingSketch from "./sketches/flocking/flockingSketch";
import circlesSketch from "./sketches/cirlces/circlesSketch";

class App extends Component {
  render() {
    return (
      <div className="App">
        {<P5Wrapper sketch={sketch2} />}
        {<P5Wrapper sketch={flockingSketch} />}
        {<P5Wrapper sketch={circlesSketch} />}
      </div>
    );
  }
}

export default App;
