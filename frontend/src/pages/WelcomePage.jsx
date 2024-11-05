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
  height: calc(100vh - 50px); /* Adjust this if needed */s
  text-align: center;
  padding: 0 20px;
  background: linear-gradient(135deg, #d3d3d3 0%, #f0f0f0 100%); /* Soft grey gradient */
  margin-top: 0px; /* Adjusted to match the navbar height */
`;


const Title = styled.h1`
  font-size: 48px; /* Increased font size for prominence */
  font-family: 'Poppins', sans-serif;
  color: #2c3e50; /* Darker color for better readability */
  letter-spacing: 1px;
  margin-bottom: 20px; /* Added margin for spacing */

  @media (max-width: 768px) {
    font-size: 36px; /* Responsive adjustment */
  }
`;

const Subtitle = styled.h2`
  font-size: 24px; /* Adjusted font size for a clear hierarchy */
  color: #34495e; /* Slightly lighter shade for contrast */
  margin-bottom: 44px;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 18px; /* Responsive adjustment */
  }
`;

const GetStartedButton = styled.button`
  padding: 12px 30px; /* Increased padding for a more substantial button */
  font-size: 24px; /* Adjusted font size for readability */
  background-color: #007bff; /* Blue for a professional feel */
  color: #fff;
  border: none;
  border-radius: 30px; /* More rounded corners for a modern touch */
  cursor: pointer;
  transition: background-color 0.3s ease;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 10px 24px; /* Responsive adjustment */
    font-size: 18px; /* Responsive adjustment */
  }
`;

const Footer = styled.p`
  margin-top: 44px;
  font-size: 18px; /* Slightly reduced for a more professional look */
  color: #7f8c8d; /* Soft grey for subtlety */
  max-width: 800px;
  line-height: 1.6; /* Increased line height for readability */

  @media (max-width: 768px) {
    font-size: 14px; /* Responsive adjustment */
  }
`;
