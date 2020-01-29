import React, { lazy, Suspense, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Container, Grid, makeStyles } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as CarDetailActions from "../../actions/CarActions";
import * as CarTasksActions from "../../actions/CarTasksActions";

import CarImage from "../../images/altroz.jpg";
import Fallback from "../../components/Fallback";
import Spinner from "../../components/Spinner";

const CardComponent = lazy(() => import("../../components/Card"));
const CarStatus = lazy(() => import("../../components/CarStatus"));
const CarFinancialInfo = lazy(() =>
  import("../../components/CarFinancialInfo")
);
const CarTasks = lazy(() => import("../../components/CarTasks"));
const CarInformation = lazy(() => import("../../components/Carinfo"));

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
  },
  notFound: {
    textAlign: "center",
    marginTop: 50
  }
});

const CarDetail = ({ actions, carDetails, taskDetails, match }) => {
  const classes = useStyles();
  const {
    fetchCarDetails,
    updateCar,
    fetchCarTasks,
    addTask,
    updateTask
  } = actions;

  const {
    make,
    model,
    trim,
    physicalStatus,
    legalStatus,
    sellingStatus,
    id,
    financialDetails,
    engineType
  } = carDetails;

  useEffect(() => {
    fetchCarDetails(match.params.id, carId => fetchCarTasks(carId));
  }, []);

  if (!carDetails.id && !carDetails.loading) {
    return (
      <div className={classes.notFound}>
        <h2>Oppps car not found ...!!!</h2>
      </div>
    );
  }
  return (
    <Container fixed>
      <Grid container className={classes.grid} spacing={3}>
        {carDetails.loading ? (
          <Spinner />
        ) : (
          <>
            <h1>
              {make} {model} {trim}
            </h1>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={5}>
                <Suspense fallback={<Fallback />}>
                  <CardComponent>
                    <img
                      className={classes.thumbnail}
                      src={CarImage}
                      alt="Car"
                    />
                  </CardComponent>
                </Suspense>
              </Grid>
              <Grid item xs={3}>
                <Suspense fallback={<Fallback />}>
                  <CarStatus
                    id={id}
                    physicalStatus={physicalStatus}
                    legalStatus={legalStatus}
                    sellingStatus={sellingStatus}
                    updateCar={updateCar}
                  />
                </Suspense>
              </Grid>
              <Grid item xs={4}>
                <Suspense fallback={<Fallback />}>
                  <CarFinancialInfo financialDetails={financialDetails} />
                </Suspense>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          <Suspense fallback={<Fallback />}>
            <CarInformation
              carId={id}
              carMake={make}
              carModel={model}
              carTrim={trim}
              carEngineType={engineType}
            />
          </Suspense>
        </Grid>
        <Grid item xs={6}>
          {!id || taskDetails.loading ? (
            <Spinner />
          ) : (
            <Suspense fallback={<Fallback />}>
              <CardComponent>
                <CarTasks
                  carId={id}
                  addTaskAction={addTask}
                  updateTaskAction={updateTask}
                  taskDetails={taskDetails}
                />
              </CardComponent>
            </Suspense>
          )}
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

CarDetail.propTypes = {
  actions: PropTypes.instanceOf(Object).isRequired,
  carDetails: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  taskDetails: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({
  carDetails: state.CarReducer,
  taskDetails: state.TaskReducer
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { ...CarDetailActions, ...CarTasksActions },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);
