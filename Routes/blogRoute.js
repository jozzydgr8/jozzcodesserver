const router = require('express').Router();
const { getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const authenticator = require('../middleware/authenticator');
const Blog = require('../Schema/blogSchema');

router.get('/', getAllBlogs);

router.post('/',authenticator, createBlog)

router.patch('/:id', authenticator, updateBlog)

router.delete('/:id',authenticator, deleteBlog)

module.exports = router