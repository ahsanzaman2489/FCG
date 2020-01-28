import React from "react";
import { CircularProgress, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  spinnerGrid: {
    justifyContent: "center",
    minHeight: 400,
    alignItems: "center"
  }
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <Grid container item xs={12} spacing={3} className={classes.spinnerGrid}>
      <CircularProgress />
    </Grid>
  );
};

export default Spinner;
