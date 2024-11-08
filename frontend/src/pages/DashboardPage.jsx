import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/dashboard/Sidebar';
import IssueTable from '../components/dashboard/IssueTable';
import IssueDetailModal from '../components/dashboard/IssueDetailModal';
import { dashboardReducer, initialState } from '../reducers/dashboardReducer';
import { useAuth } from '../context/AuthContext';
import CreateIssueModal from '../components/dashboard/CreateIssueModal';
import NewIssueTypeModal from '../components/dashboard/NewIssueTypeModal';
import { Navigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, url } = useAuth();
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  const [isIssueTypeModalOpen, setIsIssueTypeModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch initial data for categories, statuses, and assignees
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const [categories, assignees] = await Promise.all([
          fetch(`${url}/api/categories`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }).then((res) => res.json()),

          // fetch(`${url}/api/statuses`, {
          //   headers: { Authorization: `Bearer ${user.token}` },
          // }).then((res) => res.json()),
          fetch(`${url}/api/assignees`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }).then((res) => res.json()),
        ]);
        {
          console.log('dashboard page fetch dropdown', categories, assignees);
        }
        dispatch({
          type: 'SET_DATA',
          payload: { categories: categories.issueType, assignees },
        });
        {
          console.log('dashboard page dropdown after setting data', state);
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchDropdownOptions();
  }, []);

  // Fetch issues when filter, sort, or pagination changes
  useEffect(() => {
    const fetchIssues = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { page, limit } = state.pagination;
      const { category, status, assignee } = state.filter;
      const { field, order } = state.sort;

      const query = new URLSearchParams({
        page,
        limit,
        category: category !== 'all' ? category : 'all',
        status: status !== 'all' ? status : 'all',
        assignee: assignee !== 'all' ? assignee : 'all',
        sortBy: field,
        sortOrder: order,
      });
      console.log('dashboard fetch request', query.toString());
      try {
        const response = await fetch(`${url}/api/issues?${query}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await response.json();
        console.log(
          'data received in the dashboard after fteching data on initial render',
          data
        );
        dispatch({ type: 'SET_DATA', payload: { issues: data } });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchIssues();
  }, [state.filter, state.sort, state.pagination]);

  // Add a new Issue modal ---------------------------------------
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleIssueCreated = (newIssue) => {
    console.log(newIssue);
  };

  //New Issue type modal---------------------------------------------
  const handleCreateIssueTypeClick = () => {
    setIsIssueTypeModalOpen(true);
  };

  const handleIssueTypeModalClose = () => {
    setIsIssueTypeModalOpen(false);
  };

  const handleIssueTypeCreated = (newIssueType) => {
    // Add new issue type to state or handle any UI updates
    dispatch({ type: 'ADD_ISSUE_TYPE', payload: newIssueType });
  };

  if (!user) return <Navigate to={'/login'} />;

  return (
    <Container>
      <GreetingSection>
        Hello, {user ? user.username?.split(' ')[0] : 'User'}!
      </GreetingSection>
      <DashboardContainer>
        <Sidebar
          filter={state.filter}
          onFilterChange={(payload) =>
            dispatch({ type: 'SET_FILTER', payload })
          }
          sort={state.sort}
          onSortChange={(payload) => dispatch({ type: 'SET_SORT', payload })}
          userRole={user}
          categories={state.data.categories}
          statuses={state.data.statuses}
          assignees={state.data.assignees}
        />
        <MainContent sidebarVisible={true}>
          <TopSection>
            <IssuesFound>{state.data.issues?.length} Issues Found</IssuesFound>
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
            issues={state.data.issues}
            filter={state.filter}
            sort={state.sort}
            pagination={state.pagination}
            onIssueClick={(issue) => setSelectedIssueId(issue)}
            onPageChange={(page) =>
              dispatch({ type: 'SET_PAGINATION', payload: { page } })
            }
          />

          {user && user.role === 'manager' ? (
            <CreateButton onClick={handleCreateIssueTypeClick}>
              + Create Issue Type
            </CreateButton>
          ) : (
            <CreateButton onClick={() => handleCreateClick()}>
              + Create
            </CreateButton>
          )}

          {isModalOpen && (
            <CreateIssueModal
              onClose={handleModalClose}
              onIssueCreated={handleIssueCreated}
            />
          )}

          {isIssueTypeModalOpen && (
            <NewIssueTypeModal
              onClose={handleIssueTypeModalClose}
              onIssueTypeCreated={handleIssueTypeCreated}
            />
          )}
        </MainContent>
      </DashboardContainer>
      <IssueDetailModal
        issue={selectedIssueId}
        onClose={() => setSelectedIssueId(null)}
        assignees={state.data.assignees}
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
  padding: 20px 2rem;
  font-size: 24px;
  font-weight: bold;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin: 20px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 15px;
  }
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

const MainContent = styled.div.attrs((props) => ({
  sidebarVisible: undefined,
}))`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
  position: relative;

  @media (max-width: 768px) {
    margin-left: ${(props) => (props.sidebarVisible ? '0' : '0')};
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

const CreateButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
