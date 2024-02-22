import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Employee from './employee';
import Products from './products';
import Orders from './orders';
import Carts from './carts';

function Dashboard() {
  const navigate = useNavigate();

  const logout = (event) => {
    event.stopPropagation();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    
<div className="dashboard d-flex">
  <div className="d-flex flex-column bg-dark p-3 position-sticky top-0 justify-content-between side-nav" style={{width: '170px', height: '100vh'}}>
    <div className="gradient-overlay"></div>
    <div className="d-flex flex-column">
      <Link to="employee" className="text-white my-4 mx-4 text-decoration-none link-hover">Employee</Link>
      <Link to="products" className="text-white my-4 mx-4 text-decoration-none link-hover">Products</Link>
      <Link to="orders" className="text-white my-4 mx-4 text-decoration-none link-hover">Orders</Link>
      <Link to="carts" className="text-white my-4 mx-4 text-decoration-none link-hover">Carts</Link>

      <div style={{ marginTop: '60vh' }} >
        <Link to="/login" onClick={logout} className="btn mx-4 text-decoration-none text-white logout">Logout</Link>
      </div>
    </div>
  </div>
    

        <div className="main flex-grow-1 w-50 p-5 bg-lg">
            <Routes>
                <Route path="employee" element={<Employee />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="carts" element={<Carts />} />
                <Route path="/" element={<Employee />} />
            </Routes>
        </div>
    </div>
  );
}

export default Dashboard;