// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Noise } from 'noisejs';

// eslint-disable-next-line import/no-unresolved
import type { Layer, EditorSettings, Editor_LayerUpdate } from 'cam0';

type Props = {
  layers: Array<Layer>,
  settings: EditorSettings,
  onUpdateLayer: (update: Editor_LayerUpdate) => void
};

///////////////////////////////////////////////////////////////////////////////
//
// INTERFACE
//

interface ICanvas {
  layerCache: Array<mixed>;
  node: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: any;
  canvas2: HTMLCanvasElement;
  ctx2: any;
  noise: mixed;
}

///////////////////////////////////////////////////////////////////////////////
//
// IMPLEMENTATION
//

class Canvas extends React.Component<Props> implements ICanvas {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props: Props, context: any) {
    super(props, context);
    this.layerCache = [];
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

  shouldComponentUpdate(nextProps: Props) {
    let drawChanges = !!nextProps.layers.find((layer: Layer) => {
      return layer.draw === true;
    });

    if (drawChanges) {
      this.draw(nextProps);
    }
    return false;
  }

  /////////////////////////////////////
  //
  // PROPERTIES
  layerCache: Array<any>;
  canvas: HTMLCanvasElement;
  ctx: any;
  canvas2: HTMLCanvasElement;
  ctx2: any;
  /////////////////////////////////////
  //
  // CANVAS

  draw(props?: Props) {
    props = props || this.props;

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
    this.ctx.fillStyle = props.settings.backgroundColor;
    this.ctx.fill();
    this.ctx.closePath();

    // LAYERS
    props.layers.forEach((layer: Layer, i: number) => {
      let image;

      // Load layer from cache
      if (layer.draw === false) {
        image = this.layerCache[i];
      } else {
        this.noise.seed(layer.noiseSeed);

        image = this.ctx2.getImageData(
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

        this.layerCache[i] = image;
      }

      this.ctx2.putImageData(image, 0, 0);
      this.ctx.drawImage(this.canvas2, 0, 0);
    });

    this.ctx.globalCompositeOperation = props.settings.blendMode;

    // if (props.settings.blur === true) {
    //   this.ctx.filter = 'blur(' + props.settings.blurAmmount + 'px)';
    // } else {
    //   this.ctx.filter = 'none';
    // }

    this.props.onResetDrawForLayers();
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    console.log('render canvas');
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

Canvas.propTypes = {
  layers: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  onResetDrawForLayers: PropTypes.func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default Canvas;
