import Circle from "./circle";

function circlesSketch(p) {
  let circles = [];
  let img;
  let spots = [];

  p.preload = () => {
    img = p.loadImage("img4.png");
  };

  p.setup = () => {
    p.createCanvas(1024, 512);
    img.loadPixels();
    for (let x = 0; x < img.width; x++) {
      for (let y = 0; y < img.height; y++) {
        let index = x + y * img.width;
        let c = img.pixels[index * 4];

        let b = p.brightness(p.color(c));
        if (b > 1) {
          spots.push(p.createVector(x, y));
        }
      }
    }
    img.updatePixels();
  };

  p.draw = () => {
    // p.background("#730BD1");
    p.background("#000");

    let count = 0;
    let total = 10;
    let attempt = 0;

    while (count < total) {
      let newCircle = p.newCircle();
      if (newCircle != null) {
        circles.push(newCircle);
        count++;
      }
      attempt++;
      if (attempt > 50) {
        p.noLoop();
        break;
      }
    }

    for (let circle of circles) {
      if (circle.growing) {
        if (circle.edges()) {
          circle.growing = false;
        } else {
          for (let otherCircle of circles) {
            if (circle !== otherCircle) {
              let d = p.dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
              if (d - 2 < circle.r + otherCircle.r) {
                circle.growing = false;
              }
            }
          }
        }
      }
      circle.show();
      circle.grow();
    }
  };

  p.newCircle = () => {
    let r = p.int(p.random(0, spots.length));
    let spot = spots[r];
    let x = spot.x;
    let y = spot.y;

    let valid = true;
    for (let circle of circles) {
      let d = p.dist(x, y, circle.x, circle.y);
      if (d < circle.r) {
        valid = false;
      }
    }
    if (valid) {
      return new Circle(x, y, p);
    } else {
      return null;
    }
  };
}

export default circlesSketch;
