import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './editorActions';

import MockDate from 'mockdate';

describe('Actions', () => {
  afterAll(() => MockDate.reset());

  it('should create an action to create a layer', () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.EDITOR_CREATE_LAYER,
    };

    expect(typeof (ActionCreators.createLayer())).toEqual('function');

    ActionCreators.createLayer()(dispatch);

    expect(dispatch).toBeCalledWith(expected);
  });

  // it('should create an action to calculate fuel savings', () => {
  //   const fieldName = 'newMpg';
  //   const value = 100;
  //   const actual = ActionCreators.calculateFuelSavings(appState, fieldName, value);
  //   const expected = {
  //     type: ActionTypes.CALCULATE_FUEL_SAVINGS,
  //     dateModified,
  //     settings: appState,
  //     fieldName,
  //     value
  //   };
  //
  //   expect(actual).toEqual(expected); // Notice use of deep because it's a nested object
  //   // expect(actual).to.equal(expected); // Fails. Not deeply equal
  // });
});
