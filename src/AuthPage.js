// AuthPage.js

import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Card, Row, Col } from 'react-bootstrap';

const AuthPage = () => {
  const [key, setKey] = useState('login');
  const handleTabSelect = (k) => {
    setKey(k);
  };
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNo: '',
    password: '',
    dob: '',
    street: '',
    aptNo: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit =async (event) => {
    event.preventDefault();
    const form = event.target;
    let isValid = true;
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const isPhoneNumberValid = (phone) => {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(phone);
    };
    const isPasswordValid = (password) => {
      return password.length >= 8;
    };
    Array.from(form.elements).forEach((field) => {
      if (field.tagName === 'INPUT' && field.type !== 'submit') {
        const fieldName = field.id.replace('formRegister', '');
        if (field.required && field.value.trim() === '') {
          alert(`Please enter ${fieldName}`);
          isValid = false;
        }
        switch (fieldName) {
          case 'Email':
            if (!isEmailValid(field.value)) {
              alert('Please enter a valid email address');
              isValid = false;
            }
            break;
          case 'PhoneNo':
            if (!isPhoneNumberValid(field.value)) {
              alert('Please enter a valid 10-digit phone number');
              isValid = false;
            }
            break;
          case 'Password':
            if (!isPasswordValid(field.value)) {
              alert('Password must be at least 8 characters long');
              isValid = false;
            }
            break;
          default:
            break;
        }
      }
    });
    if (isValid) {
      try{
        const response = await fetch('https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Message from the backend
            // Additional actions after successful registration
          } else {
            console.error('User registration failed');
          }
      }
      catch(error){
        console.error('Error during user registration:', error);
      }
      console.log('Form submitted successfully');

      // Perform further actions such as API calls, etc.
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <Card style={{ width: '650px' }}>
        <Card.Body>
          <Tabs
            id="auth-tabs"
            activeKey={key}
            onSelect={handleTabSelect}
            className="mb-3 justify-content-center"
          >
          <Tab eventKey="login" title="Login">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formLoginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Tab>

            <Tab eventKey="register" title="Register">
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col md={4}>
                    {/* First column */}
                    <Form.Group controlId="formRegisterUserId">
                      <Form.Label>User ID</Form.Label>
                      <Form.Control type="text" placeholder="Enter User ID" required />
                    </Form.Group>
                    
                

                    <Form.Group controlId="formRegisterEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter First Name" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterMiddleName">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Middle Name" />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    {/* Second column */}
                    <Form.Group controlId="formRegisterLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Last Name" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterPhoneNo">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control type="tel" placeholder="Enter Phone No" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group controlId="formRegisterDOB">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" required />
                </Form.Group>
                  </Col>

                  <Col md={4}>
                    {/* Third column */}
                    <Form.Group controlId="formRegisterStreet">
                      <Form.Label>Street</Form.Label>
                      <Form.Control type="text" placeholder="Enter Street" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterAptNo">
                      <Form.Label>Apt No/House No</Form.Label>
                      <Form.Control type="text" placeholder="Enter Apt No/House No" />
                    </Form.Group>

                    <Form.Group controlId="formRegisterCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" placeholder="Enter City" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterState">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" placeholder="Enter State" required />
                    </Form.Group>

                    <Form.Group controlId="formRegisterZipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control type="text" placeholder="Enter Zip Code" required />
                    </Form.Group>
                  </Col>
                </Row>

                
                

                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AuthPage;
