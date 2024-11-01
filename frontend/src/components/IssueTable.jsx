// src/components/dashboard/IssueTable.js
import React from 'react';
import styled from 'styled-components';

const IssueTable = ({ filter, sort, userRole }) => {
  const issues = [
    {
      type: 'Bug',
      title: 'Login page error',
      status: 'To Do',
      assignee: 'Support',
      reporter: 'John',
    },
    // Add more issue data here
  ];

  const filteredIssues = issues.filter((issue) => {
    if (
      filter.category !== 'all' &&
      issue.type.toLowerCase() !== filter.category
    )
      return false;
    if (
      filter.status !== 'all' &&
      issue.status.toLowerCase() !== filter.status.toLowerCase()
    )
      return false;
    if (
      filter.assignee !== 'all' &&
      issue.assignee.toLowerCase() !== filter.assignee.toLowerCase()
    )
      return false;
    return true;
  });

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Reporter</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.length > 0 ? (
            filteredIssues.map((issue, index) => (
              <tr key={index}>
                <td>{issue.type}</td>
                <td>
                  <Link onClick={() => alert('Navigate to issue detail')}>
                    {issue.title}
                  </Link>
                </td>
                <td>{issue.status}</td>
                <td>
                  <Link
                    onClick={() => alert(`Show details of ${issue.assignee}`)}
                  >
                    {issue.assignee}
                  </Link>
                </td>
                <td>
                  <Link
                    onClick={() => alert(`Show details of ${issue.reporter}`)}
                  >
                    {issue.reporter}
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No issues found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default IssueTable;

// Styled Components
const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    min-width: 120px;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const Link = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
