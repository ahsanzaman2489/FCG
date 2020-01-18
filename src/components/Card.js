import React from "react";
import { Card, CardContent } from "@material-ui/core";
import PropTypes from "prop-types";

const CardComponent = ({ children }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardComponent;
