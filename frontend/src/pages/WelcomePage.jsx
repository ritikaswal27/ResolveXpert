// src/pages/StartPage.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins';

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
  justify-content: center;
  align-items: center;
  height: calc(100vh - 120px);
  text-align: center;
  padding: 0 20px;
  background-color: #f9f9f9;
  margin-top: -80px;
`;

const Title = styled.p`
  font-size: 60px;
  font-family: 'Candara', sans-serif;
  color: #333;
  ${'' /* margin-bottom: 20px; */}
  ${'' /* font-weight: bold; */}
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 40px;
  color: #333;
  margin-bottom: 44px;
  font-family: 'Candara', sans-serif;
  letter-spacing: 1px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const GetStartedButton = styled.button`
  padding: 0 26px;
  font-size: 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  letter-spacing: 3px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 12px 28px;
    font-size: 18px;
  }
`;

const Footer = styled.p`
  margin-top: 44px;
  font-size: 23px;
  color: #454242;
  max-width: 800px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
