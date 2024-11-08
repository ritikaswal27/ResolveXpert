import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const NewIssueTypeModal = ({ onClose, onIssueTypeCreated }) => {
  const { user, url } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    auto_accept: 'false',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? String(checked) : value, // Convert checkbox to string
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${url}/api/issues/type`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      onIssueTypeCreated(response.data); // Pass new issue type data back to parent
      onClose(); // Close modal on success
    } catch (err) {
      setError('Failed to create issue type. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>New Issue Type</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Auto Accept:
            <input
              type='checkbox'
              name='auto_accept'
              checked={formData.auto_accept === 'true'}
              onChange={handleChange}
            />
          </label>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create Issue Type'}
          </button>
          <button type='button' onClick={onClose}>
            Cancel
          </button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewIssueTypeModal;

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;

  h2 {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin: 0.5rem 0;
    font-weight: bold;
  }

  input[type='text'] {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input[type='checkbox'] {
    margin-top: 0.5rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-of-type {
      background-color: #4caf50;
      color: white;
    }

    &:last-of-type {
      background-color: #f44336;
      color: white;
      margin-left: 0.5rem;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 0.5rem;
`;
