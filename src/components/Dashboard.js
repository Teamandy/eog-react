import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import CardHeader from './CardHeader';
import Loader from './Loader';

import * as actions from '../store/actions';

const styles = theme => ({
  button: {
    color: '#fff',
    background: '#F44336'
  }
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getWeather();
    this.dataUpdate = setInterval(this.props.getWeather, 4000);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      clearInterval(this.dataUpdate);
    }
  }
  reload = e => {
    e.preventDefault();
    this.props.getWeather();
    this.dataUpdate = setInterval(this.props.getWeather, 4000);
  };
  render() {
    const {
      classes,
      loading,
      metric = 0,
      latitude = 0,
      longitude = 0,
      timestamp = 0,
      error
    } = this.props;

    const round = num => num.toFixed(3);

    const dataToshow = (
      <List style={{ height: `400px` }}>
        <ListItem>
          <ListItemText
            primary="Temperature"
            secondary={round(metric) + '°F'}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Latitude" secondary={round(latitude)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Longitude" secondary={round(longitude)} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Last update" secondary={timestamp + ' ago'} />
        </ListItem>
      </List>
    );

    const content = () => {
      if (error) {
        return (
          <List>
            <ListItem>
              <ListItemText primary="Error loading data" secondary={error} />
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                onClick={this.reload}
              >
                Reload
              </Button>
            </ListItem>
          </List>
        );
      }
      return loading && !metric ? <Loader /> : dataToshow;
    };

    return (
      <Card className={classes.card}>
        <CardHeader title="Real-Time Data" />
        <CardContent>{content()}</CardContent>
      </Card>
    );
  }
}

const mapState = state => {
  const {
    loading,
    metric,
    latitude,
    longitude,
    timestamp,
    error
  } = state.metric;
  return {
    loading,
    metric,
    latitude,
    longitude,
    timestamp,
    error
  };
};

const mapDispatch = dispatch => ({
  getWeather: () => {
    dispatch({
      type: actions.FETCH_METRIC
    });
  }
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Dashboard)
);
