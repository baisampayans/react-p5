import { Vector } from "p5";

class Boids {
  constructor(x, y, p) {
    this.p = p;
    this.acc = this.p.createVector(0, 0);
    this.vel = this.p.createVector(this.p.random(-1, 1), this.p.random(-1, 1));
    this.pos = this.p.createVector(x, y);
    this.r = 3;
    this.maxSpeed = 3;
    this.maxForce = 0.5;
  }
  run = boids => {
    this.flock(boids);
    this.update();
    this.borders();
    this.renderBoids();
  };

  applyForce = force => {
    this.acc.add(force);
  };

  flock = boids => {
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohesion(boids);

    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  };

  update = () => {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  seek = target => {
    let desired = Vector.sub(target, this.pos);
    desired.normalize();
    desired.mult(this.maxSpeed);
    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  };

  renderBoids = () => {
    let theta = this.vel.heading() + this.p.radians(90);
    this.p.fill(127);
    this.p.stroke(200);
    this.p.push();
    this.p.translate(this.pos.x, this.pos.y);
    this.p.rotate(theta);
    this.p.beginShape();
    this.p.vertex(0, -this.r * 2);
    this.p.vertex(-this.r, this.r * 2);
    this.p.vertex(this.r, this.r * 2);
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  };
  borders = () => {
    if (this.pos.x < -this.r) this.pos.x = this.p.width + this.r;
    if (this.pos.y < -this.r) this.pos.y = this.p.height + this.r;
    if (this.pos.x > this.p.width + this.r) this.pos.x = -this.r;
    if (this.pos.y > this.p.height + this.r) this.pos.y = -this.r;
  };

  separate = boids => {
    let desiredSeparation = 30.0;
    let steer = this.p.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      //   console.log("boids", boids[i].pos, "boidsPos", this.pos);
      let d = Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < desiredSeparation) {
        let diff = Vector.sub(this.pos, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }
    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }
    return steer;
  };

  align = boids => {
    let neighborDist = 50;
    let sum = this.p.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < neighborDist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = Vector.sub(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p.createVector(0, 0);
    }
  };

  cohesion = boids => {
    let neighborDist = 50;
    let sum = this.p.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.pos, boids[i].pos);
      if (d > 0 && d < neighborDist) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return this.p.createVector(0, 0);
    }
  };
}

export default Boids;
