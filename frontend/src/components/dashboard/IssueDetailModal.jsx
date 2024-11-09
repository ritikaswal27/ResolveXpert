import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { initialState } from '../../reducers/dashboardReducer';

const IssueModal = ({ issue, onClose, assignees }) => {
  if (!issue) return null;

  const { user } = useAuth();
  const [remarks, setRemarks] = useState(issue.remarks || []);
  const [newComment, setNewComment] = useState('');
  const [editableStatus, setEditableStatus] = useState(issue.status || '');
  const [editableAssigneeId, setEditableAssigneeId] = useState(
    issue.assignee?.id
  );
  const isManagerOrSupport = user.role === 'manager' || user.role === 'support';
  const isManager = user.role === 'manager';

  // Handle Update
  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/issues/${issue.issueId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          status: editableStatus,
          remarks: remarks,
          assigneeId: editableAssigneeId,
        }),
      });

      if (response.ok) {
        const updatedIssue = await response.json();
        setRemarks(updatedIssue.remarks);
        setEditableStatus(updatedIssue.status);
        setEditableAssigneeId(updatedIssue.assignee?.id);
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
    setEditableAssigneeId(event.target.value);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <TitleSection>
            <IssueTitle>{issue?.title || ''}</IssueTitle>
            <IssueId>{issue?.id || ''}</IssueId>
          </TitleSection>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </Header>

        <MainContent>
          <LeftSection>
            <Section>
              <SectionTitle>Description</SectionTitle>
              <Description>
                {issue?.description || 'No description...'}
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
                <strong>Issue Type:</strong> {issue?.issue_type || ''}
              </DetailItem>
              <DetailItem>
                <strong>Assignee:</strong>{' '}
                {isManager ? (
                  <>
                    <StatusDropdown
                      defaultValue={editableAssigneeId}
                      onChange={handleAssigneeChange}
                    >
                      {
                        <option value={editableAssigneeId} key='default'>
                          {assignees.find(
                            (assignee) => assignee?.id === editableAssigneeId
                          )?.[0]?.name || 'Not Assigned'}
                        </option>
                      }
                      {assignees
                        ?.filter(
                          (assignee) => assignee?.id !== editableAssigneeId
                        )
                        .map((assignee, index) => (
                          <option key={index} value={assignee?.id}>
                            {assignee?.name || 'Not found'}
                          </option>
                        ))}
                    </StatusDropdown>
                  </>
                ) : (
                  issue.assignee?.name || 'Not Assigned'
                )}
              </DetailItem>
              <DetailItem>
                <strong>Reporter:</strong> {issue.raisedBy?.name || 'Unknown'}
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
                  issue?.status || ''
                )}
              </DetailItem>
              <DetailItem>
                <strong>Created:</strong> {issue?.createdAt || ''}
              </DetailItem>
              <DetailItem>
                <strong>Updated:</strong> {issue?.updatedAt || ''}
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
