import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import LocalCarWashIcon from "@material-ui/icons/LocalCarWash";
import PaymentIcon from "@material-ui/icons/Payment";

const SingleTasks = ({
  taskType,
  comment,
  completed,
  taskId,
  carId,
  updateTaskAction
}) => {
  const renderIcon = type => {
    switch (type) {
      case "ADD_DOCUMENT":
        return <AttachFileIcon />;
      case "WASH_CAR":
        return <LocalCarWashIcon />;
      case "ADD_PAYMENT_DETAILS":
        return <PaymentIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  const onChangeHandler = (tid, cId, comp) => {
    updateTaskAction({ taskId: tid, carId: cId, completed: comp });
  };

  return (
    <>
      <ListItem key={1} role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={completed}
            tabIndex={-1}
            inputProps={{ "aria-labelledby": 1 }}
            onChange={() => onChangeHandler(taskId, carId, !completed)}
          />
        </ListItemIcon>
        <ListItemText id={1} primary={`${comment}`} />
        <ListItemIcon>{renderIcon(taskType)}</ListItemIcon>
      </ListItem>
    </>
  );
};

SingleTasks.propTypes = {
  carId: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  taskType: PropTypes.string.isRequired,
  updateTaskAction: PropTypes.func.isRequired
};

export default SingleTasks;
