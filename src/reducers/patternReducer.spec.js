import * as ActionTypes from '../constants/actionTypes';
import reducer from './patternReducer';

import initialState from './initialState';

import defaultEditorSettings from '../constants/defaults/patternSettings';
// import defaultLayer from '../constants/defaults/layer';

describe('Reducers::Editor', () => {
  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState.pattern;

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle PATTERN_UPDATE_SETTING', () => {
    const action = {
      type: ActionTypes.PATTERN_UPDATE_SETTING,
      key: 'backgroundColor',
      value: '#FFCC00'
    };
    const state = {
      settings: defaultEditorSettings
    };
    const expected = {
      settings: { ...defaultEditorSettings, backgroundColor: '#FFCC00' }
    };

    expect(reducer(state, action).settings).toEqual(expected.settings);
  });

  // it('should handle PATTERN_CREATE_LAYER', () => {
  //   const action = { type: ActionTypes.PATTERN_CREATE_LAYER };
  //   const expected = {
  //     layerInc: 1,
  //     layers: [ {...defaultLayer, noiseSeed: 0 }]
  //   };
  //
  //   expect(reducer(initialState.pattern, action).layers).toEqual(expected.layers);
  //   expect(reducer(initialState.pattern, action).layerInc).toEqual(expected.layerInc);
  // });

  it('should handle PATTERN_UPDATE_LAYER', () => {
    const action = {
      type: ActionTypes.PATTERN_UPDATE_LAYER,
      layerId: 1,
      key: 'tolerance',
      value: 50
    };
    const state = {
      layerInc: 2,
      layers: [
        { id: 1, tolerance: 255, color: '#FF0000' },
        { id: 2, tolerance: 255, color: '#FF0000' }
      ]
    };
    const expected = {
      layerInc: 2,
      layers: [
        { id: 1, tolerance: 50, color: '#FF0000' },
        { id: 2, tolerance: 255, color: '#FF0000' }
      ]
    };

    expect(reducer(state, action).layers).toEqual(expected.layers);
    expect(reducer(state, action).layerInc).toEqual(expected.layerInc);
  });
});
