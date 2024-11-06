import React from 'react';
import styled from 'styled-components';
import { initialState } from '../../reducers/dashboardReducer';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  userRole,
  categories,
  statuses,
  assignees,
}) => {
  const { user } = useAuth();
  const isSupport = user.role === 'support';
  return (
    <SidebarContainer>
      <SearchSection>
        <SearchInput
          type='text'
          placeholder='Search issues...'
          value={filter.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </SearchSection>

      <Section>
        <Label>Category</Label>
        <Select
          value={filter.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value='all'>All</option>
          {categories.map((category) => (
            <option key={category.id} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Status</Label>
        <Select
          value={filter.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value='all'>All</option>
          {statuses.map((status) => (
            <option key={status.id} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Assignee</Label>
        <Select
          value={filter.assignee}
          onChange={(e) => onFilterChange({ assignee: e.target.value })}
        >
          <option value='all'>All</option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee}>
              {assignee}
            </option>
          ))}
        </Select>
      </Section>

      {isSupport && (
        <Section>
          <CheckboxLabel>
            <input
              type='checkbox'
              checked={filter.onlyMyIssues}
              onChange={(e) =>
                onFilterChange({ onlyMyIssues: e.target.checked })
              }
            />
            Issues assigned to me
          </CheckboxLabel>
        </Section>
      )}

      <ClearFiltersButton onClick={() => onFilterChange(initialState.filter)}>
        Clear Filters
      </ClearFiltersButton>
    </SidebarContainer>
  );
};

export default Sidebar;

// Styled Components
const SidebarContainer = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  transition: transform 0.3s ease;
  height: auto;
  margin-left: 20px;

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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
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
