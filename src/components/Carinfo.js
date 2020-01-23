import React from "react";
import {Field, reduxForm} from "redux-form";
import PropTypes from "prop-types";
import Select from "./formFields/Select";

const CarInfo = ({id, make = [], model = [], trim = [], carDetails}) => {


    const statusChangeHandler = (e) => {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;

    };

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

CarInfo.propTypes = {
    physicalStatus: PropTypes.string,
    legalStatus: PropTypes.string,
    sellingStatus: PropTypes.string
};
CarInfo.defaultProps = {
    physicalStatus: null,
    legalStatus: null,
    sellingStatus: null
};

export default reduxForm({
    // a unique name for the form
    form: "info"
})(CarInfo);
