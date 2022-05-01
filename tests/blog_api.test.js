const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
}, 1000000)


test('blogs are returned in json format', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /json/)

})


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})


test('id field in blog object is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


test('new blogs are added correctly', async () => {
    const blogObject = testHelper.multipleBlogsList[0]
    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(201)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)

    expect(response.body).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(titles).toContain('React patterns')
})


test('when likes not specified in blog it default to 0', async () => {
    const blogObject = {
        title: 'TypeScript of Microsoft',
        author: 'Robert B. Lasley',
        url: 'http://TSMicro',
    }

    await api.post('/api/blogs').send(blogObject)
    const response = await api.get('/api/blogs')


    expect(response.body[response.body.length - 1].likes).toBe(0)
})

test('when title or url missing in blog issus 400 code', async () => {
    const blogObject = {
        author: 'Micheal Knowels',
    }

    await api.post('/api/blogs').send(blogObject).expect(400)
})


test('a blog can be deleted', async () => {
    const response = await api.get('/api/blogs')
    const idOfBlogToDelete = response.body[0].id

    await api.delete(`/api/blogs/${idOfBlogToDelete}`).expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    expect(responseAtEnd.body).toHaveLength(testHelper.initialBlogs.length - 1)
})

test('can update number of likes of a specific blog', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const noteToUpdate = blogsAtStart[0]

    // const blogObject = {
    //     ...noteToUpdate,
    //     likes: 25,
    // }

    await api.put(`/api/blogs/${noteToUpdate.id}`).send({ likes: 25 })

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(25)
})

afterAll(() => {
    mongoose.connection.close()
})