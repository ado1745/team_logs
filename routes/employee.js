const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/employee
//@decs     Register Employee
//@access   Public
router.post(
  '/',
  [
    check('name', 'Please enter name')
      .not()
      .isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with 6 or more char').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let employee = await Employee.findOne({ email });

      if (employee) {
        return res.status(400).json({ msg: 'Employee already in the system' });
      }

      employee = new Employee({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      employee.password = await bcrypt.hash(password, salt);

      await employee.save();

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
