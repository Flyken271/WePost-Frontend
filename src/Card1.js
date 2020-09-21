import React from "react";
import { Card, CardText, CardBody, CardTitle, Badge, Button } from "reactstrap";

const Card1 = ({
  bodyStyle,
  title,
  content,
  link,
  bcolor,
  btext,
  date,
  listcolor,
  listtext,
  onClaim,
  claim,
  disable,
}) => {
  return (
    <div>
      <a href={link}>
        <Card id="serverStats">
          <CardBody style={bodyStyle}>
            <CardTitle id="cardTitle">
              {title}
              <Badge id="postBadge" color={bcolor}>
                {btext}
              </Badge>
              <Badge id="postBadge" color={listcolor}>
                {listtext}
              </Badge>
            </CardTitle>
            <CardText>{content}</CardText>
            <Button disabled={disable} onClick={onClaim} color="success">
              {claim}
            </Button>
          </CardBody>
        </Card>
      </a>
    </div>
  );
};

export default Card1;
