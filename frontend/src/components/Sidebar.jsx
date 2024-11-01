// src/components/dashboard/Sidebar.js
import React from 'react';
import styled from 'styled-components';

const Sidebar = ({ filter, onFilterChange, sort, onSortChange, userRole }) => {
  return (
    <SidebarContainer>
      <Section>
        <Label>Category</Label>
        <Select
          value={filter.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
        >
          <option value='all'>All</option>
          <option value='bug'>Bug</option>
          <option value='feature'>Feature</option>
          <option value='task'>Task</option>
        </Select>
      </Section>

      <Section>
        <Label>Status</Label>
        <Select
          value={filter.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value='all'>All</option>
          <option value='to-do'>To Do</option>
          <option value='in-progress'>In Progress</option>
          <option value='done'>Done</option>
        </Select>
      </Section>

      <Section>
        <Label>Assignee</Label>
        <Select
          value={filter.assignee}
          onChange={(e) => onFilterChange({ assignee: e.target.value })}
        >
          <option value='all'>All</option>
          <option value='support'>Support Team</option>
          <option value='self'>Only Me</option>
        </Select>
      </Section>

      <Section>
        <CheckboxLabel>
          <input
            type='checkbox'
            checked={filter.onlyMyIssues}
            onChange={(e) => onFilterChange({ onlyMyIssues: e.target.checked })}
          />
          Show only my issues
        </CheckboxLabel>
      </Section>

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

  @media (max-width: 768px) {
    width: 100%;
    display: ${(props) => (props.visible ? 'block' : 'none')};
  }
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
