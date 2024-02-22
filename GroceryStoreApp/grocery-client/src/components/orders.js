import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState({ orderNo: '', orderDate: '', custNo: '', productCode: '', productName: '', productPrice: '', productQuantity: '', total: '', modeOfPayment: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ orderNo: '', orderDate: '', custNo: '', productCode: '', productName: '', productPrice: '', productQuantity: '', total: '', modeOfPayment: '' });
  const [searchColumn, setSearchColumn] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/orders', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setOrders(data));


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

  const handleNewOrderInputChange = (event) => {
    setNewOrder({ ...newOrder, [event.target.name]: event.target.value });
  };

  const handleInputChange = (event) => {
    setEditingOrder({ ...editingOrder, [event.target.name]: event.target.value });
  };

  const handleEdit = (order) => {
    setEditingOrder({
      _id: order._id,
      orderNo: order.orderNo,
      orderDate: order.orderDate,
      custNo: order.custNo,
      productCode: order.productCode,
      productName: order.productName,
      productPrice: order.productPrice,
      productQuantity: order.productQuantity,
      total: order.total,
      modeOfPayment: order.modeOfPayment
    });
    
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:3000/orders/${editingOrder._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(editingOrder),
    });

    if (response.ok) {
      const updatedOrder = await response.json();
      setOrders(orders.map(order => order._id === updatedOrder._id ? updatedOrder : order));
      setIsModalOpen(false);
      toast.info('Order updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleDelete = (_id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this order?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await fetch(`http://localhost:3000/orders/${_id}`, {
              method: 'DELETE',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            });
            if (response.ok) {
              setOrders(orders.filter(order => order._id !== _id));
              toast.error('Order deleted successfully!', {
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

    const response = await fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(newOrder),
    });

    if (response.ok) {
      const addedOrder = await response.json();
      setOrders(prevOrders => [...prevOrders, addedOrder]);
      setIsAddModalOpen(false);
      toast.success('Order added successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const columnNames = {
    orderNo: 'Order Numbers',
    orderDate: 'Order Dates',
    custNo: 'Customer Numbers',
    productCode: 'Product Codes',
    productName: 'Product Names',
    productPrice: 'Product Prices',
    productQuantity: 'Product Quantities',
    total: 'Totals',
    modeOfPayment: 'Modes of Payment',
  };

  
  function formatDateDisplay(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }


  return (
    <div className="order text-center">
      <ToastContainer />
  
      <h1 className="text-white">Order</h1>
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
          <Modal.Title>Edit Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Order No.</label>
              <input name="orderNo" value={editingOrder.orderNo} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Order Date</label>
              <input type="date" name="orderDate" value={editingOrder.orderDate } onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Customer No.</label>
              <input name="custNo" value={editingOrder.custNo} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Code</label>
              <input name="productCode" value={editingOrder.productCode} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input name="productName" value={editingOrder.productName} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Price</label>
              <input name="productPrice" value={editingOrder.productPrice} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Product Quantity</label>
              <input name="productQuantity" value={editingOrder.productQuantity} onChange={handleInputChange} className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Total</label>
              <input name="total" value={editingOrder.total} onChange={handleInputChange} className="form-control" />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Mode of Payment</label>
              <input name="modeOfPayment" value={editingOrder.modeOfPayment} onChange={handleInputChange} className="form-control" />
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
            <th 
              onClick={() => setSearchColumn('orderNo')} 
              className={`cursor-pointer th-hover ${searchColumn === 'orderNo' ? 'text-primary' : ''}`}
            >
              Order No.
            </th>
            <th 
              onClick={() => setSearchColumn('orderDate')} 
              className={`cursor-pointer th-hover ${searchColumn === 'orderDate' ? 'text-primary' : ''}`}
            >
              Order Date
            </th>
            <th 
              onClick={() => setSearchColumn('custNo')} 
              className={`cursor-pointer th-hover ${searchColumn === 'custNo' ? 'text-primary' : ''}`}
            >
              Customer No.
            </th>
            <th 
              onClick={() => setSearchColumn('productCode')} 
              className={`cursor-pointer th-hover ${searchColumn === 'productCode' ? 'text-primary' : ''}`}
            >
              Product Code
            </th>
            <th 
              onClick={() => setSearchColumn('productName')} 
              className={`cursor-pointer th-hover ${searchColumn === 'productName' ? 'text-primary' : ''}`}
            >
              Product Name
            </th>
            <th 
              onClick={() => setSearchColumn('productPrice')} 
              className={`cursor-pointer th-hover ${searchColumn === 'productPrice' ? 'text-primary' : ''}`}
            >
              Product Price
            </th>
            <th 
              onClick={() => setSearchColumn('productQuantity')} 
              className={`cursor-pointer th-hover ${searchColumn === 'productQuantity' ? 'text-primary' : ''}`}
            >
              Product Quantity
            </th>
            <th 
              onClick={() => setSearchColumn('total')} 
              className={`cursor-pointer th-hover ${searchColumn === 'total' ? 'text-primary' : ''}`}
            >
              Total
            </th>
            <th 
              onClick={() => setSearchColumn('modeOfPayment')} 
              className={`cursor-pointer th-hover ${searchColumn === 'modeOfPayment' ? 'text-primary' : ''}`}
            >
              Mode of Payment
            </th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {orders.filter(order => {
            const match = searchColumn ? 
              (order[searchColumn] ? order[searchColumn].toString().includes(searchTerm) : false) : 
              (order.orderNo ? order.orderNo.toString().includes(searchTerm) : false) || 
              (order.orderDate ? order.orderDate.includes(searchTerm) : false) || 
              (order.custNo ? order.custNo.toString().includes(searchTerm) : false) ||
              (order.productCode ? order.productCode.toString().includes(searchTerm) : false) ||
              (order.productName ? order.productName.includes(searchTerm) : false) ||
              (order.productPrice ? order.productPrice.toString().includes(searchTerm) : false) ||
              (order.productQuantity ? order.productQuantity.toString().includes(searchTerm) : false) ||
              (order.total ? order.total.toString().includes(searchTerm) : false) ||
              (order.modeOfPayment ? order.modeOfPayment.includes(searchTerm) : false);
            console.log(`Searching in column ${searchColumn}, match: ${match}`);
            return match;
          }).map(order => (
              <tr key={order._id}>
                <td>{order.orderNo}</td>
                <td>{formatDateDisplay(order.orderDate)}</td>
                <td>{order.custNo}</td>
                <td>{order.productCode}</td>
                <td>{order.productName}</td>
                <td>{order.productPrice}</td>
                <td>{order.productQuantity}</td>
                <td>{order.total}</td>
                <td>{order.modeOfPayment}</td>
                <td>
                  <button className="btn mx-2" onClick={() => handleEdit(order)}><FontAwesomeIcon icon={faEdit} className="edit"/></button>
                  <button className="btn" onClick={() => handleDelete(order._id)}><FontAwesomeIcon icon={faTrash} className="delete" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn  my-2" onClick={() => setIsAddModalOpen(true)}><FontAwesomeIcon icon={faPlus} className="add"  /></button>
  
        <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
      <div className="mb-3">
        <label className="form-label">Order No.</label>
        <input name="orderNo" value={newOrder.orderNo} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Order Date</label>
        <input name="orderDate" type="date" value={newOrder.orderDate} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Customer No.</label>
        <input name="custNo" value={newOrder.custNo} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Code</label>
        <input name="productCode" value={newOrder.productCode} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input name="productName" value={newOrder.productName} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Price</label>
        <input name="productPrice" value={newOrder.productPrice} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Product Quantity</label>
        <input name="productQuantity" value={newOrder.productQuantity} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Total</label>
        <input name="total" value={newOrder.total} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Mode of Payment</label>
        <input name="modeOfPayment" value={newOrder.modeOfPayment} onChange={handleNewOrderInputChange} className="form-control" />
      </div>
    </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleAddSubmit}>
              Add Order
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Orders;