import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './editorActions';

import MockDate from 'mockdate';

describe('Actions', () => {
  afterAll(() => MockDate.reset());

  it('should create an action to update a setting', () => {
    const dispatch = jest.fn();
    const update = { key: 'backgroundColor', value: '#FF0000' };
    const expected = {
      type: ActionTypes.EDITOR_UPDATE_SETTING,
      update
    };

    expect(typeof (ActionCreators.updateSetting(update))).toEqual('function');
    ActionCreators.updateSetting(update)(dispatch);

    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to create a layer', () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.EDITOR_CREATE_LAYER,
    };

    expect(typeof (ActionCreators.createLayer())).toEqual('function');
    ActionCreators.createLayer()(dispatch);

    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to update a layer', () => {
    const dispatch = jest.fn();
    const update = { id: 0, key: 'tolerance', value: 50 };
    const expected = {
      type: ActionTypes.EDITOR_UPDATE_LAYER,
      update
    };

    expect(typeof (ActionCreators.updateLayer(update))).toEqual('function');
    ActionCreators.updateLayer(update)(dispatch);

    expect(dispatch).toBeCalledWith(expected);
  });

  it('should create an action to delete a layer', () => {
    const dispatch = jest.fn();
    const layerId = 1;
    const expected = {
      type: ActionTypes.EDITOR_DELETE_LAYER,
      layerId
    };

    expect(typeof (ActionCreators.deleteLayer(layerId))).toEqual('function');
    ActionCreators.deleteLayer(layerId)(dispatch);

    expect(dispatch).toBeCalledWith(expected);
  });
});
