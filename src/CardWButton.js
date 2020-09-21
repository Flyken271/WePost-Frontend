import React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardWButton = (props) => {
  return (
    <div>
      <Card id="serverStats">
        <CardBody>
          <CardTitle id="cardTitle">{props.title}</CardTitle>
          <CardSubtitle>{props.subTitle}</CardSubtitle>
          <CardText>{props.desc}</CardText>
          <Button href={props.link}>{props.button}</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardWButton;