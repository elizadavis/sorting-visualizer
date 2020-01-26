import React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import { SETTINGS_ACTIONS } from 'Actions/actions';
import { GenerateCustomSlider } from 'Components/CustomSlider/CustomSlider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCog } from '@fortawesome/free-solid-svg-icons';

class SettingsSideBar extends React.Component {
  render() {
    const {
      delay,
      size,
      updateDelay,
      updateSize,
      toggleShowValues,
      showValues,
    } = this.props;

    return (
      <div className="sidebar">
        <h3>Settings</h3>
        <GenerateCustomSlider
          attribute="delay"
          handleAfterChange={updateDelay}
          max={600}
          min={5}
          text="Delay in milliseconds:"
          value={delay}
          step={5}
        />
        <GenerateCustomSlider
          attribute="size"
          handleAfterChange={updateSize}
          max={100}
          min={5}
          text="Columns for next Generate New Values:"
          value={size}
        />
        <label>
          <span>Toggle Values</span>
          <Switch
            className="react-switch"
            onChange={toggleShowValues}
            checked={showValues}
          />
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { settings } = state;
  const { delay, size, showValues } = settings;
  return {
    delay,
    size,
    showValues,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSize: size => {
      dispatch({ type: SETTINGS_ACTIONS.UPDATE_SIZE, payload: size });
    },
    updateDelay: delay => {
      dispatch({ type: SETTINGS_ACTIONS.UPDATE_DELAY, payload: delay });
    },
    toggleShowValues: () => {
      dispatch({ type: SETTINGS_ACTIONS.TOGGLE_SHOW_VALUES });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSideBar);
