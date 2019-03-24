import React, { Component } from 'react';
import { connect } from 'react-redux';
import Plotly from 'plotly.js-dist';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import CardHeader from './CardHeader';
import Loader from './Loader';

class Chart extends Component {
  componentDidMount() {
    this.container = document.getElementById('chart');
    this.layout = {
      title: 'Drone metrics',
      xaxis: {
        title: 'Time',
        showgrid: true,
        zeroline: false
      },
      yaxis: {
        title: 'Temperature',
        showline: false
      }
    };
  }
  componentWillReceiveProps() {
    if (
      !this.props.error &&
      !this.props.loading &&
      this.props.data.length &&
      this.container
    ) {
      const { data } = this.props;

      const getTime = ms => {
        const time = new Date(ms - 6 * 3600 * 1000);
        return time.toISOString();
      };

      const x = data.map(item => getTime(item.timestamp));
      const y = data.map(item => item.metric);

      const trace = {
        x: [...x],
        y: [...y],
        mode: 'lines',
        type: 'scatter'
      };

      const dataArray = [trace];

      Plotly.newPlot('chart', dataArray, this.layout);
    }
  }
  render() {
    const { loading, data, error } = this.props;
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
      return loading && !data.length ? (
        <Loader />
      ) : (
        <div id="chart" style={{ height: `400px` }} />
      );
    };

    return (
      <Card>
        <CardHeader title="Chart" />
        <CardContent>{content()}</CardContent>
      </Card>
    );
  }
}

const mapState = state => {
  const { loading, data, error } = state.metric;
  return {
    loading,
    data,
    error
  };
};

export default connect(
  mapState,
  null
)(Chart);
