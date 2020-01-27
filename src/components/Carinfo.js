import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { isEqual } from "lodash";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core";
import * as CarActions from "../actions/CarActions";
import Select from "./formFields/Select";

const useStyles = makeStyles(() => ({
  error: {
    color: "#f44336",
    marginBottom: "10px"
  }
}));

const CarInfo = ({ carInfoDetails, carDetails, actions }) => {
  const classes = useStyles();

  const { fetchMake, fetchModel, fetchTrim, updateCar } = actions;
  const { make, models, trim } = carInfoDetails;

  const [error, setError] = useState(false);
  const previousInfo = useRef();

  const [info, setInfo] = useState({
    make: null,
    model: null,
    trim: null
  });

  useEffect(() => {
    fetchMake(carDetails.make, carDetails.model);
  }, [carDetails.make, carDetails.model, fetchMake]);

  useEffect(() => {
    if (!carDetails.loading) {
      const newInfo = {
        make: carDetails.make,
        model: carDetails.model,
        trim: carDetails.trim
      };
      setInfo(newInfo);
      previousInfo.current = newInfo;
    }
  }, [carDetails]);

  const infoChangeHandler = e => {
    e.preventDefault();

    const { name } = e.target;
    const { value } = e.target;

    switch (name) {
      case "make":
        setInfo({
          ...info,
          [name]: value,
          model: null,
          trim: null
        });
        fetchModel(value);
        break;
      case "model":
        fetchTrim(info.make, value);
        setInfo({
          ...info,
          [name]: value,
          trim: null
        });
        break;
      default:
        setInfo({
          ...info,
          [name]: value
        });
        break;
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    let hasError = false;
    const requiredFields = ["make", "model", "trim"];
    requiredFields.forEach(field => {
      if (!info[field]) {
        setError(true);
        hasError = true;
      }
    });

    if (!hasError && !isEqual(previousInfo.current, info)) {
      setError(false);
      updateCar({
        car: {
          id: carDetails.id,
          ...info
        }
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Status</h2>
      <Select
        name="make"
        label="Make"
        options={make}
        selected={info.make}
        onChange={infoChangeHandler}
      />

      <Select
        name="model"
        label="Model"
        options={models}
        selected={info.model}
        onChange={infoChangeHandler}
      />

      <Select
        name="trim"
        label="Trim"
        options={trim}
        selected={info.trim}
        onChange={infoChangeHandler}
      />
      {error && (
        <FormHelperText className={classes.error}>
          Please select the above fields
        </FormHelperText>
      )}
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
    </form>
  );
};

CarInfo.propTypes = {
  carInfoDetails: PropTypes.instanceOf(Object).isRequired,
  carDetails: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => {
  return {
    carInfoDetails: state.CarInfoReducer,
    carDetails: state.CarReducer
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CarActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo);
