const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')


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


test('new blogs with a correct token are added correctly', async () => {
    const blogObject = testHelper.multipleBlogsList[0]

    await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + testHelper.tokenForPost)
        .send(blogObject)
        .expect(201)

    const blogsAtStart = await testHelper.blogsInDb()
    const titles = blogsAtStart.map(b => b.title)

    expect(blogsAtStart).toHaveLength(testHelper.initialBlogs.length + 1)
    expect(titles).toContain('React patterns')
})

test('gets status code 401 when posting a new blog without a token', async () => {
    const blogObject = testHelper.multipleBlogsList[1]
    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(401)
})


test('when likes not specified in blog it default to 0', async () => {
    const blogObject = {
        title: 'TypeScript of Microsoft',
        author: 'Robert B. Lasley',
        url: 'http://TSMicro',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer ' + testHelper.tokenForPost)
        .send(blogObject)

    const blogsAtEnd = await testHelper.blogsInDb()


    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('when title or url missing in blog issus 400 code', async () => {
    const blogObject = {
        author: 'Micheal Knowels',
    }

    await api.
        post('/api/blogs')
        .set('Authorization', 'bearer ' + testHelper.tokenForPost)
        .send(blogObject)
        .expect(400)
})


test('a blog can be deleted', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    console.log(blogsAtStart)
    const idOfBlogToDelete = blogsAtStart[0].id


    await api.delete(`/api/blogs/${idOfBlogToDelete}`).expect(204)

    const blogsAtEnd = await testHelper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(titles).not.toContain(blogsAtStart[0].title)
})

test('can update number of likes of a specific blog', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const noteToUpdate = blogsAtStart[0]



    await api.put(`/api/blogs/${noteToUpdate.id}`).send({ likes: 25 })

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(25)
})

describe('testing the addition of new user to users db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({
            name: "L. B. Games",
            username: "lbg",
            passwordHash,
        })

        await user.save()
    })

    test('adding new user throgh api succeeds', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            name: "G.W.Boosh",
            password: 'potus',
            username: 'gwbsh'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /json/)

        const usersAtEnd = await testHelper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    test('adding new user fails when there is no password', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const result = await api
            .post('/api/users')
            .send({ username: 'defd' })
            .expect(400)
            .expect('Content-Type', /json/)

        expect(result.body.error).toContain('username or password are missing')

        const usersAtEnd = await testHelper.usersInDb()

        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('adding new user fails when there is no username', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const result = await api
            .post('/api/users')
            .send({ password: 'defd' })
            .expect(400)
            .expect('Content-Type', /json/)

        expect(result.body.error).toContain('username or password are missing')

        const usersAtEnd = await testHelper.usersInDb()

        expect(usersAtEnd).toEqual(usersAtStart)
    })

})


afterAll(() => {
    mongoose.connection.close()
})