// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container>
      <Subtitle>
        Please log in to access your dashboard and manage issues efficiently.
      </Subtitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Enter your company email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type='submit'>Log In</LoginButton>
      </Form>
      <ForgotPassword>
        Forgot Password? <a href='/reset'>Click here to reset.</a>
      </ForgotPassword>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  margin: 20px 0;
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
`;

const LoginButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const ForgotPassword = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;
