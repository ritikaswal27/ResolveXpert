// src/components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import logoImage from '../assets/logo.png'; // Make sure to add a sample logo image in this path

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  position: sticky; /* Optional: Make it stick to the top */
  top:0;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Divider = styled.div`
  width: 1px;
  height: 30px;
  background-color: #ddd;
`;

const LogoText = styled.h1`
  font-size: 1.5rem; /* Slightly larger font size */
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.2rem;
  color: #333;

  & > * {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #005bb5; /* Darker blue on hover for interactivity */
    }
  }
`;

const Navbar = () => {
  const location = useLocation();
  const isLoginOrStartingPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <NavbarContainer>
      <LogoContainer>
        <CompanyLogo src={logoImage} alt="Company Logo" />
        <Divider />
        <LogoText>ResolveXpert</LogoText>
      </LogoContainer>
      {!isLoginOrStartingPage && (
        <IconContainer>
          <FaSearch title="Search" />
          <FaBell title="Notifications" />
          <FaUserCircle title="Profile" />
        </IconContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;