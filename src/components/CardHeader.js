import React from 'react';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';

const cardHeaderStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: 'white'
  }
});

const CardHeader = withStyles(cardHeaderStyles)(CardHeaderRaw);

export default CardHeader;
