// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import { FiSearch, FiBell } from 'react-icons/fi';

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
          {location.pathname === '/' && 'ResolveXpert'}
          {location.pathname === '/login' && 'Welcome to ResolveXpert.'}
          {isDashboard && 'ResolveXpert Dashboard'}
        </Title>

        {isDashboard && (
          <IconsWrapper>
            <BoldIcon>
              <FiSearch size={24} strokeWidth="2.5" />
            </BoldIcon>
            <BoldIcon>
              <FiBell size={24} strokeWidth="2.5" />
            </BoldIcon>
            <ProfileIcon>PR</ProfileIcon>
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
  padding: 15px 30px;
  height: 80px;
  background-color: #f5f5f5; /* Very light grey */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
  border-radius: 8px;

  @media (max-width: 768px) {
    padding: 10px 20px;
    height: 70px;
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
  font-size: 24px;
  font-family: 'Comic Sans MS', cursive, sans-serif; /* Comic Sans font for title */
  font-weight: bold;
  color: #333;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px; /* Thickness of the underline */
    background-color: black; /* Color of the underline */
    position: absolute;
    bottom: -5px; /* Adjusts position of the underline */
    left: 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const BoldIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f4f8;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e2e8f0;
    transform: scale(1.1);
  }

  svg {
    stroke-width: 2.5; /* Makes the icons appear bolder */
  }
`;

const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }
`;
