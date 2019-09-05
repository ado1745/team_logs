const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee'
  },
  message: {
    type: String,
    require: true
  },
  type: {
    type: String,
    default: 'regular'
  },
  emp_res: {
    type: String
  },
  src_url: {
    type: String
  },

  contact: {
    type: String
  },
  con_email: {
    type: String
  },
  con_phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('log', LogSchema);
