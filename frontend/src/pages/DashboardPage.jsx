// src/pages/DashboardPage.js
import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import IssueTable from '../components/IssueTable';
import IssueModal from '../components/IssueModal';
import { useAuth } from '../context/AuthContext';

const initialState = {
  filter: {
    category: 'all',
    status: 'all',
    assignee: 'all',
    onlyMyIssues: false,
  },
  sort: {
    field: 'createdAt',
    order: 'asc',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <Container>
      <GreetingSection>
        Hello, {user ? user.split(' ')[0] : 'User'}!
      </GreetingSection>
      <DashboardContainer>
        <SidebarToggle onClick={() => setSidebarVisible(!sidebarVisible)}>
          {sidebarVisible ? 'Hide Filters' : 'Show Filters'}
        </SidebarToggle>
        {sidebarVisible && (
          <Sidebar
            filter={state.filter}
            onFilterChange={(payload) =>
              dispatch({ type: 'SET_FILTER', payload })
            }
            sort={state.sort}
            onSortChange={(payload) => dispatch({ type: 'SET_SORT', payload })}
            userRole={user}
          />
        )}
        <MainContent sidebarVisible={sidebarVisible}>
          <TopSection>
            <IssuesFound>{/* 0 */} Issues Found</IssuesFound>
            <SortSection>
              <Label>Sort By</Label>
              <Select
                value={`${state.sort.field}-${state.sort.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  dispatch({ type: 'SET_SORT', payload: { field, order } });
                }}
              >
                <option value='createdAt-asc'>Created At (Asc)</option>
                <option value='createdAt-desc'>Created At (Desc)</option>
                <option value='updatedAt-asc'>Updated At (Asc)</option>
                <option value='updatedAt-desc'>Updated At (Desc)</option>
              </Select>
            </SortSection>
          </TopSection>
          <IssueTable
            filter={state.filter}
            sort={state.sort}
            userRole={user}
            onIssueClick={(issue) => setSelectedIssue(issue)}
          />
        </MainContent>
      </DashboardContainer>
      <IssueModal
        issue={selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />
    </Container>
  );
};

export default DashboardPage;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const GreetingSection = styled.div`
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 10px 0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ sidebarVisible }) => (sidebarVisible ? '0' : '0')};
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const IssuesFound = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
`;
