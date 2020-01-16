import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  Button,
  CardMedia,
  Container,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import * as actionCreators from "../../actions";
import CardComponent from "../../components/Card";
import CarImage from "../../images/altroz.jpg";

const useStyles = makeStyles({
  grid: {
    flexDirection: "row"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const CarDetail = ({ actions, carDetails, match }) => {
  const classes = useStyles();

  useEffect(() => {
    const { fetchCarDetails } = actions;
    fetchCarDetails(match.params.id);
  }, [actions, match.params.id]);

  return (
    <Container fixed>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item xs={12}>
          <CardComponent>
            <img className={classes.media} src={CarImage} alt="Car Image" />
          </CardComponent>
        </Grid>
        <Grid item xs={6}>
          <CardComponent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
          </CardComponent>
        </Grid>
        <Grid item xs={6}>
          <CardComponent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
          </CardComponent>
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = state => {
  return { carDetails: state.CarReducer };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actionCreators, dispatch) };
};
export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);
