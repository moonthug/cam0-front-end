import React from 'react';
import { shallow } from 'enzyme';

import Layer from './Layer';

import defaultLayer from '../../constants/defaults/layer';

describe('<Layer />', () => {
  const layer = defaultLayer;

  const onLayerUpdate = () => {};
  const onLayerRemove = () => {};
  const onLayerDuplicate = () => {};

  const wrapper = shallow(
    <Layer
      layer={layer}
      onLayerUpdate={onLayerUpdate}
      onLayerRemove={onLayerRemove}
      onLayerDuplicate={onLayerDuplicate}
    />
  );

  it('should render', () => {
    const actual = wrapper.find('div.layer').length;
    expect(actual).toEqual(1);
  });
});
