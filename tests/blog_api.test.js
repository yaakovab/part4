const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of testHelper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 100000)


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


afterAll(() => {
    mongoose.connection.close()
})