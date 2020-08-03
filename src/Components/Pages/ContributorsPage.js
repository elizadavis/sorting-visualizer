import React from 'react';
import { contributors } from 'Assets/Data/contributors.json';
import { _ } from 'Utils';

const Card = props => {
  const { title, name, github, about, website } = props;
  return (
    <div className="card border-0">
      <div className="card-image my-2">
        <img src="https://i.imgur.com/IyxFgGe.png" alt="" className="w-25 rounded-circle"></img>
      </div>
      <div className="card-name"><h4>{name}</h4></div>
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
        <h1 className="mt-2">Meet Our Contributors</h1>
        <p className="col-5 mx-auto">Thank you for using Sorting Visualizer. It takes a village of three so far and these
          are our members. If you would like to contact us directly, our information is below. We hope
          to add new features soon.
        </p>
      </div>
      <hr className="w-75" />
      <div className="card-group">
        {_.map(contributors, (props, index) => (
          <Card key={index} {...props} />
        ))}
      </div>
    </div>
  );
};
