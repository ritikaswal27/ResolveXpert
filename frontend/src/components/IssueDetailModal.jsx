// // src/components/dashboard/IssueModal.js
// import React from 'react';
// import styled from 'styled-components';

// const IssueDetailModal = ({ issue, onClose }) => {
//   if (!issue) return null;

//   return (
//     <Overlay onClick={onClose}>
//       <ModalContainer onClick={(e) => e.stopPropagation()}>
//         <Header>
//           <TitleSection>
//             <IssueTitle>{issue.title}</IssueTitle>
//             <IssueId>{issue.id}</IssueId>
//           </TitleSection>
//           <ButtonSection>
//             <StatusButton>{issue.status}</StatusButton>
//             <ActionsButton>Actions</ActionsButton>
//           </ButtonSection>
//           <CloseButton onClick={onClose}>✖</CloseButton>
//         </Header>

//         <MainContent>
//           <LeftSection>
//             <Section>
//               <SectionTitle>Description</SectionTitle>
//               <Description>
//                 {issue.description || 'Add a description...'}
//               </Description>
//             </Section>
//             <Section>
//               <ActivityHeader>
//                 <ActivityTitle>Activity</ActivityTitle>
//                 <ActivityTabs>
//                   <Tab>All</Tab>
//                   <Tab active>Comments</Tab>
//                   <Tab>History</Tab>
//                 </ActivityTabs>
//               </ActivityHeader>
//               <ActivityContent>
//                 {issue.comments && issue.comments.length > 0 ? (
//                   issue.comments.map((comment, index) => (
//                     <Comment key={index}>
//                       <CommentAuthor>{comment.author}</CommentAuthor>
//                       <CommentText>{comment.text}</CommentText>
//                     </Comment>
//                   ))
//                 ) : (
//                   <NoComments>No comments yet.</NoComments>
//                 )}
//                 <AddComment placeholder='Add a comment...' />
//               </ActivityContent>
//             </Section>
//           </LeftSection>

//           <RightSection>
//             <DetailsTitle>Details</DetailsTitle>
//             <DetailsList>
//               <DetailItem>
//                 <strong>Assignee:</strong> {issue.assignee}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Labels:</strong> {issue.labels || 'None'}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Parent:</strong> {issue.parent || 'None'}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Team:</strong> {issue.team}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Reporter:</strong> {issue.reporter}
//               </DetailItem>
//             </DetailsList>
//             <DateInfo>
//               Created {issue.createdAt} <br />
//               Updated {issue.updatedAt}
//             </DateInfo>
//           </RightSection>
//         </MainContent>
//       </ModalContainer>
//     </Overlay>
//   );
// };

// export default IssueDetailModal;

// // Styled Components
// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContainer = styled.div`
//   background: #fff;
//   width: 90%;
//   max-width: 1000px;
//   border-radius: 12px;
//   padding: 30px;
//   position: relative;
//   box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
//   display: flex;
//   flex-direction: column;
//   max-height: 90vh;
//   overflow-y: auto;

//   @media (max-width: 768px) {
//     width: 100%;
//     padding: 20px;
//   }
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #e0e0e0;
//   padding-bottom: 15px;
//   margin-bottom: 30px;
// `;

// const TitleSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const IssueTitle = styled.h2`
//   font-size: 28px;
//   font-weight: bold;
// `;

// const IssueId = styled.span`
//   font-size: 14px;
//   color: #666;
// `;

// const ButtonSection = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-bottom: 20px; /* Adjusted for consistent spacing */
// `;

// const StatusButton = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 10px 16px;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const ActionsButton = styled.button`
//   background: none;
//   border: 1px solid #ddd;
//   color: #666;
//   padding: 10px 16px;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
// `;

// const MainContent = styled.div`
//   display: flex;
//   gap: 30px;
//   justify-content: space-between;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const LeftSection = styled.div`
//   flex: 2;
//   margin-right: 20px;
// `;

// const AddSection = styled.div`
//   display: flex;
//   gap: 15px;
//   margin-bottom: 25px;
// `;

// const AddButton = styled.button`
//   background-color: #f4f4f8;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   padding: 8px 12px;
//   cursor: pointer;
// `;

// const AppsButton = styled(AddButton)``;

// const Section = styled.div`
//   margin-bottom: 25px;
// `;

// const SectionTitle = styled.h3`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const Description = styled.p`
//   font-size: 16px;
//   color: #666;
//   line-height: 1.6;
// `;

// const ActivityHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 15px;
// `;

// const ActivityTitle = styled.h3`
//   font-size: 20px;
//   font-weight: bold;
// `;

// const ActivityTabs = styled.div`
//   display: flex;
//   gap: 15px;
// `;

// const Tab = styled.span`
//   font-size: 16px;
//   padding: 8px 12px;
//   cursor: pointer;
//   border-radius: 5px;
//   background-color: ${({ active }) => (active ? '#e0e7ff' : '#f4f4f8')};
//   font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
// `;

// const ActivityContent = styled.div`
//   background: #f9f9f9;
//   padding: 15px;
//   border-radius: 8px;
//   max-height: 200px;
//   overflow-y: auto;
// `;

// const Comment = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 15px;
// `;

// const CommentAuthor = styled.span`
//   font-weight: bold;
//   font-size: 14px;
//   margin-bottom: 3px;
// `;

// const CommentText = styled.span`
//   font-size: 14px;
//   color: #333;
//   line-height: 1.4;
// `;

// const NoComments = styled.p`
//   font-size: 14px;
//   color: #999;
// `;

// const AddComment = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-top: 15px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 14px;
// `;

// const RightSection = styled.div`
//   flex: 1;
//   background: #f8f8f8;
//   padding: 20px;
//   border-radius: 8px;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   min-width: 200px; /* Ensure consistent width for details */
// `;

// const DetailsTitle = styled.h3`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 20px;
// `;

// const DetailsList = styled.div`
//   margin-bottom: 25px;
// `;

// const DetailItem = styled.div`
//   margin-bottom: 12px;
//   font-size: 16px;
//   line-height: 1.5;
// `;

// const DateInfo = styled.div`
//   font-size: 14px;
//   color: #999;
//   margin-top: auto;
//   line-height: 1.5;
// `;

// // src/components/dashboard/IssueModal.js
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useAuth } from '../context/AuthContext';

// const IssueModal = ({ issue, onClose }) => {
//   if (!issue) return null;
//   const { user } = useAuth();
//   const [remarks, setRemarks] = useState(issue.remarks || []); // Array of comments
//   const [newComment, setNewComment] = useState(''); // For new comment input
//   const [editableStatus, setEditableStatus] = useState(issue.status || '');
//   const [editableAssignee, setEditableAssignee] = useState(
//     issue.assignee || ''
//   );
//   const isManagerOrSupport = user.role === 'manager' || user.role === 'support';

//   // Handle Update
//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`/api/issues/${issue.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           status: editableStatus,
//           remarks: remarks, // Updated remarks array
//           assignee: editableAssignee,
//         }),
//       });

//       if (response.ok) {
//         const updatedIssue = await response.json();
//         setRemarks(updatedIssue.remarks);
//         setEditableStatus(updatedIssue.status);
//         setEditableAssignee(updatedIssue.assignee);
//         alert('Issue updated successfully');
//       } else {
//         alert('Failed to update issue');
//       }
//     } catch (error) {
//       console.error('Error updating issue:', error);
//     }
//   };

//   // Add new comment to remarks array
//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       setRemarks([...remarks, newComment]);
//       setNewComment(''); // Clear the input after adding
//     }
//   };

//   return (
//     <Overlay onClick={onClose}>
//       <ModalContainer onClick={(e) => e.stopPropagation()}>
//         <Header>
//           <TitleSection>
//             <IssueTitle>{issue.title}</IssueTitle>
//             <IssueId>{issue.id}</IssueId>
//           </TitleSection>
//           <ButtonSection>
//             <StatusButton>{editableStatus}</StatusButton>
//             {isManagerOrSupport && (
//               <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
//             )}
//           </ButtonSection>
//           <CloseButton onClick={onClose}>✖</CloseButton>
//         </Header>

//         <MainContent>
//           <LeftSection>
//             <Section>
//               <SectionTitle>Description</SectionTitle>
//               <Description>
//                 {issue.description || 'Add a description...'}
//               </Description>
//             </Section>

//             <Section>
//               <SectionTitle>Comments</SectionTitle>
//               <CommentsContainer>
//                 {remarks.map((remark, index) => (
//                   <CommentBox key={index}>
//                     <CommentText>{remark}</CommentText>
//                   </CommentBox>
//                 ))}
//               </CommentsContainer>
//               <CommentInput
//                 type='text'
//                 placeholder='Add a comment...'
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//               />
//               <AddCommentButton onClick={handleAddComment}>
//                 Add Comment
//               </AddCommentButton>
//             </Section>
//           </LeftSection>

//           <RightSection>
//             <DetailsTitle>Details</DetailsTitle>
//             <DetailsList>
//               <DetailItem>
//                 <strong>Assignee:</strong>{' '}
//                 {isManagerOrSupport ? (
//                   <AssigneeInput
//                     type='text'
//                     value={editableAssignee}
//                     onChange={(e) => setEditableAssignee(e.target.value)}
//                   />
//                 ) : (
//                   issue.assignee
//                 )}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Reporter:</strong> {issue.reporter}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Status:</strong> {issue.status}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Created:</strong> {issue.createdAt}
//               </DetailItem>
//               <DetailItem>
//                 <strong>Updated:</strong> {issue.updatedAt}
//               </DetailItem>
//             </DetailsList>
//           </RightSection>
//         </MainContent>
//       </ModalContainer>
//     </Overlay>
//   );
// };

// export default IssueModal;

// src/components/dashboard/IssueModal.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { initialState } from '../reducers/dashboardReducer';

const IssueModal = ({ issue, onClose }) => {
  if (!issue) return null;
  const { user } = useAuth();
  const [remarks, setRemarks] = useState(issue.remarks || []);
  const [newComment, setNewComment] = useState('');
  const [editableStatus, setEditableStatus] = useState(issue.status || '');
  const [editableAssignee, setEditableAssignee] = useState(
    issue.assignee || ''
  );
  const isManagerOrSupport = user.role === 'manager' || user.role === 'support';

  // Handle Update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/issues/${issue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: editableStatus,
          remarks: remarks,
          assignee: editableAssignee,
        }),
      });

      if (response.ok) {
        const updatedIssue = await response.json();
        setRemarks(updatedIssue.remarks);
        setEditableStatus(updatedIssue.status);
        setEditableAssignee(updatedIssue.assignee);
        alert('Issue updated successfully');
      } else {
        alert('Failed to update issue');
      }
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  // Add new comment to remarks array
  const handleAddComment = () => {
    if (newComment.trim()) {
      setRemarks([...remarks, newComment]);
      setNewComment('');
    }
  };

  // Status dropdown change handler
  const handleStatusChange = (event) => {
    setEditableStatus(event.target.value);
  };

  // Assignee dropdown change handler
  const handleAssigneeChange = (event) => {
    setEditableAssignee(event.target.value);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleSection>
            <IssueTitle>{issue.title}</IssueTitle>
            <IssueId>{issue.id}</IssueId>
          </TitleSection>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>

        <MainContent>
          <LeftSection>
            <Section>
              <SectionTitle>Description</SectionTitle>
              <Description>
                {issue.description || 'No description...'}
              </Description>
            </Section>

            <Section>
              <SectionTitle>Comments</SectionTitle>
              <CommentsContainer>
                {remarks.map((remark, index) => (
                  <CommentBox key={index}>
                    <CommentText>{remark}</CommentText>
                  </CommentBox>
                ))}
              </CommentsContainer>
              <CommentInput
                type='text'
                placeholder='Add a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <AddCommentButton onClick={handleAddComment}>
                Add Comment
              </AddCommentButton>
            </Section>
          </LeftSection>

          <RightSection>
            <DetailsTitle>Details</DetailsTitle>
            <DetailsList>
              <DetailItem>
                <strong>Issue Type:</strong> {issue.issue_type}
              </DetailItem>
              <DetailItem>
                <strong>Assignee:</strong>{' '}
                {isManagerOrSupport ? (
                  <StatusDropdown
                    value={editableAssignee}
                    onChange={handleAssigneeChange}
                  >
                    {/* Populate dropdown options, excluding the current assignee */}
                    {initialState.data.assignees
                      ?.filter((assignee) => assignee !== editableAssignee)
                      .map((assignee, index) => (
                        <option key={index} value={assignee}>
                          {assignee}
                        </option>
                      ))}
                    <option value={editableAssignee} key='default' disabled>
                      {editableAssignee}
                    </option>
                  </StatusDropdown>
                ) : (
                  issue.assignee
                )}
              </DetailItem>
              <DetailItem>
                <strong>Reporter:</strong> {issue.reporter}
              </DetailItem>
              <DetailItem>
                <strong>Created:</strong> {issue.createdAt}
              </DetailItem>
              <DetailItem>
                <strong>Updated:</strong> {issue.updatedAt}
              </DetailItem>
              <DetailItem>
                <strong>Status:</strong>{' '}
                {isManagerOrSupport ? (
                  <StatusDropdown
                    value={editableStatus}
                    onChange={handleStatusChange}
                  >
                    {/* Populate dropdown options, excluding the current status */}
                    {initialState.data.statuses
                      ?.filter((status) => status !== editableStatus)
                      .map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    <option value={editableStatus} key='default' disabled>
                      {editableStatus}
                    </option>
                  </StatusDropdown>
                ) : (
                  issue.status
                )}
              </DetailItem>
            </DetailsList>
            {isManagerOrSupport && (
              <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
            )}
          </RightSection>
        </MainContent>
      </ModalContainer>
    </Overlay>
  );
};

export default IssueModal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 95%;
  max-width: 1000px;
  border-radius: 12px;
  padding: 30px;
  position: relative;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 30px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IssueTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
`;

const IssueId = styled.span`
  font-size: 14px;
  color: #666;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 15px;
`;

const StatusButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
`;
const StatusDropdown = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;
const UpdateButton = styled.button`
  padding: 10px 16px;
  margin-top: 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const MainContent = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 2;
  margin-right: 20px;
`;

const Section = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
`;

const CommentsContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
`;

const CommentBox = styled.div`
  background: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

const CommentText = styled.p`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  margin: 0;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const AddCommentButton = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RightSection = styled.div`
  flex: 1;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DetailsTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DetailsList = styled.div`
  margin-bottom: 25px;
`;

const DetailItem = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.8;
`;

const AssigneeInput = styled.input`
  padding: 3px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;
