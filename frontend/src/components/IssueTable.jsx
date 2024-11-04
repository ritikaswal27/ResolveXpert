import React from 'react';
import styled from 'styled-components';

const IssueTable = ({ issues, pagination, onPageChange, onIssueClick }) => {
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
            <th>Created</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {issues.length > 0 ? (
            issues.map((issue, index) => (
              <tr key={index}>
                <td>{issue.type}</td>
                <td>
                  <Link onClick={() => onIssueClick(issue)}>{issue.title}</Link>
                </td>
                <td>
                  <StatusBadge status={issue.status}>
                    {issue.status}
                  </StatusBadge>
                </td>
                <td>{issue.assignee}</td>
                <td>{issue.reporter}</td>
                <td>{issue.created}</td>
                <td>{issue.updated}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='7'>No issues found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Pagination>
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          Previous
        </button>
        <span>Page {pagination.page}</span>
        <button onClick={() => onPageChange(pagination.page + 1)}>Next</button>
      </Pagination>
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

  @media (max-width: 768px) {
    th,
    td {
      padding: 5px;
      font-size: 12px;
    }
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

const StatusBadge = styled.span.attrs((props) => ({
  status: undefined,
}))`
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  background-color: ${(props) => {
    switch (props.status) {
      case 'To Do':
        return '#f39c12';
      case 'In Progress':
        return '#3498db';
      case 'Done':
        return '#2ecc71';
      default:
        return '#bdc3c7';
    }
  }};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 10px;

  button {
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  span {
    font-size: 16px;
    font-weight: bold;
  }
`;
