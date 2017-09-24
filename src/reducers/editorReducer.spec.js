import * as ActionTypes from '../constants/actionTypes';
import reducer from './editorReducer';

import initialState from './initialState';

describe('Reducers::Editor', () => {

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = initialState.editor;

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle EDITOR_CREATE_LAYER', () => {
    const action = { type: ActionTypes.EDITOR_CREATE_LAYER };
    const expected = {
      layerInc: 1,
      layers: [ { id: 1, tolerance: 50, color: '#FF0000' } ]
    };

    expect(reducer(initialState.editor, action)).toEqual(expected);
  });

  it('should handle EDITOR_UPDATE_LAYER', () => {
    const action = { type: ActionTypes.EDITOR_UPDATE_LAYER, update: { layerId: 1, key: 'tolerance', value: 50 } };
    const state = {
      layerInc: 2,
      layers: [ { id: 1, tolerance: 255, color: '#FF0000' }, { id: 2, tolerance: 255, color: '#FF0000' } ]
    };
    const expected = {
      layerInc: 2,
      layers: [ { id: 1, tolerance: 50, color: '#FF0000' }, { id: 2, tolerance: 255, color: '#FF0000' } ]
    };

    expect(reducer(state, action)).toEqual(expected);
  });
});
