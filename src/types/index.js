// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';

/////////////////////////////////////////////////////////////////////////////////////////
//
// DATA
//

///////////////////////////////////////
//
// STATE

export type State = {
  editor: EditorState
};

//
// Editor

export type EditorState = {
  layers: Array<Layer>,
  settings: editorSettings
};

export type editorSettings = {
  backgroundColor: string,
  blendMode: string,
  blur: boolean,
  blurAmount: number
};

//
// Gallery

export type GalleryState = {
  currentPage: number
};

///////////////////////////////////////
//
// LAYER

export type Layer = {
  id: number,
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

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = ReduxDispatch<Action> & ((action: ThunkAction) => void);

///////////////////////////////////////
//
// ACTIONS

//
// EDITOR

export type Editor_UpdateSetting_Action = {
  type: any,
  update: Editor_SettingUpdate
};

export type Editor_CreateLayer_Action = {
  type: any,
  newLayer: Layer
};

export type Editor_UpdateLayer_Action = {
  type: any,
  update: Editor_LayerUpdate
};

export type Editor_DeleteLayer_Action = {
  type: any,
  layerId: number
};

export type EditorAction =
  | Editor_UpdateSetting_Action
  | Editor_CreateLayer_Action
  | Editor_UpdateLayer_Action
  | Editor_DeleteLayer_Action;

export type Editor_LayerUpdate = {
  layerId: number,
  key: string,
  value: any
};

export type Editor_SettingUpdate = {
  key: string,
  value: any
};

//
// ALL

export type Action = EditorAction;
