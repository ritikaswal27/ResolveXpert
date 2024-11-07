// src/pages/LoginPage.js
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (user) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <Container>
      <LoginBox>
        <Title>Welcome Back</Title>
        <Subtitle>
          Please log in to access your dashboard and manage issues efficiently.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type='username'
            placeholder='Enter your AID or company email'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type='submit'>Log In</LoginButton>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top:  85px;
  height: 80vh;
  background: #e0e0e0
  font-family: 'Roboto', sans-serif;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 370px;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: -15px;
`;

const Title = styled.h1`
  font-size: 31px;
  margin-bottom: 10px;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const LoginButton = styled.button`
  padding: 12px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
