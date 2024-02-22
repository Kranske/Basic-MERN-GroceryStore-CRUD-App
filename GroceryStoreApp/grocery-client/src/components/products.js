// All the imported files and packages
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


function Product() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState({ productCode: '', productName: '', productPrice: '', productQuantity: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ productCode: '', productName: '', productPrice: '', productQuantity: '' });
  const [searchColumn, setSearchColumn] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/products', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(response => response.json())
      .then(data => setProducts(data));
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

  



  const handleNewProductInputChange = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const handleInputChange = (event) => {
    setEditingProduct({ ...editingProduct, [event.target.name]: event.target.value });
  };

  const handleEdit = (product) => {
    setEditingProduct({
      _id: product._id,
      productCode: product.productCode,
      productName: product.productName,
      productPrice: product.productPrice,
      productQuantity: product.productQuantity
    });
    
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:3000/products/${editingProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(editingProduct),
    });

    if (response.ok) {
      const updatedProduct = await response.json();
      setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
      setIsModalOpen(false);
      toast.info('Product updated successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  const handleDelete = (_id) => {
    confirmAlert({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const response = await fetch(`http://localhost:3000/products/${_id}`, {
              method: 'DELETE',
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
              },
            });
            if (response.ok) {
              setProducts(products.filter(product => product._id !== _id));
              toast.error('Product deleted successfully!', {
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

    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      const addedProduct = await response.json();
      setProducts(prevProducts => [...prevProducts, addedProduct]);
      setIsAddModalOpen(false);
      toast.success('Product added successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      });
    }
  };

  
  const columnNames = {
    productCode: 'Product Codes',
    productName: 'Product Names',
    productPrice: 'Product Prices',
    productQuantity: 'Product Quantities',
  };

  return (
    
    <div className="product text-center">
      <ToastContainer />

      <h1 className="text-white">Product</h1>

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
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Product ID</label>
              <input name="productCode" value={editingProduct.productCode} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input name="productName" value={editingProduct.productName} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input name="productPrice" value={editingProduct.productPrice} onChange={handleInputChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input name="productQuantity" value={editingProduct.productQuantity} onChange={handleInputChange} className="form-control" />
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
          Product Price (AUD)
        </th>
        <th 
          onClick={() => setSearchColumn('productQuantity')} 
          className={`cursor-pointer th-hover ${searchColumn === 'productQuantity' ? 'text-primary' : ''}`}
        >
          Product Quantity
        </th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody>
        {products.filter(product => {
          const match = searchColumn ? product[searchColumn].toString().includes(searchTerm) : 
            product.productCode.toString().includes(searchTerm) || 
            product.productName.includes(searchTerm) || 
            product.productPrice.toString().includes(searchTerm) ||
            product.productQuantity.toString().includes(searchTerm);
          console.log(`Searching in column ${searchColumn}, match: ${match}`);
          return match;
        }).map(product => (
            <tr key={product._id}>
              <td>{product.productCode}</td>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productQuantity}</td>
              <td>
                <button className="btn mx-2" onClick={() => handleEdit(product)}><FontAwesomeIcon icon={faEdit}className="edit"/></button>
                <button className="btn" onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faTrash} className="delete" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        <button className="btn my-2" onClick={() => setIsAddModalOpen(true)}><FontAwesomeIcon icon={faPlus} className="add"  /></button>

        <Modal show={isAddModalOpen} onHide={() => setIsAddModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label className="form-label">Product ID</label>
                <input name="productCode" value={newProduct.productCode} onChange={handleNewProductInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="productName" value={newProduct.productName} onChange={handleNewProductInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input name="productPrice" value={newProduct.productPrice} onChange={handleNewProductInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input name="productQuantity" value={newProduct.productQuantity} onChange={handleNewProductInputChange} className="form-control" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Close
            </Button>
            <Button variant="success" onClick={handleAddSubmit}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Product;