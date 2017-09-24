import React from 'react';
import { shallow } from 'enzyme';

import initialState from '../reducers/initialState';

import { EditorPage } from './EditorPage';
import Editor from '../components/editor';

describe('<EditorPage />', () => {

  const actions = {
    updateSetting: () => { },
    createLayer: () => { },
    updateLayer: () => { },
    deleteLayer: () => { },
  };

  const wrapper = shallow(<EditorPage actions={actions} editor={initialState.editor}/>);


  it('should contain <h1>', () => {
    const actual = wrapper.find('h1').length;
    expect(actual).toEqual(1);
  });

  it('should contain <Editor />', () => {
    const actual = wrapper.find(Editor).length;
    expect(actual).toEqual(1);
  });
});
