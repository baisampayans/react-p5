import Vehicle1 from "./vehicleCons";

let vehicles = [];

function sketch2(p) {
  let font;
  p.preload = () => {
    font = p.loadFont("SourceSansPro-Black.otf");
  };
  p.setup = () => {
    p.createCanvas(1024, 512);
    p.background(0);
    p.textAlign(p.CENTER);
    p.textSize(300);

    let points = font.textToPoints("DesignUp", 40, 300, 150);

    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let vehicle = new Vehicle1(pt.x, pt.y, p);
      vehicles.push(vehicle);
    }
  };

  p.draw = () => {
    p.background(51);
    for (let i = 0; i < vehicles.length; i++) {
      let v = vehicles[i];
      v.update();
      v.show();
      v.behaviours();
    }
  };
}

export default sketch2;
