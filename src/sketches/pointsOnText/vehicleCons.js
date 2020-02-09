import { Vector } from "p5";

class Vehicle1 {
  constructor(x, y, p) {
    this.p = p;
    this.pos = this.p.createVector(p.random(p.width), p.random(p.height));
    this.target = this.p.createVector(x, y);
    this.vel = Vector.random2D();
    this.acc = this.p.createVector();
    this.r = 8;
    this.maxSpeed = 10;
    this.maxForce = 1;
  }

  update = () => {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  };

  show = () => {
    this.p.stroke(255);
    this.p.strokeWeight(8);
    this.p.point(this.pos.x, this.pos.y);
  };

  behaviours = () => {
    let arrive = this.arrive(this.target);
    let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    let flee = this.flee(mouse);
    arrive.mult(1);
    flee.mult(5);
    this.applyForce(arrive);
    this.applyForce(flee);
  };

  applyForce = f => {
    this.acc.add(f);
  };

  flee = target => {
    let desired = Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      let steer = Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p.createVector(0, 0);
    }
  };

  arrive = target => {
    let desired = Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = this.p.map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  };
}

export default Vehicle1;
