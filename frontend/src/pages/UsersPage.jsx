// src/pages/GetAllUsersPage.js
import React, { useContext, useEffect, useState } from 'react';
import { IssueContext } from '../context/IssueContext';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import UserDetailModal from '../components/users/UserDetailModal';

const GetAllUsersPage = () => {
  const { state, dispatch } = useContext(IssueContext);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // For modal

  useEffect(() => {
    fetchUsers();
  }, [state.userFilters, state.sort, state.pagination]);

  const fetchUsers = async () => {
    const { role, gender } = state.userFilters;
    const { field, order } = state.sort;
    const { page, limit } = state.pagination;

    const query = new URLSearchParams({
      role: role !== 'all' ? role : 'all',
      gender: gender !== 'all' ? gender : 'all',
      sortBy: field,
      order,
      page,
      limit,
    }).toString();

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch(`/api/users?${query}`);
      const data = await response.json();
      dispatch({ type: 'SET_DATA', payload: { users: data.users } });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    dispatch({ type: 'SET_SORT', payload: { field, order } });
  };

  const handleFilterChange = (field, value) => {
    dispatch({ type: 'SET_USER_FILTER', payload: { [field]: value } });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    handleFilterChange('search', e.target.value);
  };

  const handleUserClick = (empId) => {
    setSelectedUser(empId); // Open modal with selected user details
  };

  return (
    <PageContainer>
      <GreetingSection>Users Management</GreetingSection>
      <DashboardContainer>
        <FilterBarContainer>
          <FilterSection>
            <Label>Role</Label>
            <Select
              value={state.userFilters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
            >
              <option value='All Roles'>All</option>
              <option value='Employee'>Employee</option>
              <option value='Manager'>Manager</option>
            </Select>
          </FilterSection>

          <FilterSection>
            <Label>Gender</Label>
            <Select
              value={state.userFilters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value='All Genders'>All Genders</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </Select>
          </FilterSection>

          <SearchSection>
            <SearchInput
              type='text'
              placeholder='Search by name...'
              value={search}
              onChange={handleSearchChange}
            />
          </SearchSection>

          <SortSection>
            <Label>Sort By</Label>
            <Select
              value={`${state.sort.field}-${state.sort.order}`}
              onChange={handleSortChange}
            >
              <option value='dateOfJoining-asc'>Date of Joining (Asc)</option>
              <option value='dateOfJoining-desc'>Date of Joining (Desc)</option>
            </Select>
          </SortSection>
        </FilterBarContainer>

        <MainContent>
          <UsersTable>
            <thead>
              <tr>
                <TableHeader>EmpId</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Gender</TableHeader>
                <TableHeader>Date of Joining</TableHeader>
              </tr>
            </thead>
            <tbody>
              {state.data.users.length > 0 ? (
                state.data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.empId}</TableCell>
                    <TableCell>
                      <NameLink onClick={() => handleUserClick(user.empId)}>
                        {user.name}
                      </NameLink>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>
                      {new Date(user.dateOfJoining).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan='6'>No users found.</TableCell>
                </TableRow>
              )}
            </tbody>
          </UsersTable>
          <Pagination />
        </MainContent>
      </DashboardContainer>

      {selectedUser && (
        <UserDetailModal
          empId={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </PageContainer>
  );
};

export default GetAllUsersPage;

// Additional styled components
const NameLink = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
`;

const GreetingSection = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: left;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
`;

const FilterBarContainer = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  margin-right: 20px;
`;

const FilterSection = styled.div`
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

const SortSection = styled.div`
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  background-color: #f3f3f3;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  text-align: left;
`;
