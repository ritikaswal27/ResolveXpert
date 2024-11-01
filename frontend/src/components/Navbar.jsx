import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import { FiSearch, FiBell } from 'react-icons/fi'; // Icons for search and notifications

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <NavContainer>
      <NavContent>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <Title>
          {location.pathname === '/'}
          {location.pathname === '/login' && 'Welcome to ResolveXpert.'}
          {isDashboard && 'ResolveXpert'}
        </Title>

        {isDashboard && (
          <IconsWrapper>
            <FiSearch size={24} />
            <FiBell size={24} />
            <ProfileIcon>profile</ProfileIcon>
          </IconsWrapper>
        )}
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;

// Styled components
const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 10px 30px;
  height: 100px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1); /* Subtle bottom border */
  margin: 0 20px;
  position: relative;
  z-index: 8;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 80px;
    margin: 0 10px;
  }
`;

const NavContent = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  flex: 2;
  font-size: 26px;
  font-family: 'Gloria Hallelujah', sans-serif;
  font-weight: bold;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }
`;
