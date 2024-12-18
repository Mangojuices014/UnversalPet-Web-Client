import React, { useEffect, useState } from "react";
import { BsPersonFill, BsLockFill } from "react-icons/bs";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { jwtDecode } from "jwt-decode";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "./AuthService";
import UseMessageAlerts from "../hooks/UseMessageAlerts";
import AlertMessage from "../common/AlertMessage";
import { colors } from "@mui/material";
import { LOGIN_URL_FACEBOOK, LOGIN_URL_GOOGLE } from "../utils/url";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { errorMessage, setErrorMessage, showErrorAlert, setShowErrorAlert } =
    UseMessageAlerts();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRedirectGoogle = () => {
    window.open(LOGIN_URL_GOOGLE, "_self", '');
  }

  const handleRedirectFacebook = () => {
    window.location.href = LOGIN_URL_FACEBOOK;
  }


  useEffect(() => {
    let isAuth = localStorage.getItem("authToken");
    if (isAuth && isAuth !== 'undefined') {
      navigate(-1);  // Điều hướng quay lại trang trước đó
    }
  }, [navigate]); // Hook phụ thuộc vào navigate để đảm bảo nó luôn có sẵn

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setErrorMessage("Please, enter a valid username and password");
      setShowErrorAlert(true);
      return;
    }
    try {
      const data = await loginUser(credentials.email, credentials.password);
      localStorage.setItem("authToken", data.token);
      const decoded = jwtDecode(data.token);
      localStorage.setItem("userRoles", JSON.stringify(decoded.roles));
      localStorage.setItem("userId", decoded.id);
      clearLoginForm();
      navigate(from, { replace: true });
      window.location.reload();
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.data);
        setShowErrorAlert(true);
      } else if (error.request) {
        // Lỗi từ request (không nhận được phản hồi)
        console.error('Không nhận được phản hồi:', error.request);
      } else {
        // Lỗi khác
        console.error('Lỗi:', error.message);
      }
    }
  };

  const clearLoginForm = () => {
    setCredentials({ email: "", password: "" });
    setShowErrorAlert(false);
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col sm={6}>
          <Card>
            {showErrorAlert && (
              <AlertMessage type={"danger"} message={errorMessage} />
            )}

            <Card.Body>
              <Card.Title className='text-center mb-4'>Login</Card.Title>
              <Form onSubmit={handleLogin}>
                <Form.Group className='mb-3' controlId='username'>
                  <Form.Label>Username</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsPersonFill /> {/* User icon */}
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name='email'
                      value={credentials.email}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsLockFill /> {/* Lock icon */}
                    </InputGroup.Text>
                    <Form.Control
                      type='password'
                      name='password'
                      value={credentials.password}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Button
                  variant='outline-primary'
                  type='submit'
                  className='w-100'>
                  Login
                </Button>
                <p className="d-flex align-items-center justify-content-center mt-2 mb-2" style={{ colors: "#00FFFF" }}>Or</p>
                <Link
                  to="#"
                  onClick={handleRedirectFacebook}
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block mx-2 my-2"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                </Link>
                <Link
                  to="#"
                  onClick={handleRedirectGoogle}
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block mx-2 my-2"
                  style={{ backgroundColor: "#A52A2A" }}
                  href="#"
                >
                  <i className="fab fa-google me-2"></i>Continue with Google</Link>
              </Form>
              <div className='text-center mt-2'>
                Don't have an accoount yet?{" "}
                <Link to={"/register-user"} style={{ textDecoration: "none" }}>
                  Register here
                </Link>


                <div className='mt-2'>
                  <Link
                    to={"/password-rest-request"}
                    style={{ textDecoration: "none" }}>
                    Forgot Password?
                  </Link>
                </div>

              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
