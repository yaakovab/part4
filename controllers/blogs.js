const blogsRouter = require('express').Router();
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

    res
        .status(200)
        .json(blogs)

})

blogsRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body

    const user = await User.findOne({})

    const blog = new Blog({
        title, author, url, likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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