const User = require("../models/user")
const { Order } = require('../models/order')
exports.userById = (req, res, next, id) => {
    User.findOne({ _id: id }).exec((err, user) => {
        if (err) {
            res.status(400).json({
                error: "User Not Found."
            })
        }
        req.profile = user;
        next();
    })
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.password = undefined;
    return res.json(req.profile)
}

exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true },
        (err, user) => {
            if (err) {
                res.status(400).json({
                    error: "You are authorized to perform this action."
                })
            }

            user.hashed_password = undefined;
            user.password = undefined;
            res.json(user)
        })
}

exports.addOrderToUserHistory = (req, res, next) => {
    let history = [];
    req.body.products.map((product, i) => {
        history.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.count,
            transaction_id: req.body.transaction_id,
            amount: req.body.amount

        })
    })

    User.findOneAndUpdate({
        _id: req.profile._id
    }, {
        $push: { history: history }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Could not update user purchase history."
            })
        }

        next()
    })
}

exports.purchaseHistory = (req, res) => {
    console.log("inprchase history")
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: "Could not update user purchase history."
                })
            }
            res.json(orders)
        })
}