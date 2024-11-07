import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';
import ProfileModal from './ProfileModal';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  position: sticky;
  top: 0;
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
  font-size: 1.5rem;
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
  position: relative;

  & > * {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #005bb5;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const isLoginOrStartingPage =
    location.pathname === '/login' || location.pathname === '/';

  const { user, url } = useAuth();

  const userRole = user?.role;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = async (option) => {
    setIsDropdownOpen(false);
    if (option === 'profile') {
      setIsProfileModalOpen(true);
      try {
        const response = await fetch(`${url}/api/users/${user.empId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    } else if (option === 'users' && userRole === 'manager') {
      navigate('/get-all-users');
    }
  };

  return (
    <>
      <NavbarContainer>
        <LogoContainer>
          <CompanyLogo src={logoImage} alt='Company Logo' />
          <Divider />
          <LogoText>ResolveXpert</LogoText>
        </LogoContainer>
        {!isLoginOrStartingPage && (
          <IconContainer>
            <FaSearch title='Search' />
            <FaBell title='Notifications' />
            <div
              onClick={toggleDropdown}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <FaUserCircle title='Profile' />
              {isDropdownOpen && (
                <DropdownMenu>
                  <DropdownItem onClick={() => handleOptionClick('profile')}>
                    Show Profile Detail
                  </DropdownItem>
                  {userRole === 'manager' && (
                    <DropdownItem onClick={() => handleOptionClick('users')}>
                      Get All Users
                    </DropdownItem>
                  )}
                </DropdownMenu>
              )}
            </div>
          </IconContainer>
        )}
      </NavbarContainer>

      {isProfileModalOpen && (
        <ProfileModal
          profileData={profileData}
          onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
