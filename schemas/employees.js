const mongoose = require(`mongoose`);

const { Schema } = mongoose;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  married: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(`Emp`, employeeSchema, `employees`);
