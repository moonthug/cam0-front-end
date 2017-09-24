import React from 'react';
import { shallow } from 'enzyme';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  const wrapper = shallow(<NotFoundPage />);

  it('should contain <h1>', () => {
    const actual = wrapper.find('h1').length;
    expect(actual).toEqual(1);
  });

});
