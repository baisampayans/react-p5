class Flock {
  constructor() {
    this.boids = [];
  }

  run = () => {
    for (let boid of this.boids) {
      //   console.log("flockClass22", this.boids);
      boid.run(this.boids);
    }
  };

  addBoid = b => {
    this.boids.push(b);
  };
}

export default Flock;
