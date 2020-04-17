const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./testHelper')
const testData = require('./testData')




describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api
            .get('/api/blogs')

        expect(response.body.length).toBe(testData.length)
    })

})

describe('add new a blog', () => {
    test('adds a new blog', async () => {
        const earlier = await api.get('/api/blogs')

        const newBlog = {
            _id: "88qq88",
            title: "Header",
            author: "PekkaKaikko",
            url: "http://www.kotisivu.fi",
            likes: 6699,
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(earlier.body.length + 1)

    })
    test('if like equals null, likes is 0', async () => {
        const newBlog = {
            _id: "77dd77",
            title: "Headerrrr",
            author: "VappuPekonen",
            url: "http://www.himapage.fi",
            __v: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body[4].likes).toBe(0)

    })
})

afterAll(() => {
    mongoose.connection.close()
})