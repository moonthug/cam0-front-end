import React from 'react';
import PropTypes from 'prop-types';

import { SketchPicker } from 'react-color';

import '../../../styles/component/colorpicker.scss';

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = color => {
    this.setState({ color: color.hex });
    this.props.onChangeComplete(null, { name: 'color', value: color.hex });
  };

  render() {
    return (
      <div className="colorpicker">
        <div
          className="swatch"
          onClick={this.handleClick}
          style={{ background: this.props.color }}
        >
          <div className="color" />
        </div>
        {this.state.displayColorPicker ? (
          <div className="popover">
            <div className="cover" onClick={this.handleClose} />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
/////////////////////////////////////
//
// PROP VALIDATION

const { func, string } = PropTypes;

ColorPicker.propTypes = {
  color: string.isRequired,
  onChangeComplete: func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default ColorPicker;
