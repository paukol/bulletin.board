import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';


const Component = ({ postsAll, fetchPublishedPosts, user }) => {
  React.useEffect(() => {
    fetchPublishedPosts();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        {postsAll.map((post) => (
          <Card key={post.id} className={styles.cardItem}>
            <CardHeader
              avatar={
                <Avatar aria-label='recipe' className={styles.avatar}>
                  R
                </Avatar>
              }
              title={post.title}
            />

            <CardActionArea
              href={`/post/${post._id}`}>
              <CardMedia
                className={styles.image}
                component='img'
                image={post.photo}
              />
              <CardContent>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                >
                </Typography>
                <div>
                <Typography className={styles.author} component='p' variant='subtitle2'>
                    Author: {post.author}
                  </Typography>
                  <Typography className={styles.created} component='p' variant='subtitle2'>
                    Created: {post.created}
                  </Typography>
                  <Typography className={styles.click} component='p' variant='subtitle2'>
                    Click on card to see more!
                  </Typography>
                </div>
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
  fetchPublishedPosts: PropTypes.any,
  postsAll: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      _id: PropTypes.string,
      title: PropTypes.string,
      photo: PropTypes.string,
      author: PropTypes.string,
      created: PropTypes.string,
      phone: PropTypes.string,
    })
  ),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  postsAll: getAll(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};