// src/components/UserDetailModal.js
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../context/IssueContext';
import { useAuth } from '../../context/AuthContext';

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
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.primary ? '#007bff' : '#ccc')};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
`;

const UserDetailModal = ({ empId, onClose }) => {
  const { state, dispatch } = useContext(IssueContext);
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
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedManager, setSelectedManager] = useState('');
  const { url } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${url}/api/users/${empId}`);
        const data = await response.json();
        setUserData(data);
        setSelectedRole(data.role); // Set initial role
        setSelectedManager(data.managerId); // Set initial manager
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await fetch('${url}/api/employees');
        const data = await response.json();
        dispatch({ type: 'SET_DATA', payload: { employees: data } });
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    if (empId) {
      fetchUserData();
      fetchEmployees();
    }
  }, [empId, dispatch]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleManagerChange = (e) => {
    setSelectedManager(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        role: selectedRole,
        gender: userData.gender,
        managerId: selectedManager,
      };
      const response = await fetch(`${url}/api/users/${empId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update user');

      // Update local state if needed or handle success
      alert('User details updated successfully');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

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

        {/* Role dropdown */}
        <ModalContent>
          <strong>Role:</strong>
          <Select value={selectedRole} onChange={handleRoleChange}>
            {state.userFilters.role
              ?.filter((role) => role !== userData.role) // Exclude current role
              .map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
          </Select>
        </ModalContent>

        {/* Manager dropdown */}
        <ModalContent>
          <strong>Manager:</strong>
          <Select value={selectedManager} onChange={handleManagerChange}>
            <option value=''>Select a Manager</option>
            {state.data.employees?.map((manager) => (
              <option key={manager.empId} value={manager.empId}>
                {manager.name}
              </option>
            ))}
          </Select>
        </ModalContent>

        <ButtonContainer>
          <Button onClick={onClose}>Close</Button>
          <Button primary onClick={handleUpdate}>
            Update
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default UserDetailModal;
