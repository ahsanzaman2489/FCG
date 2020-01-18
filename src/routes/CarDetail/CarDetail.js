import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Grid, Typography, makeStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import * as actionCreators from "../../actions";
import CardComponent from "../../components/Card";
import CarStatus from "../../components/CarStatus";
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
  },
  thumbnail: {
    maxWidth: "100%"
  }
});

const CarDetail = ({ actions, carDetails, match }) => {
  const classes = useStyles();
  // console.log(carDetails);

  const { physicalStatus, legalStatus, sellingStatus } = carDetails;

  useEffect(() => {
    const { fetchCarDetails } = actions;
    fetchCarDetails(match.params.id);
  }, [actions, match.params.id]);

  return (
    <Container fixed>
      <Grid container className={classes.grid} spacing={3}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={5}>
            <CardComponent>
              <img className={classes.thumbnail} src={CarImage} alt="Car" />
            </CardComponent>
          </Grid>
          <Grid item xs={3}>
            <CarStatus
              physicalStatus={physicalStatus}
              legalStatus={legalStatus}
              sellingStatus={sellingStatus}
            />
          </Grid>
          <Grid item xs={4}>
            a
          </Grid>
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
      <ToastContainer />
    </Container>
  );
};

CarDetail.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  carDetails: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({ carDetails: state.CarReducer });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);
