import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { Fab, makeStyles, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddIcon from "@material-ui/icons/Add";
import SingleTask from "./SingleTask";
import Select from "./formFields/Select";
import Input from "./formFields/Input";

const useStyles = makeStyles(theme => ({
  grid: {
    position: "relative",
    minHeight: 305
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  overFlow: {
    overflowY: "auto",
    maxHeight: 245
  }
}));

const validate = values => {
  const errors = {};
  const requiredFields = ["comment", "type"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const CarTasks = ({
  taskDetails,
  carId,
  handleSubmit,
  addTaskAction,
  updateTaskAction
}) => {
  const classes = useStyles();
  const { tasks } = taskDetails;
  const [task, setTask] = useState({
    comment: "",
    type: ""
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const taskTypesOptions = [
    { label: "document", value: "ADD_DOCUMENT" },
    { label: "car wash", value: "WASH_CAR" },
    { label: "add payment details", value: "ADD_PAYMENT_DETAILS" }
  ];

  const submit = data => {
    setOpen(false);
    addTaskAction({ ...data, id: carId });
  };

  const taskChangeHandler = e => {
    e.preventDefault();
    const { target } = e;
    setTask({
      ...task,
      [target.name]: target.value
    });
  };
  return (
    <div className={classes.grid}>
      <h2>list of tasks</h2>
      <div className={classes.overFlow}>
        <Tooltip title="Add" aria-label="add" onClick={handleOpen}>
          <Fab color="secondary" className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
        {!tasks || tasks.length === 0 ? (
          <h3>No tasks Available</h3>
        ) : (
          tasks.map(item => {
            return (
              <SingleTask
                comment={item.comment}
                taskType={item.taskType}
                completed={item.completed}
                taskId={item.id}
                key={item.id}
                updateTaskAction={updateTaskAction}
                carId={carId}
              />
            );
          })
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add task</DialogTitle>
        <form onSubmit={handleSubmit(submit)}>
          <DialogContent>
            <DialogContentText>Select details to add task</DialogContentText>
            <Field
              label="comment"
              type="text"
              name="comment"
              component={Input}
            />
            <Field
              margin="dense"
              id="type"
              name="type"
              label="task type"
              type="email"
              fullWidth
              component={Select}
              options={taskTypesOptions}
              onChange={taskChangeHandler}
              selected={task.type}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

CarTasks.propTypes = {
  taskDetails: PropTypes.instanceOf(Object).isRequired,
  carId: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  addTaskAction: PropTypes.func.isRequired,
  updateTaskAction: PropTypes.func.isRequired
};

CarTasks.defaultProps = {
  carId: null
};

export default reduxForm({
  form: "tasks",
  validate
})(CarTasks);
