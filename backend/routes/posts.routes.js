const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/add', async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;
    const newPost = new Post({
      author: author,
      created: created,
      updated: updated,
      status: status,
      title: title,
      text: text,
      photo: photo,
      price: price,
      phone: phone,
      location: location,
    });

    await newPost.save();
    res.json({ message: 'OK' });;
  } catch (err) {
    res.status(500).json(`This error ${err}`);
  }
});


module.exports = router;