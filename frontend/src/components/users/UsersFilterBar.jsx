import React, { useContext } from 'react';
import { IssueContext } from '../../context/IssueContext';
import styled from 'styled-components';

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export default function UsersFilterBar() {
  const { state, dispatch } = useContext(IssueContext);

  const handleFilterChange = (e) => {
    dispatch({
      type: 'SET_USER_FILTER',
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <FilterBarContainer>
      <Select
        name='role'
        value={state.userFilters.role}
        onChange={handleFilterChange}
      >
        <option value='All Roles'>All Roles</option>
        <option value='Employee'>Employee</option>
        <option value='Manager'>Manager</option>
        <option value='Support'>Support</option>
      </Select>

      <Select
        name='status'
        value={state.userFilters.status}
        onChange={handleFilterChange}
      >
        <option value='All Statuses'>All Statuses</option>
        <option value='Active'>Active</option>
        <option value='Inactive'>Inactive</option>
      </Select>
    </FilterBarContainer>
  );
}
