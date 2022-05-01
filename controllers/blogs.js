const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)

})

blogsRouter.post('/', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
})


module.exports = blogsRouter