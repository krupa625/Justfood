// Routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function sendError(res, statusCode, message) {
    return res.status(statusCode).json({ success: false, error: message });
}

const jwtSecret = crypto.randomBytes(32).toString('base64');

router.post("/createUser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(res, 400, errors.array()[0].msg);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            location: req.body.location
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        sendError(res, 500, err.message);
    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendError(res, 400, errors.array()[0].msg);
    }

    const email = req.body.email;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return sendError(res, 400, "Please try to login with correct credentials");
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);
        if (isPasswordValid) {
            const data = {
                user: { id: userData.id }
            };
            const authToken = jwt.sign(data, jwtSecret, { expiresIn: '1h' });
            return res.json({ success: true, authToken: authToken });
        } else {
            return sendError(res, 400, "Please try to login with correct credentials");
        }
    } catch (err) {
        console.error(err);
        sendError(res, 500, err.message);
    }
});

module.exports = router;
