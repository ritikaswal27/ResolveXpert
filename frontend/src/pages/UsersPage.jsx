// src/pages/GetAllUsersPage.js
import React, { useContext, useEffect, useState } from 'react';
import { IssueContext } from '../context/IssueContext';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import UserDetailModal from '../components/users/UserDetailModal';
import { useAuth } from '../context/AuthContext';

const GetAllUsersPage = () => {
  const { state, dispatch } = useContext(IssueContext);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { user, url } = useAuth();
  console.log(state);

  useEffect(() => {
    fetchUsers();
  }, [state.userFilters, state.sort, state.pagination]);

  const fetchUsers = async () => {
    const { role, gender } = state.userFilters;
    const { field, order } = state.sort;
    const { page, limit } = state.pagination;

    const query = new URLSearchParams({
      role: role !== 'employee' ? role : 'employee',
      gender: gender !== 'male' ? gender : 'male',
      sortBy: field,
      order,
      page,
      limit,
    }).toString();

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch(`${url}/api/users?${query}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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

  const handleClearFilters = () => {
    setSearch('');
    dispatch({
      type: 'SET_USER_FILTER',
      payload: { role: 'employee', gender: 'male', search: '' },
    });
  };

  const handleUserClick = (empId) => {
    setSelectedUser(empId);
  };

  return (
    <PageContainer>
      <GreetingSection>
        Hello, {user ? user.username?.split(' ')[0] : 'User'}!
      </GreetingSection>
      <DashboardContainer>
        <FilterBarContainer>
          <SearchSection>
            <SearchInput
              type='text'
              placeholder='Search by name...'
              value={search}
              onChange={handleSearchChange}
            />
          </SearchSection>
          <FilterSection>
            <Label>Role</Label>
            <Select
              value={state.userFilters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
            >
              <option value='employee'>All</option>
              {state.data.roles?.map((r, index) => (
                <option key={index} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </FilterSection>
          <FilterSection>
            <Label>Gender</Label>
            <Select
              value={state.userFilters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <option value='male'>All</option>
              {state.data.genders?.map((g, index) => (
                <option key={index} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </FilterSection>
          <ClearFiltersButton onClick={handleClearFilters}>
            Clear Filters
          </ClearFiltersButton>
        </FilterBarContainer>

        <MainContent>
          <UsersFoundSection>
            {console.log('users page length of users', state.data.users.length)}
            <UsersCount>{state.data.users?.length} Users Found</UsersCount>
            <SortSection>
              <Label style={{}}>Sort By</Label>
              <Select
                value={`${state.sort.field}-${state.sort.order}`}
                onChange={handleSortChange}
              >
                <option value='doj-asc'>Date of Joining (Asc)</option>
                <option value='doj-desc'>Date of Joining (Desc)</option>
              </Select>
            </SortSection>
          </UsersFoundSection>
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
                state.data.users.map((user, index) => (
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

// Styled Components
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

const SortSection = styled.div`
  display: flex;
  align-items: center;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const UsersFoundSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UsersCount = styled.h2`
  font-size: 18px;
  font-weight: bold;
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
