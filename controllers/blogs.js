
const blogsRouter = require('express').Router();
const Blog = require('../models/blog')


blogsRouter.get('/', (req, res) => {
    Blog
        .find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', (req, res) => {
    const body = req.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = blogsRouter