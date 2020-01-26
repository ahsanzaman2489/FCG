import React, {useEffect, useState} from "react";
import {Field, reduxForm} from "redux-form";
import PropTypes from "prop-types";
import Select from "./formFields/Select";
import {bindActionCreators} from "redux";
import * as CarActions from "../actions/CarActions";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import CarReducer from "../reducers/CarReducer";

const validate = values => {
    console.log(values)
    const errors = {};
    const requiredFields = ["make","model", "trim"];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = "Required";
        }
    });
    return errors;
};

const CarInfo = ({carInfoDetails, carDetails, actions, handleSubmit, ...props}) => {

    const {fetchMake, fetchModel, fetchTrim, updateCar} = actions;

    const [info, setInfo] = useState({
        make: null,
        model: null,
        trim: null,
    });

    console.log(props)

    useEffect(() => {
        fetchMake(carDetails.make, carDetails.model);
    }, []);
    useEffect(() => {
        if (!carDetails.loading) {
            setInfo({
                make: carDetails.make,
                model: carDetails.model,
                trim: carDetails.trim,
            })
        }
    }, [carDetails]);

    const {make, models, trim} = carInfoDetails;

    // useEffect(() => {
    //     console.log(make,models,trim);
    // }, [make]);
    //
    // useEffect(() => {
    //     console.log(make,models,trim);
    // }, [models]);
    //
    // useEffect(() => {
    //     console.log(make,models,trim);
    // }, [trim]);

    const infoChangeHandler = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'make':
                setInfo({
                    ...info,
                    [name]: value,
                    model: null,
                    trim: null
                });
                // fetchModel(value);
                break;
            case 'model':
                // fetchTrim(info.make, value);
                setInfo({
                    ...info,
                    [name]: value,
                    trim: null
                });
                break;
            default:
                setInfo({
                    ...info,
                    [name]: value,
                });
                break;
        }
    };

    const submitHandler = (values) => {
        updateCar({
            car: {
                id: carDetails.id,
                ...values
            }
        });
        console.log(values)
    };


    // console.log(props)
    return (
        <form onSubmit={handleSubmit(submitHandler)} initialvalues={{make: "AUDI"}}>
            <h2>Status</h2>
            <Field
                name={'make'}
                component={Select}
                label={'Make'}
                options={make}
                selected={info.make}
                onChange={infoChangeHandler}
            />

            <Field
                name={"model"}
                component={Select}
                label={"Model"}
                options={models}
                selected={info.model}
                onChange={infoChangeHandler}
            />

            <Field
                name={"trim"}
                component={Select}
                label={'Trim'}
                options={trim}
                selected={info.trim}
                onChange={infoChangeHandler}
            />

            <Button variant="contained" color="primary" type={'submit'}>
                Update
            </Button>
        </form>
    );
};

// CarInfo.propTypes = {
//     physicalStatus: PropTypes.string,
//     legalStatus: PropTypes.string,
//     sellingStatus: PropTypes.string
// };
// CarInfo.defaultProps = {
//     physicalStatus: null,
//     legalStatus: null,
//     sellingStatus: null
// };


const mapStateToProps = state => {
    return {
        carInfoDetails: state.CarInfoReducer,
        carDetails: state.CarReducer,
        // initialValues:{
        //     make:state.CarReducer.make,
        //     model:state.CarReducer.model,
        //     trim:state.CarReducer.trim,
        // }
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        CarActions,
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "info",
    validate,
    onChange: (value, dis, props) => {
        console.log(value, dis, props)
    }
    // enableReinitialize:true
})(CarInfo));
