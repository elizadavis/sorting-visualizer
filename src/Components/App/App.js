import React from 'react';
import './App.css';
import Visualizer from '../Visualizer/Visualizer';
import SettingSideBar from '../SettingsSideBar/SettingsSideBar';

function App() {
  return (
    <div className="App">
      <SettingSideBar id="settings-side-bar">
        <Visualizer id="visualizer" />
      </SettingSideBar>
    </div>
  );
}

export default App;
