import React, {useEffect} from "react";
import {Field, reduxForm} from "redux-form";
import PropTypes from "prop-types";
import Select from "./formFields/Select";
import {bindActionCreators} from "redux";
import * as CarDetailActions from "../actions/CarActions";
import * as CarTasksActions from "../actions/CarTasksActions";
import {connect} from "react-redux";

const CarInfo = ({}) => {


    const statusChangeHandler = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

    };

    useEffect(()=>{
        fetchMake()
    },[]);

    return (
        <form>
            <h2>Status</h2>
            <Field
                name={'make'}
                component={Select}
                label={'Make'}
                options={make}
                // selected={physicalStatus}
                onChange={statusChangeHandler}
            />

            <Field
                name={"model"}
                component={Select}
                label={"Select"}
                options={model}
                // selected={legalStatus}
                onChange={statusChangeHandler}
            />

            <Field
                name={"trim"}
                component={Select}
                label={'Trim'}
                options={trim}
                // selected={sellingStatus}
                onChange={statusChangeHandler}
            />
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


const mapStateToProps = state => ({
    carDetails: state.CarReducer,
    taskDetails: state.TaskReducer
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {...CarDetailActions, ...CarTasksActions},
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: "info"
})(CarInfo));
