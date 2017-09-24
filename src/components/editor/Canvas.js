import React from 'react';
import PropTypes from 'prop-types';

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
    this.canvas.setAttribute('width', 800);
    this.canvas.setAttribute('height', 400);
    this.ctx = this.canvas.getContext('2d');
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
    this.ctx.clearRect(0, 0, 600, 600);

    this.props.layers.forEach((layer, i) => {
      this.ctx.beginPath();
      this.ctx.rect(50 * i, layer.tolerance, 40, 40);
      this.ctx.strokeStyle = layer.color;
      this.ctx.stroke();
      this.ctx.closePath();
    });

  }


  /////////////////////////////////////
  //
  // RENDER

  render() {
    return (
      <div
        className="canvas"
        ref={(node) => {
          this.node = node;
        }}
      />
    );
  }
}


/////////////////////////////////////
//
// PROP VALIDATION

const { array } = PropTypes;

Canvas.propTypes = {
  layers: array.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Canvas;
