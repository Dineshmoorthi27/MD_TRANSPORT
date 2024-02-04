const router = require('express').Router();
const User = require('../models/usersModel');
const bcrypt = require("bcryptjs");
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
// register new user

router.post('/register', async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.send({
                message: 'User already exists',
                success: false,
                data: null,
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = User(req.body);
        await newUser.save();
        res.send({
            message: "User Created successfully",
            success: true,
            data: null,
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });

    }
});


/* login */
router.post("/login", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            return res.send({
                message: "User does not exist",
                success: false,
                data: null,
            });
        }
        const passwordMatch = await bcrypt.compare(
            req.body.password,
            userExists.password
        );
        if (!passwordMatch) {
            return res.send({
                message: "INcorrect Password",
                success: false,
                data: null,
            });
        }
        const token = jwt.sign(
            { userId: userExists._id }, process.env.jwt_secret,
            { expiresIn: '1d' }
        );
        res.send({
            message: "Logged in successfully!",
            success: true,
            data: token,
        });
    }
    catch (error) {
        return res.send({
            message: error.message,
            success: false,
            data: null,
        });

    }
});

//get user by id
router.post("/get-user-by-id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message: "User ",
            success: true,
            data: user,
        })
    }
    catch (error) {
        res.send({
            message: error.message,
            success: false,
            data: null,
        });

    }
});

module.exports = router;
