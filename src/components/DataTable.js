import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  wrap: {
    padding: theme.spacing.unit * 2
  }
});

const DataTable = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <div className={classes.wrap}>{children[0]}</div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.wrap}>{children[1]}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(DataTable);
