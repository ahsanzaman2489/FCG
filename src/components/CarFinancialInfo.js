import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from "@material-ui/core";
import styles from "../App.module.css";

const useStyles = makeStyles(theme => ({
  h2: {
    margin: theme.spacing(1),
    minWidth: "100%"
  },
  margin: {
    color: "green"
  }
}));

const CarFinancialInfo = ({ financialDetails }) => {
  const classes = useStyles();
  const {
    purchasePrice,
    purchaseDate,
    purchaseLocation,
    paymentDonePercentage,
    sellingPrice,
    sellingDate,
    sellingLocation,
    sellingDonePercentage,
    margin
  } = financialDetails;

  return (
    <>
      <h2 className={styles.h2}>financial information</h2>

      <Grid container direction="row" spacing={3}>
        <Grid container item xs={12} spacing={3}>
          <List component="nav" aria-label="secondary mailbox folders" dense>
            <ListSubheader>Purchased</ListSubheader>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    ${purchasePrice} ({purchaseDate} , {purchaseLocation})
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<>{paymentDonePercentage}% payments to buyer done</>}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={3}>
        <Grid container item xs={12} spacing={3}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListSubheader>sold</ListSubheader>
            <ListItem>
              <ListItemText
                primary={
                  <>
                    ${sellingPrice}{" "}
                    <span className={classes.margin}>{margin}</span> (
                    {sellingDate} , {sellingLocation})
                  </>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <>{sellingDonePercentage}% payments from the seller done</>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

CarFinancialInfo.propTypes = {
  financialDetails: PropTypes.shape({
    purchasePrice: PropTypes.number,
    purchaseDate: PropTypes.string,
    purchaseLocation: PropTypes.string,
    paymentDonePercentage: PropTypes.number,
    sellingPrice: PropTypes.number,
    sellingDate: PropTypes.string,
    sellingLocation: PropTypes.string,
    sellingDonePercentage: PropTypes.number,
    margin: PropTypes.number
  })
};

CarFinancialInfo.defaultProps = {
  financialDetails: {
    purchasePrice: null,
    purchaseDate: "",
    purchaseLocation: "",
    paymentDonePercentage: null,
    sellingPrice: null,
    sellingDate: "",
    sellingLocation: "",
    sellingDonePercentage: null,
    margin: null
  }
};

export default React.memo(CarFinancialInfo);
