const Blog = require('../models/blog')
const testData = require('./testData')

const initialBlogs = testData

const blogsInDb = async () => {
    
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}



module.exports = {
  blogsInDb, initialBlogs
}