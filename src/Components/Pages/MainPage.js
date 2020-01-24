import React from 'react';
import Visualizer from '../Visualizer/Visualizer';
import SettingSideBar from '../SettingsSideBar/SettingsSideBar';
import './MainPage.scss';

export const MainPage = () => {
  return (
    <div className="main-page-content">
      <SettingSideBar />
      <Visualizer />
    </div>
  );
};
