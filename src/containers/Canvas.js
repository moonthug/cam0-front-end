import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Noise } from 'noisejs';

import * as actions from '../actions/patternActions';

///////////////////////////////////////////////////////////////////////////////
//
// IMPLEMENTATION
//

class Canvas extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
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
    let layerCount = 1 + Math.floor(Math.random() * 3);
    this.props.actions.createLayers(layerCount);
    this.node.appendChild(this.canvas);
  }

  shouldComponentUpdate(nextProps) {
    if (
      !nextProps.pattern.layers ||
      !Array.isArray(nextProps.pattern.layers) ||
      nextProps.pattern.layers.length === 0
    )
      return false;

    // Check layers have updated
    if (this.layerCache.length !== nextProps.pattern.layers.length) {
    }

    // Search for changes
    let drawChanges = !!nextProps.pattern.layers.find((layer: Layer) => {
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

  // actions: mixed;
  // layerCache: Array<any>;
  // node: HTMLElement;
  // canvas: HTMLCanvasElement;
  // ctx: any;
  // canvas2: HTMLCanvasElement;
  // ctx2: any;
  // noise: any;

  /////////////////////////////////////
  //
  // CANVAS

  // TODO Use d3 renderer
  draw(props = null) {
    let redraw = !props;

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
    this.ctx.fillStyle = props.pattern.settings.backgroundColor;
    this.ctx.fill();
    this.ctx.closePath();

    // LAYERS
    props.pattern.layers.forEach((layer: Layer, i: number) => {
      let image;

      // Load layer from cache
      if (redraw === false && layer.draw === false) {
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
      this.ctx.drawImage(this.canvas2, 0.333, 0.333);
    });

    this.ctx.globalCompositeOperation = props.pattern.settings.blendMode;

    // if (props.pattern.settings.blur === true) {
    //   this.ctx.filter = 'blur(' + props.pattern.settings.blurAmmount + 'px)';
    // } else {
    //   this.ctx.filter = 'none';
    // }

    this.props.actions.resetDrawForLayers();
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

Canvas.propTypes = {
  actions: PropTypes.object.isRequired,
  pattern: PropTypes.object.isRequired
};

/////////////////////////////////////
//
// REDUX

function mapStateToProps(state) {
  return {
    pattern: state.pattern
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

/////////////////////////////////////
//
// EXPORT

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
