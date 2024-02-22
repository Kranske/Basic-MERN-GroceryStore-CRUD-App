import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import styles from '../css/login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error display
  const navigate = useNavigate(); // Instantiate useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the login API
      const response = await axios.post('http://localhost:3000/employees/login', { username, password });

      // If the credentials are valid, the server will return a JWT
      const token = response.data.token;

      // Store the JWT in local storage
      localStorage.setItem('token', token);

      // Redirect to another route
      navigate('/dashboard');
    } catch (error) {
      // Log the error and set the error state
      console.error('Error logging in:', error);
      setError('Invalid credentials');
    }
  };

  

  return (
<div className={styles['login-page']}>
  <div className={styles['login-gradient-overlay']}></div>
  <Container className={`d-flex align-items-center justify-content-center main-login`} style={{ minHeight: '100vh' }}>
    <div className="w-100 p-4 mb-5  " style={{ maxWidth: '50%', minHeight: '300px' }}>
      <div style={{ width: '100%' }}>
        <Form onSubmit={handleSubmit} className={styles['login-form']} style={{ padding: '50px 100px' }}>

        <h2 className="text-center text-white mb-5">Log In</h2>

        {error && <p className="text-danger">{error}</p>} {/* Display error message */}


        <Form.Group id="username">
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group id="password" className="mt-4 ">
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button className="w-100 mt-5" type="submit">Log In</Button>
      </Form>
    </div>
  </div>
</Container>
</div>
  );
}

export default Login;