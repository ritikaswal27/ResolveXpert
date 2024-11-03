// src/pages/LoginPage.js
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/Book-reading.svg';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid login credentials. Please try again.');
    }
  };

  return (
    <Background>
      <LoginWrapper>
        <LoginCard>
          <Title>Welcome Back</Title>
          <Subtitle>Log in to access your dashboard</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type='email'
              placeholder='Company Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <ErrorText>{error}</ErrorText>}
            <LoginButton type='submit'>Log In</LoginButton>
          </Form>
          <ForgotPassword>
            Forgot Password? <a href='/reset'>Reset it here</a>.
          </ForgotPassword>
        </LoginCard>
      </LoginWrapper>
    </Background>
  );
};

export default LoginPage;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  color: #333;
  overflow: hidden;     
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%; /* Set the width of the right side */
  height: 100%;
  padding-right: 5%; /* Adjust this to control distance from the right edge */
`;

const LoginCard = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 360px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #1a202c;
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  font-size: 14px;
  color: #718096;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.3);
  }
`;

const ErrorText = styled.p`
  color: #e53e3e;
  font-size: 14px;
`;

const LoginButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 5px;
  background-color: #4a90e2;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b7bce;
  }
`;

const ForgotPassword = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #718096;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
