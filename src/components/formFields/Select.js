import React, { useEffect, useRef, useState } from "react";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    marginLeft: 0
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  label: {
    background: "white",
    padding: "2px"
  }
}));

const SelectComponent = ({
  input,
  meta,
  options,
  label,
  selected,
  ...rest
}) => {
  // eslint-disable jsx-props-no-spreading
  const inputLabel = useRef(null);
  const inputValue = useRef(selected);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState("");

  useEffect(() => {
    if (selected) setSelectedIndex(selected);
  }, [selected]);

  const renderOptions = selectOptions => {
    return selectOptions.map(item => {
      return typeof item === "string" ? (
        <MenuItem value={item} key={item}>
          {item}
        </MenuItem>
      ) : (
        <MenuItem value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl
      className={classes.formControl}
      variant="outlined"
      error={!!(meta.touched && meta.error)}
    >
      <InputLabel
        ref={inputLabel}
        id="demo-simple-select-outlined-label"
        className={classes.label}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        {...input}
        onChange={event => {
          if (inputValue.current === event.target.value) return false;
          return input.onChange(event);
        }}
        value={selectedIndex}
        {...rest}
      >
        {renderOptions(options)}
      </Select>
      {meta && meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

SelectComponent.propTypes = {
  input: PropTypes.instanceOf(Object),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  }),
  options: PropTypes.arrayOf(Object),
  label: PropTypes.string.isRequired,
  selected: PropTypes.string
};
SelectComponent.defaultProps = {
  selected: null,
  options: [],
  input: {},
  meta: {
    touched: false,
    error: false
  }
};

export default SelectComponent;
