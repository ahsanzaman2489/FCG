import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import {
  Container,
  Grid,
  makeStyles,
  CircularProgress
} from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import * as CarDetailActions from "../../actions/CarActions";
import * as CarTasksActions from "../../actions/CarTasksActions";
import CardComponent from "../../components/Card";
import CarStatus from "../../components/CarStatus";
import CarFinancialInfo from "../../components/CarFinancialInfo";
import CarTasks from "../../components/CarTasks";
import CarInformation from "../../components/Carinfo";
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
  },
  spinnerGrid: {
    justifyContent: "center",
    minHeight: 400,
    alignItems: "center"
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
    physicalStatus,
    legalStatus,
    sellingStatus,
    financialDetails,
    id
  } = carDetails;

  const spinnerGrid = (
    <Grid container item xs={12} spacing={3} className={classes.spinnerGrid}>
      <CircularProgress />
    </Grid>
  );

  useEffect(() => {
    fetchCarDetails(match.params.id);
    fetchCarTasks(match.params.id);
  }, [fetchCarDetails, fetchCarTasks, match.params.id]);

  return (
    <Container fixed>
      <Grid container className={classes.grid} spacing={3}>
        {carDetails.loading ? (
          spinnerGrid
        ) : (
          <>
            <h1>
              {make} {model}
            </h1>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={5}>
                <CardComponent>
                  <img className={classes.thumbnail} src={CarImage} alt="Car" />
                </CardComponent>
              </Grid>
              <Grid item xs={3}>
                <CarStatus
                  id={id}
                  physicalStatus={physicalStatus}
                  legalStatus={legalStatus}
                  sellingStatus={sellingStatus}
                  updateCar={updateCar}
                />
              </Grid>
              <Grid item xs={4}>
                {financialDetails && (
                  <CarFinancialInfo financialDetails={financialDetails} />
                )}
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          {carDetails.loading ? (
            spinnerGrid
          ) : (
            <CardComponent>
              <CarInformation />
            </CardComponent>
          )}
        </Grid>
        <Grid item xs={6}>
          {taskDetails.loading ? (
            spinnerGrid
          ) : (
            <CardComponent>
              <CarTasks
                carId={id}
                addTaskAction={addTask}
                updateTaskAction={updateTask}
                taskDetails={taskDetails}
              />
            </CardComponent>
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
