import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';

import CardHeader from './CardHeader';
import Loader from './Loader';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  wrap: {
    padding: theme.spacing.unit * 2
  }
});

const MapToRender = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZosLUZafsAQiHYBY64REdRJ_r6wH2yuA&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ lat, lng }) => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 29.7604, lng: -95.3698 }}>
    <Marker position={{ lat, lng }} />
  </GoogleMap>
));

const FlightMap = ({
  classes,
  loading,
  latitude = 0,
  longitude = 0,
  error
}) => {
  const content = () => {
    if (error) {
      return (
        <List>
          <ListItem>
            <ListItemText primary="Error loading data" secondary={error} />
          </ListItem>
        </List>
      );
    }
    return loading && !latitude && !longitude ? (
      <Loader />
    ) : (
      <MapToRender lat={latitude} lng={longitude} />
    );
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.wrap}>
            <Card className={classes.flight}>
              <CardHeader title="Flight Map" />
              <CardContent>{content()}</CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapState = state => {
  const { loading, latitude, longitude, error } = state.metric;
  return {
    loading,
    latitude,
    longitude,
    error
  };
};

export default withStyles(styles)(
  connect(
    mapState,
    null
  )(FlightMap)
);
