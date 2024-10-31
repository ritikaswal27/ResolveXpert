// src/components/common/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import { FiSearch, FiBell } from 'react-icons/fi'; // Icons for search and notifications

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/employee-dashboard');

  return (
    <NavContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <ContentWrapper>
        <Title>
          {location.pathname === '/'}
          {location.pathname === '/login' && 'Welcome to ResolveXpert.'}
          {isDashboard && 'ResolveXpert'}
        </Title>

        {isDashboard && (
          <IconsWrapper>
            <FiSearch size={20} />
            <FiBell size={20} />
            <ProfileIcon>profile</ProfileIcon>
          </IconsWrapper>
        )}
      </ContentWrapper>
    </NavContainer>
  );
};

export default Navbar;

// Styled components
const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  flex: 1;
`;

const ContentWrapper = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
    flex: 3;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: center;
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

const ProfileIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
`;
