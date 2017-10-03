// @flow

// eslint-disable-next-line import/named
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

import * as actions from './src/constants/actionTypes';

declare module 'cam0' {
  /////////////////////////////////////////////////////////////////////////////////////////
  //
  // DATA
  //

  ///////////////////////////////////////
  //
  // STATE

  declare type State = {
    pattern: Pattern
  };

  //
  // Editor

  declare type Pattern = {
    id: string,
    author: string,
    layers: Array<Layer>,
    settings: PatternSettings
  };

  declare type PatternSettings = {
    backgroundColor: string,
    blendMode: string,
    blur: boolean,
    blurAmount: number
  };

  //
  // Gallery

  ///////////////////////////////////////
  //
  // LAYER

  declare type Layer = {
    id: number,
    draw: boolean,
    noiseSeed: number,
    color: string,
    alpha: number,
    thresholdMin: number,
    thresholdMax: number,
    blendMode: string,
    frequency: number,
    amplitude: number
  };

  /////////////////////////////////////////////////////////////////////////////////////////
  //
  // REDUX
  //

  declare type Store = ReduxStore<State, Action>;

  declare type GetState = () => State;
  declare type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
  declare type Dispatch = ReduxDispatch<Action> &
    ((action: ThunkAction) => void);

  ///////////////////////////////////////
  //
  // ACTIONS

  declare type BasicAction = {
    type: string
  };

  //
  // EDITOR

  declare type Pattern_SetLayer_Action = {
    type: actions.PATTERN_SET_PATTERN,
    pattern: Pattern
  };

  declare type Pattern_UpdateSetting_Action = {
    type: actions.PATTERN_UPDATE_SETTING,
    ...Pattern_SettingUpdate
  };

  declare type Pattern_CreateLayer_Action = {
    type: actions.PATTERN_CREATE_LAYER,
    newLayer: Layer
  };

  declare type Pattern_CreateLayers_Action = {
    type: actions.PATTERN_CREATE_LAYERS,
    newLayers: Array<Layer>
  };

  declare type Pattern_UpdateLayer_Action = {
    type: actions.PATTERN_UPDATE_LAYER,
    ...Pattern_LayerUpdate
  };

  declare type Pattern_DeleteLayer_Action = {
    type: actions.PATTERN_UPDATE_SETTING,
    layerId: number
  };

  declare type PatternAction =
    | Pattern_UpdateSetting_Action
    | Pattern_CreateLayer_Action
    | Pattern_CreateLayers_Action
    | Pattern_UpdateLayer_Action
    | Pattern_DeleteLayer_Action;

  declare type Pattern_LayerUpdate = {
    layerId: number,
    key: string,
    value: any,
    draw?: boolean
  };

  declare type Pattern_SettingUpdate = {
    key: string,
    value: any
  };

  //
  // ALL

  declare type Action = BasicAction | PatternAction;
}
