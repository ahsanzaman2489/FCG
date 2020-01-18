import React, { useEffect, useRef, useState } from "react";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  label: {
    background: "white",
    padding: "2px"
  }
}));

const SelectComponent = ({ input, meta, options, label, selected }) => {
  // console.log(input, meta, options)
  // eslint-disable jsx-props-no-spreading
  const [selectedIndex, setSelectedIndex] = useState("");

  useEffect(() => {
    if (selected) setSelectedIndex(selected);
  }, [selected]);

  const renderOptions = selectOptions => {
    return selectOptions.map(item => {
      return (
        <MenuItem value={item.value} key={item.value}>
          {item.label}
        </MenuItem>
      );
    });
  };
  const inputLabel = useRef(null);
  const classes = useStyles();

  // console.log(selectedIndex)
  // console.log(selected , options)

  return (
    <FormControl className={classes.formControl} variant="outlined">
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
        autoWidth
        value={selectedIndex}
      >
        {renderOptions(options)}
      </Select>
      {meta.touched && meta.error && (
        <span className="text-danger">{meta.error}</span>
      )}
    </FormControl>
  );
};

SelectComponent.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  meta: PropTypes.instanceOf(Object).isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  selected: PropTypes.string
};
SelectComponent.defaultProps = {
  selected: null
};

export default SelectComponent;
