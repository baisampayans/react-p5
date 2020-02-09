import Flock from "./flockClass";
import Boids from "./boids";

function flockingSketch(p) {
  let flock;
  let text;

  p.setup = () => {
    p.createCanvas(1024, 512);
    // p.createP("Drag the mouse to generate new boids");

    flock = new Flock();
    for (let i = 0; i < 100; i++) {
      let b = new Boids(p.width / 2, p.height / 2, p);
      flock.addBoid(b);
    }
  };

  p.draw = () => {
    p.background(51);
    flock.run();
  };

  p.mouseDragged = () => {
    flock.addBoid(new Boids(p.mouseX, p.mouseY, p));
  };
}

export default flockingSketch;
