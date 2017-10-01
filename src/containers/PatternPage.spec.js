import React from 'react';
import { shallow } from 'enzyme';

import initialState from '../reducers/initialState';

import { PatternPage } from './PatternPage';
import Editor from '../components/editor';

describe('<PatternPage />', () => {
  const actions = {
    updateSetting: () => {},
    createLayer: () => {},
    updateLayer: () => {},
    deleteLayer: () => {}
  };

  const wrapper = shallow(
    <PatternPage actions={actions} editor={initialState.pattern} />
  );

  it('should contain <Editor />', () => {
    const actual = wrapper.find(Editor).length;
    expect(actual).toEqual(1);
  });
});
