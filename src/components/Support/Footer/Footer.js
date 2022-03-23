import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}));

export const Footer = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className,'text-right')}
    >
      <Typography variant="body1">
        &copy;{' '}
        <Link
          component="a"
          href="#"
          target="_blank"
        >
         COE Telstra
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        Service Vertualization Portal
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
