const express = require('express')
const router = express.Router()
const user = require('../models/User')

//user routes

// get all users
router.get('/', (req, res, next) => {
    user.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: 'Failed to fetch users'
                }
            });
        });
});

// create User
router.post('/', async (req, res, next) => {
    const newuser = new user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        status: req.body.status,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        role: req.body.role,
        dateCreated: req.body.dateCreated,
    });
    newuser.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'user created successfully',
                user: result
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: 'Failed to create user'
                }
            });
        });
});

// get user by id
router.get('/:id', (req, res, next) => {
    const userId = req.params.id;
    user.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: 'Failed to fetch user'
                }
            });
        });
});

// update user
router.patch('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const updates = req.body;
        const options = { new: true }; // To return the modified document rather than the original

        const result = await user.findByIdAndUpdate(userId, updates, options);
        if (!result) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ message: 'user updated successfully', user: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: { message: 'Failed to update user' } });
    }
});

// delete user
router.delete('/:id', async (req, res, next) => {
    const userId = req.params.id;
    try {
        const result = await user.findByIdAndDelete(userId)
        res.send(result)
        res.send("user deleted successfully")
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = router