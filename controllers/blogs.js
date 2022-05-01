const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)

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