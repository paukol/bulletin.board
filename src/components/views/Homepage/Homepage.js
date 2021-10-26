import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Fab from '@material-ui/core/Fab';


const Component = ({ user, postsAll }) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        {postsAll.map((post) => (
          <Card key={post.id} className={styles.cardItem}>
            <CardHeader
              action={
                <IconButton aria-label='settings'>
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.title}
              subheader={post.publicationDate}
            />

            <CardActionArea>
              <CardMedia
                className={styles.image}
                component='img'
                image={post.image}
                title={post.title}
              />
              <CardContent>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                </Typography>
                <div>
                </div>
                <Link className={styles.button} to={`/post/${post.id}`}>
                  <Fab
                    size='small'
                    color='secondary'
                    aria-label='add'
                    variant='extended'
                  >
                    See more
                  </Fab>
                </Link>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
      { user.logged && (    
        <Link className={styles.button} to={'/post/add'}>
          <Fab
            size='small'
            color='primary'
            aria-label='add'
            variant='extended'
          >
            Add new post
          </Fab>
        </Link>
      )}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  postsAll: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      publicationDate: PropTypes.string,
      updateDate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  user: getUser(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};