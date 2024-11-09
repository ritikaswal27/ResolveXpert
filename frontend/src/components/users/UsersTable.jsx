import React, { useContext } from 'react';
import { IssueContext } from '../../context/IssueContext';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  background-color: #f3f3f3;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 0.75rem;
  text-align: left;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export default function UsersTable() {
  const { state } = useContext(IssueContext);
  const { data, pagination } = state;
  const { page, limit } = pagination;

  const startIndex = (page - 1) * limit;
  const currentUsers = data.users.slice(startIndex, startIndex + limit);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>
              <Button onClick={() => alert(`View Profile of ${user.name}`)}>
                View Profile
              </Button>
              <Button onClick={() => alert(`Edit ${user.name}`)}>Edit</Button>
              <Button
                style={{ backgroundColor: '#ff4d4d' }}
                onClick={() => alert(`Deactivate ${user.name}`)}
              >
                Deactivate
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
