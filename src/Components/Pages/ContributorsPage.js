import React from 'react';
import { contributors } from 'Assets/Data/contributors.json';
import { _ } from 'Utils';

const Card = props => {
  const { title, name, github, about, website } = props;
  return (
    <div className="card">
      <div className="card-name">{name}</div>
      <div className="card-image">
        <img src="https://i.imgur.com/IyxFgGe.png" alt=""></img>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-github">{github}</div>
      <div className="card-about">{about}</div>
      <div className="card-website">{website}</div>
    </div>
  );
};

export const ContributorsPage = () => {
  return (
    <div className="contributors-page">
      <div className="contributors-header">
        <h1>Meet Our Contributors</h1>
      </div>
      {_.map(contributors, (props, index) => (
        <Card key={index} {...props} />
      ))}
    </div>
  );
};
