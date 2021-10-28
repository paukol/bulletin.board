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
    if(post.title.length > 1 && post.text.length > 1 && post.email){
      editPost(post);

      setPost({
        email: '',
        created: '',
        updated: '',
        status: '',
        title: '',
        text: '',
        photo: '',
        price: '',
        phone: '',
        location: ''
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
              Location: <input type="text" name="location" value={post.location} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Description: <textarea type="text" name="text" value={post.text} onChange={handleChange}></textarea>
            </label>
            <label className={styles.formInput}>
              Price: <input type="text" name="price" value={post.price} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Email: <input type="email" name="email" value={post.author} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Phone number: <input type="text" name="phone" value={post.phone} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Image adress: <input type="text" name="photo" accept=".png, .gif, .jpg" value={post.photo} onChange={handleChange}></input>
            </label>
            <label className={styles.formInput}>
              Status: 
              <input type="radio" id="new" name="status" value="New" onChange={handleChange}></input>
              <label htmlFor="new">New, not published</label>
              <input type="radio" id="published" name="status" value="published" onChange={handleChange}></input>
              <label htmlFor="published">Published</label>
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
  children: PropTypes.node,
  className: PropTypes.string,
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