//All the imported files and packages
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'


function Employee() {
  
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState({ empId: '', username: '', password: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ empId: '', username: '', password: '' });
  const [searchColumn, setSearchColumn] = useState('');
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/employees', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setEmployees(data));

      const handleClick = (event) => {
        if (event.target.tagName !== 'TH' && event.target.id !== 'search-bar') {
          setSearchColumn('');
        }
      };
    
      document.addEventListener('click', handleClick);
    
      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        document.removeEventListener('click', handleClick);
      };
  }, []);

  // Add this function to handle input change for the new employee
  const handleNewEmployeeInputChange = (event) => {
    setNewEmployee({ ...newEmployee, [event.target.name]: event.target.value });
  };

  // handleInputChange function goes here
  const handleInputChange = (event) => {
    setEditingEmployee({ ...editingEmployee, [event.target.name]: event.target.value });
  };


  // handleEdit function goes here
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };


// handleSubmit function
const handleEditSubmit = async (event) => {
  event.preventDefault();

  const response = await fetch(`http://localhost:3000/employees/${editingEmployee._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(editingEmployee),
  });

  if (response.ok) {
    const updatedEmployee = await response.json();
    setEmployees(employees.map(employee => employee._id === updatedEmployee._id ? updatedEmployee : employee));
    setIsModalOpen(false);
    toast.info('Employee updated successfully!', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 5000,
    });
  }
};



  // handleDelete function goes here
  const handleDelete = (_id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this employee?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await fetch(`http://localhost:3000/employees/${_id}`, {
              method: 'DELETE',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            });
            if (response.ok) {
              setEmployees(employees.filter(employee => employee._id !== _id));
              toast.error('Employee deleted successfully!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 5000,
              });
            }
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(newEmployee),
    });
  
    if (response.ok) {
      const addedEmployee = await response.json();
      console.log('Added employee:', addedEmployee); // Log the added employee
      setEmployees(prevEmployees => {
        const updatedEmployees = [...prevEmployees, addedEmployee.employee];
        console.log('Updated employees:', updatedEmployees); // Log the updated employees
        return updatedEmployees;
      });
      setIsAddModalOpen(false);
      toast.success('Employee added successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const columnNames = {
    empId: 'Employee ID',
    username: 'Username',
    password: 'Password',
  };




  return (
    <div className="employee text-center container ">
      <ToastContainer />


      <h1 className="text-white">Employee</h1>
      <div className="form-group my-4">
      <input
        id="search-bar"
        type="text"
        placeholder={`Search ${columnNames[searchColumn] || 'All or Select a Column to Search'}`}
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        className="form-control w-100"
      />
      </div>
        
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>
            <div className="mb-3">
              <label className="form-label">Employee ID</label>
              <input name="empId" value={editingEmployee.empId} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" value={editingEmployee.username} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" value={editingEmployee.password} onChange={handleInputChange} className="form-control" />
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="col-lg-12 container">
        <table className="table table-striped bordered-table">
          <thead>
            <tr>
              <th 
                onClick={() => setSearchColumn('empId')} 
                className={`cursor-pointer th-hover ${searchColumn === 'empId' ? 'text-primary' : ''}`}
              >
                Employee ID
              </th>
              <th 
                onClick={() => setSearchColumn('username')} 
                className={`cursor-pointer th-hover ${searchColumn === 'username' ? 'text-primary' : ''}`}
              >
                Username
              </th>
              <th 
                onClick={() => setSearchColumn('password')} 
                className={`cursor-pointer th-hover ${searchColumn === 'password' ? 'text-primary' : ''}`}
              >
                Password
              </th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {employees.filter(employee => {
              const match = searchColumn ? 
                (employee[searchColumn] ? employee[searchColumn].toString().includes(searchTerm) : false) : 
                (employee._id && employee._id.toString().includes(searchTerm)) || 
                (employee.empId && employee.empId.toString().includes(searchTerm)) || 
                (employee.username && employee.username.includes(searchTerm)) || 
                (employee.password && employee.password.includes(searchTerm));
              console.log(`Searching in column ${searchColumn}, match: ${match}`);
              return match;
            }).map(employee => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td>{employee.username}</td>
                <td>{employee.password}</td>
                <td>
                  <button className="btn mx-2" onClick={() => handleEdit(employee)}><FontAwesomeIcon icon={faEdit} className="edit" /></button>
                  <button className="btn" onClick={() => handleDelete(employee._id)}><FontAwesomeIcon icon={faTrash} className="delete" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn my-2" onClick={() => setIsAddModalOpen(true)}><FontAwesomeIcon icon={faPlus} className="add" /></button>
        


        <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input name="empId" value={newEmployee.empId} onChange={handleNewEmployeeInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input name="username" value={newEmployee.username} onChange={handleNewEmployeeInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" value={newEmployee.password} onChange={handleNewEmployeeInputChange} className="form-control" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Close
            </Button>

            <Button variant="success" onClick={handleAddSubmit}>
              Add Employee
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Employee;