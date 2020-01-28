import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none"
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className={classes.title}>
          <Typography variant="h6">Home</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
