import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { useSidebarContext } from '../context/SidebarContext';
import { useAuthContext } from '../context/AuthContext';
import Logo from './Logo';

const Nav = () => {
  const { openSidebar } = useSidebarContext();
  const { user } = useAuthContext();

  const links = [
    { id: 1, text: 'Home', url: '/' },
    { id: 2, text: 'Login', url: '/login' },
  ];

  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <Logo />
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}>
            <FaBars />
          </button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.url}>{link.text}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link to='/employee-dashboard'>Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .nav-center {
    width: 90vw;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .nav-toggle {
    background: transparent;
    border: none;
    color: #333;
    cursor: pointer;
    svg {
      font-size: 1.8rem;
    }
  }

  .nav-links {
    display: none;
  }

  @media (min-width: 768px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 1rem;
      }
      a {
        color: #333;
        font-size: 1rem;
        text-transform: capitalize;
        letter-spacing: 0.05rem;
        padding: 0.5rem;
        &:hover {
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }
      }
    }
  }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 767px) {
    .nav-header {
      justify-content: space-between;
    }
    .nav-toggle {
      display: inline;
    }
  }
`;

export default Nav;
