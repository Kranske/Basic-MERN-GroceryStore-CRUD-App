// models/employee.js
const mongoose = require('../db');

const employeesSchema = new mongoose.Schema({
  empId: Number,
  username: String,
  password: String,
});

const Employees = mongoose.model('Employees', employeesSchema);

module.exports = Employees;
