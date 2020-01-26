import React from 'react';
import SettingSideBar from 'Components/SettingsSideBar/SettingsSideBar';
import Visualizer from 'Components/Visualizer/Visualizer';

export const MainPage = () => {
  return (
    <div className="main-page-content">
      <SettingSideBar />
      <Visualizer />
    </div>
  );
};
