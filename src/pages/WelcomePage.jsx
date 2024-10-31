// src/pages/StartPage.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Welcome to ResolveXpert!</Title>
      <Subtitle>Simplify issue reporting, tracking, and resolution.</Subtitle>
      <GetStartedButton onClick={() => navigate('/login')}>
        Get Started
      </GetStartedButton>
      <Footer>
        Your data is safe with us! Access your dashboard securely from any
        device.
      </Footer>
    </Container>
  );
};

export default StartPage;

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
  margin-bottom: 30px;
`;

const GetStartedButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Footer = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: #666;
`;
