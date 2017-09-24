import React from 'react';
import { shallow } from 'enzyme';

import Layer from './Layer';

describe('<Layer />', () => {

  const layer = {
    id: 1,
    color: '#FF0000',
    tolerance:  50
  };
  const onLayerUpdate = () => { };
  const onLayerRemove = () => { };

  const wrapper = shallow(<Layer layer={layer} onLayerUpdate={onLayerUpdate} onLayerRemove={onLayerRemove}/>);

  it('should contain <input name="color">', () => {
    const actual = wrapper.find('input[name="color"]').length;
    expect(actual).toEqual(1);
  });

  it('should contain <input name="tolerance">', () => {
    const actual = wrapper.find('input[name="tolerance"]').length;
    expect(actual).toEqual(1);
  });

});
