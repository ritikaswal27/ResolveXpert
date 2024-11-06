// src/components/IssueDetailModal.js
import React, { useState } from 'react';
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

const CommentInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white;

  &:first-child {
    background-color: #ff4d4d;
  }

  &:last-child {
    background-color: #4caf50;
  }

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 15px;
  color: ${(props) => (props.success ? 'green' : 'red')};
`;

const IssueDetailModal = ({ issue, onClose, onApprove, onReject }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!issue) return null; // If no issue is selected, don't render anything

  const handleApprove = async () => {
    setLoading(true);
    setMessage('');
    try {
      await onApprove(issue.id, comment);
      setMessage('Issue approved successfully!');
    } catch (error) {
      setMessage('Failed to approve the issue.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setMessage('');
    try {
      await onReject(issue.id, comment);
      setMessage('Issue rejected successfully!');
    } catch (error) {
      setMessage('Failed to reject the issue.');
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Issue Details</ModalHeader>
        <ModalContent>
          <strong>Type:</strong> {issue.type}
        </ModalContent>
        <ModalContent>
          <strong>Title:</strong> {issue.title}
        </ModalContent>
        <ModalContent>
          <strong>Description:</strong> {issue.description}
        </ModalContent>
        <ModalContent>
          <strong>Raised By:</strong> {issue.raisedBy}
        </ModalContent>
        <ModalContent>
          <strong>Date:</strong>{' '}
          {new Date(issue.createdAt).toLocaleDateString()}
        </ModalContent>

        <ModalContent>
          <label>
            <strong>Comment:</strong>
          </label>
          <CommentInput
            placeholder='Add your comment here...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalContent>

        <ButtonContainer>
          <Button onClick={handleReject} disabled={loading}>
            {loading ? 'Processing...' : 'Reject'}
          </Button>
          <Button onClick={handleApprove} disabled={loading}>
            {loading ? 'Processing...' : 'Approve'}
          </Button>
        </ButtonContainer>

        {message && (
          <Message success={message.includes('successfully')}>
            {message}
          </Message>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default IssueDetailModal;
