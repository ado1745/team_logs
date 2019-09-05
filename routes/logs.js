const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Employee = require('../models/Employee');
const Log = require('../models/Log');

//@route    GET api/logs
//@decs     Get all user Log
//@access   Private
router.get('/', auth, async (req, res) => {
  try {
    const logs = await Log.find({ employee: req.employee.id }).sort({
      date: -1
    });

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    POST api/auth
//@decs     Add new Log
//@access   Private
router.post(
  '/',
  [
    auth,
    [
      check('message', 'Please enter a message')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, type, contact, con_email, con_phone, emp_res, src_url } = req.body;

    try {
      const newLog = new Log({
        message,
        type,
        contact,
        con_email,
        con_phone,
        emp_res,
        src_url,
        employee: req.employee.id
      });

      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route    PUT api/auth
//@decs     Update Log
//@access   Private
router.put('/:id', auth, async (req, res) => {
  const { message, type, contact, con_email, con_phone, emp_res, src_url } = req.body;

  //Build a Log object
  const logField = {};
  if (message) logField.message = message;
  if (type) logField.type = type;
  if (contact) logField.contact = contact;
  if (con_email) logField.con_email = con_email;
  if (con_phone) logField.con_phone = con_phone;
  if (emp_res) logField.emp_res = emp_res;
  if (src_url) logField.src_url = src_url;

  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'No log found ' });

    //Make sure user own Log

    if (log.employee.toString() !== req.employee.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    log = await Log.findByIdAndUpdate(
      req.params.id,
      {
        $set: logField
      },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route    Delete api/auth
//@decs     Delete Log
//@access   Public
router.delete('/:id', auth, async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'No log found ' });

    //Make sure user own Log

    if (log.employee.toString() !== req.employee.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
