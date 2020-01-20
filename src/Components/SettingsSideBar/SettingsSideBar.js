import React from 'react';
import Sidebar from 'react-sidebar';
import { connect } from 'react-redux';
// import _ from 'lodash';
import './SettingsSideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { GenerateCustomSlider } from '../CustomSlider/CustomSlider';
import { SETTINGS_ACTIONS } from '../../Actions/actions';

const SidebarContent = ({
  delay,
  size,
  updateSize,
  updateDelay,
  toggleIsValueVisible,
}) => (
  <div>
    <h1>Settings</h1>
    <GenerateCustomSlider
      attribute="delay"
      handleAfterChange={updateDelay}
      max={1000}
      min={5}
      text="Select sorting delay in milliseconds"
      value={delay}
    />
    <GenerateCustomSlider
      attribute="size"
      handleAfterChange={updateSize}
      max={100}
      min={5}
      text="Select number of columns for next new array"
      value={size}
    />
    <button onClick={toggleIsValueVisible}>Toggle Values</button>
  </div>
);

class SettingsSideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onToggleSideBar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const {
      delay,
      size,
      updateDelay,
      updateSize,
      toggleIsValueVisible,
    } = this.props;

    return (
      <Sidebar
        sidebar={
          <SidebarContent
            delay={delay}
            size={size}
            updateDelay={updateDelay}
            updateSize={updateSize}
            toggleIsValueVisible={toggleIsValueVisible}
          />
        }
        open={isOpen}
        onSetOpen={this.onToggleSideBar}
        styles={{ sidebar: { background: 'white' } }}
      >
        <div className="header">
          <button onClick={this.onToggleSideBar}>
            <FontAwesomeIcon icon={faCog} />
          </button>
        </div>
        {this.props.children}
      </Sidebar>
    );
  }
}

const mapStateToProps = state => {
  const { settings } = state;
  return {
    delay: settings.delay,
    size: settings.size,
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
    toggleIsValueVisible: () => {
      dispatch({ type: SETTINGS_ACTIONS.TOGGLE_IS_VALUE_VISIBLE });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsSideBar);
