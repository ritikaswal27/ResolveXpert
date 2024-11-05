// // components/IssueTable.js
// import React, { useContext } from 'react';
// import { IssueContext } from '../context/IssueContext';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableRow = styled.tr`
//   border-bottom: 1px solid #ddd;
// `;

// const TableCell = styled.td`
//   padding: 0.5rem;
//   text-align: left;
// `;

// const Button = styled.button`
//   margin: 0 0.5rem;
//   padding: 0.5rem;
//   cursor: pointer;
// `;

// export default function IssueTable() {
//   const { state, dispatch } = useContext(IssueContext);
//   const { data, pagination, approvalFilters } = state;
//   const { page, limit } = pagination;

//   // Filter and sort issues based on approvalFilters
//   let filteredIssues = data.issues;

//   // Apply `issueAge` filter if necessary
//   if (approvalFilters.issueAge !== 'All') {
//     const filterTime = new Date();
//     switch (approvalFilters.issueAge) {
//       case '24hours':
//         filterTime.setDate(filterTime.getDate() - 1);
//         break;
//       case '7days':
//         filterTime.setDate(filterTime.getDate() - 7);
//         break;
//       case '30days':
//         filterTime.setDate(filterTime.getDate() - 30);
//         break;
//       default:
//         break;
//     }
//     filteredIssues = filteredIssues.filter(
//       (issue) => new Date(issue.createdAt) >= filterTime
//     );
//   }

//   // Filter by `raisedBy` if not 'All'
//   if (approvalFilters.raisedBy !== 'All') {
//     filteredIssues = filteredIssues.filter(
//       (issue) => issue.raisedBy === approvalFilters.raisedBy
//     );
//   }

//   // Sort issues by `sortBy` (newest or oldest)
//   filteredIssues = filteredIssues.sort((a, b) => {
//     const dateA = new Date(a.createdAt);
//     const dateB = new Date(b.createdAt);
//     return approvalFilters.sortBy === 'Submission Date (Newest)'
//       ? dateB - dateA
//       : dateA - dateB;
//   });

//   // Paginate the filtered list
//   const startIndex = (page - 1) * limit;
//   const currentIssues = filteredIssues.slice(startIndex, startIndex + limit);

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <th>Issue Type</th>
//           <th>Title</th>
//           <th>Raised By</th>
//           <th>Submitted Date</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currentIssues.map((issue) => (
//           <TableRow key={issue.id}>
//             <TableCell>{issue.type}</TableCell>
//             <TableCell>{issue.title}</TableCell>
//             <TableCell>{issue.raisedBy}</TableCell>
//             <TableCell>{issue.createdAt}</TableCell>
//             <TableCell>
//               <Button onClick={() => handleApprove(issue.id)}>Approve</Button>
//               <Button onClick={() => handleReject(issue.id)}>Reject</Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </tbody>
//     </Table>
//   );
// }
// src/components/IssueTable.js
import React, { useContext } from 'react';
import { IssueContext } from '../context/IssueContext';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
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

const TitleLink = styled.span`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
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

export default function IssueTable({ onIssueClick }) {
  const { state } = useContext(IssueContext);
  const { data, pagination } = state;
  const { page, limit } = pagination;

  const startIndex = (page - 1) * limit;
  const currentIssues = data.issues.slice(startIndex, startIndex + limit);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Type</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Raised By</TableHeader>
          <TableHeader>Submitted Date</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody>
        {currentIssues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell>{issue.type}</TableCell>
            <TableCell>
              <TitleLink onClick={() => onIssueClick(issue)}>
                {issue.title}
              </TitleLink>
            </TableCell>
            <TableCell>{issue.raisedBy}</TableCell>
            <TableCell>
              {new Date(issue.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button onClick={() => alert(`Approve ${issue.id}`)}>
                Approve
              </Button>
              <Button onClick={() => alert(`Reject ${issue.id}`)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}
