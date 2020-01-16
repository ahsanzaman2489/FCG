import { Card, CardContent } from "@material-ui/core";
import React from "react";

const CardComponent = ({ children }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
