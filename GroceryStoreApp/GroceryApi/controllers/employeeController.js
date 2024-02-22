// controllers/employeeController.js
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const secretKey = 'YourSecretKey'; // Use an environment variable for this in a real application

//const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  try {
    // Find the employee by username
    const employee = await Employee.findOne({ username: req.body.username });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check the password
    
    //const validPassword = await bcrypt.compare(req.body.password, employee.password);
    const validPassword = req.body.password === employee.password;
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate a token
    const token = jwt.sign({ _id: employee._id, username: employee.username }, secretKey);

    // Send the token in the response
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.protectedRoute = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({ message: 'Protected route', user: decoded.username });
  });
};





// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get an employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const employee = await newEmployee.save();
    res.status(201).json({ message: 'Employee added successfully', employee });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Employee deleted successfully'});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



