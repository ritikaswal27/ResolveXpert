// src/components/UserDetailModal.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const ModalContent = styled.div`
  margin: 15px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const UserDetailModal = ({ empId, onClose }) => {
  const [userData, setUserData] = useState({
    empId: 'EMP002',
    name: 'Bob Smith',
    role: 'Employee',
    email: 'bob.smith@example.com',
    dateOfBirth: '1990-07-15',
    dateOfJoining: '2022-01-20',
    gender: 'male',
    manager: 'Alice Johnson',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${empId}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (empId) fetchUserData();
  }, [empId]);

  if (!userData) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>User Details</ModalHeader>
        <ModalContent>
          <strong>EmpId:</strong> {userData.empId}
        </ModalContent>
        <ModalContent>
          <strong>Name:</strong> {userData.name}
        </ModalContent>
        <ModalContent>
          <strong>Role:</strong> {userData.role}
        </ModalContent>
        <ModalContent>
          <strong>Email:</strong> {userData.email}
        </ModalContent>
        <ModalContent>
          <strong>Date of Birth:</strong>{' '}
          {new Date(userData.dateOfBirth).toLocaleDateString()}
        </ModalContent>
        <ModalContent>
          <strong>Date of Joining:</strong>{' '}
          {new Date(userData.dateOfJoining).toLocaleDateString()}
        </ModalContent>
        <ModalContent>
          <strong>Gender:</strong> {userData.gender}
        </ModalContent>
        <ModalContent>
          <strong>Manager:</strong> {userData.manager}
        </ModalContent>
        <ButtonContainer>
          <Button onClick={onClose}>Close</Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserDetailModal;
