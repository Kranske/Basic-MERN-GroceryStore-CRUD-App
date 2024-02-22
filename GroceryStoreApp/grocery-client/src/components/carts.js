import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


function Cart() {
  const [carts, setCarts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCart, setEditingCart] = useState({ customerName: '', products: [], createdAt: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/carts', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setCarts(data));
  }, []);

  const handleInputChange = (event) => {
    setEditingCart({ ...editingCart, [event.target.name]: event.target.value });
  };

  const handleEdit = (cart) => {
    setEditingCart({
      _id: cart._id,
      customerName: cart.customerName,
      products: cart.products,
      createdAt: cart.createdAt
    });
    
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:3000/carts/${editingCart._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(editingCart),
    });

    if (response.ok) {
      const updatedCart = await response.json();
      setCarts(carts.map(cart => cart._id === updatedCart._id ? updatedCart : cart));
      setIsModalOpen(false);
      toast.info('Cart updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleDelete = (_id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this cart?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await fetch(`http://localhost:3000/carts/${_id}`, {
              method: 'DELETE',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            });
            if (response.ok) {
              setCarts(carts.filter(cart => cart._id !== _id));
              toast.error('Cart deleted successfully!', {
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

  return (
    <div className="cart text-center background-all">
      <ToastContainer />

      <h1 className="text-white">Cart</h1>
      <div className="form-group my-4">
        <input
          type="text"
          placeholder="Search for a Cart"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          className="form-control w-100"
        />
      </div>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input name="customerName" value={editingCart.customerName} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Products</label>
              <input name="products" value={editingCart.products} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Created At</label>
              <input name="createdAt" value={editingCart.createdAt} onChange={handleInputChange} className="form-control" />
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

      <div className="col-lg-12">
      <table className="table table-striped bordered-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Products</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {carts.filter(cart => 
            cart._id.includes(searchTerm) ||
            cart.customerName.includes(searchTerm) || 
            cart.products.toString().includes(searchTerm) ||
            cart.createdAt.toString().includes(searchTerm)
          ).map(cart => (
            <tr key={cart._id}>
              <td>{cart.customerName}</td>
              <td>{cart.products.join(', ')}</td>
              <td>{cart.createdAt}</td>
              <td>
                <button className="btn mx-2" onClick={() => handleEdit(cart)}><FontAwesomeIcon icon={faEdit} className="edit" /></button>
                <button className="btn" onClick={() => handleDelete(cart._id)}><FontAwesomeIcon icon={faTrash} className="delete"/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Cart;