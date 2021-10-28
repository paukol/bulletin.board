import React,  { useState } from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, editPost } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux';

import styles from './PostEdit.module.scss';

const Component = ({className, postOne, editPost, user}) => {
  const [post, setPost] = useState(...postOne);
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value })
  }
  const submitForm = (event) => {
    event.preventDefault();
    if(post.title.length > 1 && post.content.length > 1 && post.email){
      post.updateDate = new Date();
      editPost(post);


      setPost({
        id: '',
        title: '',
        date: '',
        content: '',
        email: '',
        image: '',
        updateDate: '',
        status: ''
      });
    } else {
      alert('Please complete all fields');
    }
  }

  return (
    <div className={clsx(className, styles.root)}>
      {user.logged && (
        <div>
          <h2>Post Edit</h2>
          <form className={styles.changesForm} action="/contact/send-message" method="POST" enctype="multipart/form-data" onSubmit={submitForm}>
            <label className={styles.formInput}>
              Title: <input type="text" name="title" value={post.title} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Description: <textarea type="text" name="content" value={post.content} onChange={handleChange}></textarea>
            </label>
            <label className={styles.formInput}>
              Email: <input type="text" name="email" value={post.mail} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Image: <input type="file" name="image" accept=".png, .gif, .jpg" onChange={handleChange}></input>
            </label>
            <button type="submit">Submit</button>
          </form>
      </div>
      )}
      {!user.logged && (
        <NotFound />
      )}
    </div>
  )
};

Component.propTypes = {
  className: PropTypes.string,
  postsOne: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      date: PropTypes.string,
      updateDate: PropTypes.string,
      email: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
    })
  ),
  user: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  postOne: getOne(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};