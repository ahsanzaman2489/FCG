import React, { useState } from "react";
import propTypes from "prop-types";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import styles from "./Home.module.css";

const Home = ({ history }) => {
  const [id, setId] = useState("20664c0d-266e-4950-a70d-c0a63afd510b");

  const onChangeHandler = e => {
    setId(e.currentTarget.value);
  };

  const submitHandler = () => {
    if (id.length > 0) {
      history.push(`/detail/${id}`);
    }
  };
  return (
    <Container fixed>
      <Grid container className={styles.grid}>
        <Grid item xs={7}>
          <TextField
            name="carId"
            margin="normal"
            label="Insert car id to fetch details"
            className={styles.input}
            value={id}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={submitHandler}
          >
            fetch
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

Home.propTypes = {
  history: propTypes.instanceOf(Object).isRequired
};

export default Home;
