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
      <Card id="serverStats">
        <CardBody style={bodyStyle}>
          <CardTitle id="cardTitle">
            <a href={link}>
              {title}
              <Badge id="postBadge" color={bcolor}>
                {btext}
              </Badge>
              <Badge id="postBadge" color={listcolor}>
                {listtext}
              </Badge>
            </a>
          </CardTitle>
          <CardText>{content}</CardText>
          <Button disabled={disable} onClick={onClaim} color="success">
            {claim}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Card1;
