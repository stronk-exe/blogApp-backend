import mongoose from 'mongoose'
import Blog from '../models/Blog'
import User from '../models/User'

export const getAllBlogs = async (req, res, next) => {
    let blog

    try {
        blog = await Blog.find()
    }
    catch (err) {
        return console.log(err)
    }

    if (!blog)
        return res.status(404).json({ message: 'no blogs found!' })
    return res.status(200).json({ blog })
}

export const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body

    let existingUser
    try {
        existingUser = await User.findById(user)
    }
    catch (err) {
        return console.log(err)
    }

    if (!existingUser)
        return res.status(400).json({ message: 'unable to find user by this Id' })
    
    const blog = new Blog({title, description, image, user})
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await blog.save({ session })
        await session.commitTransaction()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err })
    }
    return res.status(200).json({ blog })
}

export const updateBlog = async (req, res, next) => {
    const {title, description} = req.body
    const blogId = req.params.id
    let blog

    try {
        blog = await Blog.findByIdAndUpdate(blogId, { title, description })
    }
    catch (err) {
        return console.log(err)
    }

    if (!blog)
        return res.status(500).json({ message: 'unable to update the blog!' })
    return res.status(200).json({ blog })
}

export const getBlogById = async (req, res, next) => {
    let blog
    try {
        blog = await Blog.findById(req.params.id)
    }
    catch (err) {
        console.log(err)
    }
    if (!blog)
        res.status(400).json({ message: 'blog not found!' })
    res.status(200).json({ blog })
}

export const deleteBlog = async (req, res, next) => {
    let blog
    try {
        blog = await Blog.findByIdAndRemove(req.params.id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    }
    catch (err) {
        console.log(err)
    }
    if (!blog)
        res.status(400).json({ message: 'unable to delete blog!' })
    res.status(200).json({ message: 'successfully deleted!' })
}

export const getUserId = async (req, res, next) => {
    const userId = re 
    let userBlogs
    try {
        userBlogs = await User.findById(req.params.id).populate('blogs')
    }
    catch (err) {
        return console.log(err)
    }

    if (!userBlogs)
        return res.status(404).json({ message: 'no blog found!' })
    return res,status(200).json({ blogs:userBlogs })
}