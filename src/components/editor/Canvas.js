import React from 'react';
import PropTypes from 'prop-types';
import { Noise } from 'noisejs';

class Canvas extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);
  }

  /////////////////////////////////////
  //
  // LIFECYCLE

  componentWillMount() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.canvas2 = document.createElement('canvas');
    this.canvas2.width = this.canvas.width;
    this.canvas2.height = this.canvas.height;
    this.ctx2 = this.canvas2.getContext('2d');

    this.noise = new Noise(Math.random());

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas2.width = this.canvas.width;
      this.canvas2.height = this.canvas.height;
      this.draw();
    });
  }

  componentDidMount() {
    this.node.appendChild(this.canvas);
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  /////////////////////////////////////
  //
  // CANVAS

  draw() {
    // @TODO Optimise this
    //  - Cache previous layer pixels?

    const threshold = (variable, min, max, val) => {
      return variable < min || variable > max ? 0 : val ? val : variable;
    };

    // const map = function (value, domainMin, domainMax, scaleMin, scaleMax) {
    //   return (value - domainMin) * (scaleMax - scaleMin) / (domainMax - domainMin) + scaleMin;
    // };

    const parseColor = colorString => {
      let m = colorString.match(/^#([0-9a-f]{6})$/i)[1];
      if (m) {
        return [
          parseInt(m.substr(0, 2), 16),
          parseInt(m.substr(2, 2), 16),
          parseInt(m.substr(4, 2), 16)
        ];
      } else {
        return [0, 0, 0];
      }
    };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // BG
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.props.settings.backgroundColor;
    this.ctx.fill();
    this.ctx.closePath();

    // LAYERS
    this.props.layers.forEach(layer => {
      this.noise.seed(layer.noiseSeed);

      let image = this.ctx2.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let data = image.data;

      let color = parseColor(layer.color);

      for (let x = 0; x < this.canvas.width; x++) {
        for (let y = 0; y < this.canvas.height; y++) {
          let value = Math.abs(
            this.noise.perlin2(x / layer.frequency, y / layer.frequency) *
              layer.amplitude
          );

          value = threshold(value, layer.thresholdMin, layer.thresholdMax);

          let cell = (x + y * this.canvas.width) * 4;

          data[cell] = color[0]; // * value;
          data[cell + 1] = color[1]; // * value;
          data[cell + 2] = color[2]; // * value;
          data[cell + 3] = value === 0 ? 0 : layer.alpha;
        }
      }
      this.ctx2.putImageData(image, 0, 0);

      this.ctx.globalCompositeOperation = this.props.settings.blendMode;
      this.ctx.drawImage(this.canvas2, 0, 0);
    });

    if (this.props.settings.blur === true) {
      this.ctx.filter = 'blur(' + this.props.settings.blurAmmount + 'px)';
    } else {
      this.ctx.filter = 'none';
    }
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    return (
      <div
        className="canvas"
        ref={node => {
          this.node = node;
        }}
      />
    );
  }
}

/////////////////////////////////////
//
// PROP VALIDATION

const { array, object } = PropTypes;

Canvas.propTypes = {
  layers: array.isRequired,
  settings: object.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default Canvas;
