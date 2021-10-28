// eslint-disable-next-line
import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useEffect} from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOnePost, fetchPostById } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux';


import styles from './Post.module.scss';
import Fab from '@material-ui/core/Fab';

const Component = ({className, postOne, user, fetchPostById}) => {
  useEffect(() => {
    fetchPostById();
  }, []);

  if (!postOne) {
    return <div></div>
  }

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.postCard} key={postOne.id}>
        <div>
          <img className={styles.image} src={postOne.photo} alt='' />
          <div>
            <h3 className={styles.title}>{postOne.title}</h3>
            <p className={styles.info}>Location: {postOne.location}</p>
            <p className={styles.info}>Added: {postOne.created}</p>
            <p className={styles.about}>{postOne.content}</p>
            <p className={styles.info}>Price: {postOne.price}$</p>
            <p className={styles.info}>Email: {postOne.author} </p>
            <p className={styles.info}>Phone number: {postOne.phone} </p>
            <p className={styles.info}>Edited: {postOne.updateDate}</p>
            <p className={styles.info}>Status: {postOne.status}</p>
            {user.logged && (
            <Link className={styles.button} to={`/post/${postOne.id}/edit`}>
              <Fab
                size='small'
                color='secondary'
                aria-label='add'
                variant='extended'
              >
                Edit Post
              </Fab>
            </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

Component.propTypes = {
  className: PropTypes.string,
  fetchPostById: PropTypes.func,
  match: PropTypes.object,
  params: PropTypes.object,
  postOne: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  postOne: getOnePost(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchPostById: () => dispatch(fetchPostById(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};