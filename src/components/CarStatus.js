import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import Select from "./formFields/Select";

const CarStatus = ({ physicalStatus, legalStatus, sellingStatus }) => {
  const physicalStatusField = {
    label: "physical status",
    name: "physicalStatus",
    options: [
      { label: "at owner", value: "AT_OWNER" },
      { label: "at buyer", value: "AT_BUYER" },
      { label: "at our location", value: "AT_OUR_LOCATION" }
    ]
  };

  const legalStatusField = {
    label: "legal status",
    name: "legalStatus",
    options: [
      { label: "owner", value: "OWNER" },
      { label: "us", value: "US" },
      { label: "buyer", value: "BUYER" }
    ]
  };

  const SellingStatusField = {
    label: "selling status",
    name: "SellingStatus",
    options: [
      { label: "available", value: "AVAILABLE" },
      { label: "pending", value: "PENDING" },
      { label: "sold", value: "SOLD" },
      { label: "reserved", value: "RESERVED" }
    ]
  };

  return (
    <>
      <h2>Status</h2>
      <Field
        name={physicalStatusField.name}
        component={Select}
        label={physicalStatusField.label}
        options={physicalStatusField.options}
        selected={physicalStatus}
      />

      <Field
        name={legalStatusField.name}
        component={Select}
        label={legalStatusField.label}
        options={legalStatusField.options}
        selected={legalStatus}
      />

      <Field
        name={SellingStatusField.name}
        component={Select}
        label={SellingStatusField.label}
        options={SellingStatusField.options}
        selected={sellingStatus}
      />
    </>
  );
};

CarStatus.propTypes = {
  physicalStatus: PropTypes.string,
  legalStatus: PropTypes.string,
  sellingStatus: PropTypes.string
};
CarStatus.defaultProps = {
  physicalStatus: null,
  legalStatus: null,
  sellingStatus: null
};

export default reduxForm({
  // a unique name for the form
  form: "Status"
})(CarStatus);
