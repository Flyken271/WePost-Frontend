import React from 'react';
import { Jumbotron } from 'reactstrap';

const JumboInfo = (props) => {
  return (
    <div>
      <Jumbotron id="jumboinfo">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">{props.content}</p>
        <hr className="my-2" />
        <p id="jumboRank">{props.rank}</p>
      </Jumbotron>
    </div>
  );
};

export default JumboInfo;