import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const Loader = props => (
  <Grid container direction="row" justify="center" alignItems="center">
    <CircularProgress />
  </Grid>
);

export default Loader;
