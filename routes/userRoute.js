const express = require('express');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/User');

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please Enter a Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email already exists');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter a Password'),
  ],
  authController.createUser
);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUser);

module.exports = router;
