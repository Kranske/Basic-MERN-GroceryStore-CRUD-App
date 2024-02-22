// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const auth = require('../middleware/auth');

//login route
router.post('/login', employeeController.login);

// New protected route
router.get('/protected', employeeController.protectedRoute);

// Routes for employeess
router.get('/', auth, employeeController.getAllEmployees);
router.get('/:id', auth, employeeController.getEmployeeById);
router.post('/', auth, employeeController.createEmployee);
router.put('/:id', auth, employeeController.updateEmployee);
router.delete('/:id', auth, employeeController.deleteEmployee);




module.exports = router;
