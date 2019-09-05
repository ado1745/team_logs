const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

//@route    GET api/auth
//@decs     Get login employee
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee.id).select(
      '-password'
    );
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

//@route    POST api/auth
//@decs     Auth Employee and get token
//@access   Public
router.post(
  '/',
  [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let employee = await Employee.findOne({ email });

      if (!employee) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, employee.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        employee: {
          id: employee.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
