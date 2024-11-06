// src/components/issueApproval/FilterBar.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueContext } from '../../context/IssueContext';

const FilterBar = () => {
  const { state, dispatch } = useContext(IssueContext);

  const handleFilterChange = (payload) => {
    dispatch({ type: 'SET_APPROVAL_FILTER', payload });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_APPROVAL_FILTER',
      payload: { category: 'all', employee: 'all' },
    });
  };

  return (
    <FilterBarContainer>
      <SearchSection>
        <SearchInput
          type='text'
          placeholder='Search issues...'
          value={state.approvalFilters.search || ''}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
      </SearchSection>

      <Section>
        <Label>Category</Label>
        <Select
          value={state.approvalFilters.category || 'all'}
          onChange={(e) => handleFilterChange({ category: e.target.value })}
        >
          <option value='all'>All</option>
          {state.data.categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Employee</Label>
        <Select
          value={state.approvalFilters.employee || 'all'}
          onChange={(e) => handleFilterChange({ employee: e.target.value })}
        >
          <option value='all'>All</option>
          {state.data.employees?.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </Select>
      </Section>

      <ClearFiltersButton onClick={clearFilters}>
        Clear Filters
      </ClearFiltersButton>
    </FilterBarContainer>
  );
};

export default FilterBar;

// Styled Components
const FilterBarContainer = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  transition: transform 0.3s ease;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.visible ? 'block' : 'none')};
  }
`;

const SearchSection = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
`;

const ClearFiltersButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;
