import React from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';

describe('<HomePage />', () => {
  const wrapper = shallow(<HomePage />);

  it('should contain <h1>', () => {
    const actual = wrapper.find('h1').length;
    expect(actual).toEqual(1);
  });

});
