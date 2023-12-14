import React, { useState } from "react";
import { Tabs, Tab, Form, Button, Card, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  //Used to change tabs between login and register
  const [key, setKey] = useState("login");
  const handleTabSelect = (k) => {
    setKey(k);
  };
  //Navigation Variable to navigate from page to page
  const navigate=useNavigate();
  //const navigate = useNavigate();

  //to collect login form data
  const [loginFormData,setLoginForm]=useState({
    userId: "",
    password: ""
  });

  //to collect registration form data
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNo: "",
    password: "",
    dob: "",
    street: "",
    aptNo: "",
    city: "",
    state: "",
    zipCode: "",
  });

  //handles the input change in Registration form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handles the input change in login form
  const handleInput = (event)=>{
    const { name, value } = event.target;
    setLoginForm({
      ...loginFormData,
      [name]: value,
    });
  }

  //form submission of login
  const loginFormSubmit=async (event)=>{
    event.preventDefault();
    console.log(loginFormData);
    let data=await fetch('https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/user?userId='+loginFormData.userId);
    const user=await data.json();

    if(user.password===loginFormData.password){
        userSession(user.userId);
        window.location.reload();
    }
    else{
        alert("Wrong Login Details");
    }
  }

  const userSession=(userId)=>{
    const seeInfo={
      userId:userId
    }
    sessionStorage.setItem('user', JSON.stringify(seeInfo));
  }
  //form submission of registeration page
  const handleFormSubmit = async (event) => {
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
      if (field.tagName === "INPUT" && field.type !== "submit") {
        const fieldName = field.id.replace("formRegister", "");
        if (field.required && field.value.trim() === "") {
          alert(`Please enter ${fieldName}`);
          isValid = false;
        }
        switch (fieldName) {
          case "Email":
            if (!isEmailValid(field.value)) {
              alert("Please enter a valid email address");
              isValid = false;
            }
            break;
          case "PhoneNo":
            if (!isPhoneNumberValid(field.value)) {
              alert("Please enter a valid 10-digit phone number");
              isValid = false;
            }
            break;
          case "Password":
            if (!isPasswordValid(field.value)) {
              alert("Password must be at least 8 characters long");
              isValid = false;
            }
            break;
          default:
            break;
        }
      }
    });
    if (isValid) {
      try {
        console.log(formData);
        const response = await fetch(
          "https://8y2d32oena.execute-api.us-east-1.amazonaws.com/prod/user",
          {
            mode: "no-cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        navigate('/');
        console.log(response);
      } catch (error) {
        console.error("Error during user registration:", error);
      }
      console.log("Form submitted successfully");
    }
  };

  return (
    <div>
    <NavigationBar/>
    <div className="auth-container d-flex align-items-center justify-content-center" style={{marginTop:'40px'}}>
      <Card style={{ width: "650px" }}>
        <Card.Body>
          <Tabs
            id="auth-tabs"
            activeKey={key}
            onSelect={handleTabSelect}
            className="mb-3 justify-content-center"
          >
            <Tab eventKey="login" title="Login">
              <Form onSubmit={loginFormSubmit}>
                <Form.Group controlId="formLoginEmail">
                  <Form.Label>UserId</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter UserId"
                    name="userId"
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInput}
                    required
                  />
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
                      <Form.Control
                        type="text"
                        placeholder="Enter User ID"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterMiddleName">
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Middle Name"
                        name="middleName"
                        value={formData.middleName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    {/* Second column */}
                    <Form.Group controlId="formRegisterLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterPhoneNo">
                      <Form.Label>Phone No</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter Phone No"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formRegisterDOB">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    {/* Third column */}
                    <Form.Group controlId="formRegisterStreet">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterAptNo">
                      <Form.Label>Apt No/House No</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Apt No/House No"
                        name="aptNo"
                        value={formData.aptNo}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterState">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formRegisterZipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Zip Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
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
    </div>
  );
};

export default AuthPage;
