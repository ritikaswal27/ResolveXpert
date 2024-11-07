// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      <LeftPanel>
        <GreetingSection>
          {/* <Logo>ResolveXpert</Logo> */}
          <Greeting>Welcome to ResolveXpert!</Greeting>
          <Description>
          Simplify issue reporting, tracking, and resolution.
          </Description>
        </GreetingSection>
      </LeftPanel>
      <RightPanel>
        <FormContainer onSubmit={handleSubmit}>
          <Title>Welcome Back!</Title>
          <Subtitle>
          Log in to access your dashboard and manage issues efficiently.
          </Subtitle>
          <Input
            type="email"
            placeholder="Enter your AID or company email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit">Login Now</LoginButton>
        </FormContainer>
      </RightPanel>
    </Container>
  );
};

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #e0e0e0, #9e9e9e);
  // color: #f4f4f4;
`;

const GreetingSection = styled.div`
  text-align: center;
  max-width: 500px;
  max-height: 300px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

// const Logo = styled.h2`
//   font-size: 30px;
//   margin-bottom: 30px;
//   font-weight: 700;
//   letter-spacing: 1.8px;
//   color: #ffffff;
// `;

const Greeting = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.2;
  // color: #E0E0E0;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #4A4A4A;
  margin-bottom: 30px;
  //color: #E0E0E0;
`;

const Divider = styled.div`
  width: 60px;
  height: 4px;
  background-color: #d1e8ff;
    margin: 20px auto;
  border-radius: 2px;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #f9f9f9;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Input = styled.input`
  width: 100%;
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
  width: 100%;
  padding: 14px;
  margin-top: 30px;
  font-size: 16px;
  font-weight: bold;
  color: #e0e0e0;
  background-color: #4A4A4A;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;