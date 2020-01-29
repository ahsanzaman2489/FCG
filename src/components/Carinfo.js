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
import Spinner from "./Spinner";
import CardComponent from "./Card";

const useStyles = makeStyles(() => ({
  error: {
    color: "#f44336",
    marginBottom: "10px"
  }
}));

const CarInfo = ({
  carInfoDetails,
  carId,
  carMake,
  carModel,
  carTrim,
  actions,
  carEngineType
}) => {
  const classes = useStyles();

  const { fetchMake, fetchModel, fetchTrim, updateCar } = actions;
  const { make, models, loading, trim } = carInfoDetails;

  const [error, setError] = useState(false);
  const previousCarId = useRef();
  const previousInfo = useRef();

  const [info, setInfo] = useState({
    make: null,
    model: null,
    trim: null,
    engineType: null
  });

  useEffect(() => {
    if (!isEqual(previousCarId.current, carId) && carId !== "") {
      fetchMake(carMake, carModel);
      const newInfo = {
        make: carMake,
        model: carModel,
        trim: carTrim,
        engineType: carEngineType
      };

      setInfo(newInfo);
      previousInfo.current = newInfo;
      previousCarId.current = carId;
    }
  }, [carId]);

  const engineTypeOptions = [
    { label: "VEE", value: "VEE" },
    { label: "INLINE", value: "INLINE" },
    { label: "BOXER", value: "BOXER" },
    { label: "ROTARY", value: "ROTARY" }
  ];

  const infoChangeHandler = e => {
    e.preventDefault();

    const { name } = e.target;
    const { value } = e.target;

    if (info[name] === value) {
      return;
    }

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
      previousInfo.current = info;
      updateCar({
        car: {
          id: carId,
          ...info
        }
      });
    }
  };

  return (
    <>
      {!carId || loading ? (
        <Spinner />
      ) : (
        <CardComponent>
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

            <Select
              name="engineType"
              label="Engine Type"
              options={engineTypeOptions}
              selected={info.engineType}
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
        </CardComponent>
      )}
    </>
  );
};

CarInfo.propTypes = {
  carInfoDetails: PropTypes.instanceOf(Object).isRequired,
  actions: PropTypes.instanceOf(Object).isRequired,
  carId: PropTypes.string,
  carMake: PropTypes.string,
  carModel: PropTypes.string,
  carTrim: PropTypes.string,
  carEngineType: PropTypes.string
};

CarInfo.defaultProps = {
  carId: "",
  carMake: "",
  carModel: "",
  carTrim: "",
  carEngineType: ""
};

const mapStateToProps = state => {
  return {
    carInfoDetails: state.CarInfoReducer
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(CarActions, dispatch)
});

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(CarInfo)
);
