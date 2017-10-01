import React from 'react';
import { shallow } from 'enzyme';

import Settings from './Settings';

import defaultEditorSettings from '../../constants/defaults/patternSettings';

describe('<Settings />', () => {
  const settings = defaultEditorSettings;
  const onSettingsUpdateSetting = () => {};

  const wrapper = shallow(
    <Settings
      settings={settings}
      onSettingsUpdateSetting={onSettingsUpdateSetting}
    />
  );

  it('should render', () => {
    const actual = wrapper.find('div.settings').length;
    expect(actual).toEqual(1);
  });
});
