class Circle {
  constructor(x, y, p) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.r = 1;
    this.growing = true;
  }

  show = () => {
    this.p.stroke(255);
    this.p.strokeWeight(0.5);
    this.p.noFill();

    // this.p.fill(100);

    //circles
    this.p.ellipse(this.x, this.y, this.r * 2, this.r * 2);

    //Triangles
    // this.p.beginShape(this.p.TRIANGLES);
    // this.p.vertex(this.x, this.y);
    // this.p.vertex(this.x - this.r, this.y + this.r);
    // this.p.vertex(this.x + this.r, this.y + this.r);
    // this.p.endShape();

    //square
    // this.p.beginShape();
    // this.p.vertex(this.x, this.y);
    // this.p.vertex(this.x + this.r, this.y);
    // this.p.vertex(this.x + this.r, this.y + this.r);
    // this.p.vertex(this.x, this.y + this.r);
    // this.p.endShape(this.p.CLOSE);

    //line
    // this.p.line(this.x, this.y, this.x + this.r, this.y + this.r);
  };

  grow = () => {
    if (this.growing) {
      this.r += 1;
    }
  };

  edges = () => {
    return (
      this.x + this.r > this.p.width ||
      this.x - this.r < 0 ||
      this.y + this.r > this.height ||
      this.y - this.r < 0
    );
  };
}

export default Circle;
