import p5 from 'p5';

const appContainer = document.getElementById('app');

const sketch = (p5) => {
  p5.setup = function() {
    p5.createCanvas(400, 400);
  };

  p5.draw = function() {
    p5.background(220);
  };
};

new p5(sketch, appContainer);
