import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const NewIssueModal = ({ onClose, onIssueCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open', // Default status
    issueType: 'Bug', // Default issue type
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/issues', formData);
      onIssueCreated(response.data); // Pass new issue data back to parent
      onClose(); // Close modal on success
    } catch (err) {
      setError('Failed to create issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>New Issue</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          {/* <label>
            Status:
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
            >
              <option value='Open'>Open</option>
              <option value='In Progress'>In Progress</option>
              <option value='Closed'>Closed</option>
            </select>
          </label> */}
          <label>
            Issue Type:
            <select
              name='issueType'
              value={formData.issueType}
              onChange={handleChange}
            >
              <option value='Bug'>Bug</option>
              <option value='Feature Request'>Feature Request</option>
              <option value='Task'>Task</option>
            </select>
          </label>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create Issue'}
          </button>
          <button type='button' onClick={onClose}>
            Cancel
          </button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewIssueModal;

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

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
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