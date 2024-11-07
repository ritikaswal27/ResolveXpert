// src/components/ProfileModal.js
import React from 'react';
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
  padding: 2rem;
  border-radius: 12px;
  width: 450px;
  max-width: 90%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  display: block;
  border: 4px solid #007bff;
  margin-bottom: 1rem;
`;

const ModalHeader = styled.h2`
  font-size: 1.8rem;
  margin-top: 0;
  color: #333;
`;

const ModalContent = styled.div`
  text-align: left;
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #555;
`;

const ContentLabel = styled.span`
  font-weight: bold;
  color: #333;
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #005bb5;
  }
`;

const ProfileModal = ({ profileData, onClose }) => {
  if (!profileData) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {/* Profile Image */}
        <ProfileImage src='https://via.placeholder.com/100' alt='Profile' />

        {/* Modal Header */}
        <ModalHeader>{profileData.name}</ModalHeader>

        {/* User Details */}
        <DetailsContainer>
          <ModalContent>
            <ContentLabel>EmpId:</ContentLabel> {profileData.empId}
          </ModalContent>
          <ModalContent>
            <ContentLabel>Role:</ContentLabel> {profileData.role}
          </ModalContent>
          <ModalContent>
            <ContentLabel>Email:</ContentLabel> {profileData.email}
          </ModalContent>
          <ModalContent>
            <ContentLabel>Gender:</ContentLabel> {profileData.gender}
          </ModalContent>
          <ModalContent>
            <ContentLabel>Date of Birth:</ContentLabel>{' '}
            {new Date(profileData.dateOfBirth).toLocaleDateString()}
          </ModalContent>
          <ModalContent>
            <ContentLabel>Date of Joining:</ContentLabel>{' '}
            {new Date(profileData.dateOfJoining).toLocaleDateString()}
          </ModalContent>
        </DetailsContainer>

        {/* Close Button */}
        <ButtonContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ProfileModal;
