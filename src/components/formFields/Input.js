import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const InputComponent = ({ input, meta, ...rest }) => {
  // eslint-disable jsx-props-no-spreading
  return (
    <>
      <TextField
        margin="dense"
        fullWidth
        variant="outlined"
        error={!!(meta.touched && meta.error)}
        {...input}
        {...rest}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

InputComponent.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired
};

export default InputComponent;
