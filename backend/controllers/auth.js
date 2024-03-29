const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandler')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json(user)
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist, Please signup.'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and Password do not match1.'
            })
        }
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET)
        res.cookie('t', token, { expire: new Date() + 9999 })
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ 'message': 'Sign out successfully.' })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    console.log('auth ==>', req.auth)
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: 'Access is  denied'
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resource, Access is denied'
        })
    }
    next()
}