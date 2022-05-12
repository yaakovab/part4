const blogsRouter = require('express').Router();
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

    res
        .status(200)
        .json(blogs)

})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
    const { title, author, url, likes } = req.body
    const { user } = req
    // console.log(user)

    const blog = new Blog({
        title, author, url, likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const { user } = req
    console.log(user)
    const blogToDelete = await Blog.findById(req.params.id)
    console.log(blogToDelete)
    if (user._id.toString() !== blogToDelete.user.toString()) {
        return res.status(401).json({ error: 'not authorized to delete this' })
    }

    user.blogs = user.blogs.filter(blogID => blogID !== blogToDelete._id)
    await user.save()
    await blogToDelete.remove()
    res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes: body.likes }, { new: true })
    res.json(updatedBlog)
})


module.exports = blogsRouter