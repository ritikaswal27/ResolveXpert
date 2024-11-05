// components/FilterBar.js
import React, { useContext } from 'react';
import { IssueContext } from '../context/IssueContext';
import styled from 'styled-components';

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export default function FilterBar() {
  const { state, dispatch } = useContext(IssueContext);

  const handleFilterChange = (e) => {
    dispatch({
      type: 'SET_APPROVAL_FILTER',
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <FilterBarContainer>
      <Select
        name='issueAge'
        value={state.approvalFilters.issueAge}
        onChange={handleFilterChange}
      >
        <option value='All'>All Ages</option>
        <option value='24hours'>Last 24 hours</option>
        <option value='7days'>Last 7 days</option>
        <option value='30days'>Last 30 days</option>
      </Select>

      <Select
        name='raisedBy'
        value={state.approvalFilters.raisedBy}
        onChange={handleFilterChange}
      >
        <option value='All'>All Employees</option>
        {state.data.assignees.map((assignee) => (
          <option key={assignee} value={assignee}>
            {assignee}
          </option>
        ))}
      </Select>

      <Select
        name='sortBy'
        value={state.approvalFilters.sortBy}
        onChange={handleFilterChange}
      >
        <option value='Submission Date (Newest)'>
          Submission Date (Newest)
        </option>
        <option value='Submission Date (Oldest)'>
          Submission Date (Oldest)
        </option>
      </Select>
    </FilterBarContainer>
  );
}
