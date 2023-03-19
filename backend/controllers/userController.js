import User from '../models/User'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res, next) => {
    let users
    try {
        users = await User.find()
    } catch(err) {
        console.log(err)
    }

    if (!users)
        return res.status(404).json({ message: 'no users found' })
    return res.status(200).json({ users })
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    let existingUser
    try {
        existingUser = await User.findOne({ email })
    } catch (err) {
        console.log(err)
    }

    if (existingUser)
        return res.status(400).json({ message: 'user alerady exists!' })
    
    const hashedPassword = bcrypt.hashSync(password)
    const user = new User({ name, email, password:hashedPassword, blogs: [] })

    try {
        await user.save()
    } catch(err) {
        console.log(err)
    }
    return res.status(201).json({ user })
}

export const login = async (req, res, next) => {
    const {email, password} = req.body
    let existingUser

    try {
        existingUser = await User.find(email)
    }
    catch (err) {
        console.log(err)
    }

    if (!existingUser)
        res.status(404).json({ message: 'user not found!' })
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect)
        res.status(400).json({ message: 'Incorrect password!' })
    res.status(200).json({ message: 'login successfull' })
}