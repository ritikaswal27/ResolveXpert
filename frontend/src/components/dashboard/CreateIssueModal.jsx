import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  dashboardReducer,
  initialState,
} from '../../reducers/dashboardReducer';
import { useAuth } from '../../context/AuthContext';

const NewIssueModal = ({ onClose, onIssueCreated }) => {
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const categories = await fetch(`${url}/api/categories`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }).then((res) => res.json());

        console.log('dashboard page fetch dropdown', categories);

        dispatch({
          type: 'SET_DATA',
          payload: { categories: categories.issueType },
        });

        console.log('dashboard page dropdown after setting data', state);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchDropdownOptions();
  }, []);

  const { user, url } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    issueType: '',
  });
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [error, setError] = useState(null);
  console.log('create issue modal', state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(formData);
      const response = await axios.post(`${url}/api/issues`, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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
              required
            >
              <option value='' disabled>
                Select
              </option>
              {state.data.categories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
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
