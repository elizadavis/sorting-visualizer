import React from 'react';
import './App.css';
import Visualizer from '../Visualizer/Visualizer';
import SettingSideBar from '../SettingsSideBar/SettingsSideBar';

function App() {
  return (
    <div className="app">
      <SettingSideBar>
        <Visualizer />
      </SettingSideBar>
    </div>
  );
}

export default App;
