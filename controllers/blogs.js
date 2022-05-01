const blogsRouter = require('express').Router();
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


blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: body.likes }, { new: true })
    res.json(updatedBlog)
})


module.exports = blogsRouter