import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import clsx from 'clsx';

import styles from './NotFound.module.scss';
import Fab from '@material-ui/core/Fab';

const Component = ({className}) => (
  <div className={clsx(className, styles.root)}>
    <h2 className={styles.title}>Page not found</h2>

    <Link className={styles.button} to={'/'}>
      <Fab
        size='small'
        color='secondary'
        aria-label='add'
        variant='extended'
      >
        Back to Homepage
      </Fab>
    </Link>
    
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as NotFound,
  Component as NotFoundComponent,
};