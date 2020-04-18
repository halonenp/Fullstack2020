const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        
        if (body.likes === null) {
            body.likes = 0
        }
        const user = await User.findById(body.userId)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.json(savedBlog.toJSON())
    } catch (e) {
        next(e)
    }
})


/*blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)
    try {
        if (body.likes === null) {
            body.likes = 0
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (e) {
        next(e)
    }

})/*
/*blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog.toJSON())
        })
        .catch(error => next(error))
})*/
blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})
/*blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})*/
blogsRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updatedBlog => updatedBlog.toJSON)
    } catch (error) {
        next(error)
    }
})
/*blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

        response.json(updatedBlog => updatedBlog.toJSON())

    } catch (error) {
        next(error)
    }

})*/


module.exports = blogsRouter