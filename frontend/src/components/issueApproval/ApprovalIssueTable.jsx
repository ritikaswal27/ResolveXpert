// // src/components/IssueTable.js
// import React, { useContext } from 'react';
// import { IssueContext } from '../context/IssueContext';
// import styled from 'styled-components';

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   margin-top: 1rem;
//   background-color: white;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const TableRow = styled.tr`
//   border-bottom: 1px solid #ddd;

//   &:last-child {
//     border-bottom: none;
//   }
// `;

// const TableHeader = styled.th`
//   padding: 0.75rem;
//   text-align: left;
//   background-color: #f3f3f3;
//   font-weight: bold;
// `;

// const TableCell = styled.td`
//   padding: 0.75rem;
//   text-align: left;
// `;

// const TitleLink = styled.span`
//   color: #007bff;
//   cursor: pointer;
//   text-decoration: underline;

//   &:hover {
//     text-decoration: none;
//   }
// `;

// const Button = styled.button`
//   padding: 5px 10px;
//   margin: 0 5px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 3px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// export default function IssueTable({ onIssueClick }) {
//   const { state } = useContext(IssueContext);
//   const { data, pagination } = state;
//   const { page, limit } = pagination;

//   const startIndex = (page - 1) * limit;
//   const currentIssues = data.issues.slice(startIndex, startIndex + limit);

//   return (
//     <Table>
//       <thead>
//         <tr>
//           <TableHeader>Type</TableHeader>
//           <TableHeader>Title</TableHeader>
//           <TableHeader>Raised By</TableHeader>
//           <TableHeader>Submitted Date</TableHeader>
//           <TableHeader>Actions</TableHeader>
//         </tr>
//       </thead>
//       <tbody>
//         {currentIssues.map((issue) => (
//           <TableRow key={issue.id}>
//             <TableCell>{issue.type}</TableCell>
//             <TableCell>
//               <TitleLink onClick={() => onIssueClick(issue)}>
//                 {issue.title}
//               </TitleLink>
//             </TableCell>
//             <TableCell>{issue.raisedBy}</TableCell>
//             <TableCell>
//               {new Date(issue.createdAt).toLocaleDateString()}
//             </TableCell>
//             <TableCell>
//               <Button onClick={() => alert(`Approve ${issue.id}`)}>
//                 Approve
//               </Button>
//               <Button onClick={() => alert(`Reject ${issue.id}`)}>
//                 Reject
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </tbody>
//     </Table>
//   );
// }

// src/components/ApprovalIssueTable.js
import React, { useContext } from 'react';
import { IssueContext } from '../../context/IssueContext';
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

const ActionButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${(props) =>
    props.type === 'approve' ? '#4caf50' : '#ff4d4d'};
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.type === 'approve' ? '#45a049' : '#ff3333'};
  }
`;

export default function ApprovalIssueTable({
  onIssueClick,
  onApprove,
  onReject,
}) {
  const { state } = useContext(IssueContext);
  const { data, pagination } = state;
  const { page, limit } = pagination;

  const startIndex = (page - 1) * limit;
  console.log(data.issues);
  const currentIssues = data.approvalIssues.slice(
    startIndex,
    startIndex + limit
  );
  console.log(currentIssues);

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader>Category</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Raised By</TableHeader>
          <TableHeader>Submitted Date</TableHeader>
          <TableHeader>Actions</TableHeader>
        </tr>
      </thead>
      <tbody>
        {currentIssues.length > 0 ? (
          currentIssues.map((issue) => (
            <TableRow key={issue.issueId}>
              <TableCell>{issue.issueType}</TableCell>
              <TableCell>
                <TitleLink onClick={() => onIssueClick(issue)}>
                  {issue.issueTitle}
                </TitleLink>
              </TableCell>
              <TableCell>{issue.raisedBy}</TableCell>
              <TableCell>
                {new Date(issue.created).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <ActionButton
                  type='approve'
                  onClick={() => onApprove(issue.issueId)}
                >
                  Approve
                </ActionButton>
                <ActionButton
                  type='reject'
                  onClick={() => onReject(issue.issueId)}
                >
                  Reject
                </ActionButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan='5'>No issues found for approval.</TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
}
