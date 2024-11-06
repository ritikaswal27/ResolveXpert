// src/pages/IssueApprovalPage.js
import React, { useContext, useEffect, useState } from 'react';
import { IssueContext } from '../context/IssueContext';
import FilterBar from '../components/issueApproval/FilterBar';
import ApprovalIssueTable from '../components/issueApproval/ApprovalIssueTable';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import IssueDetailModal from '../components/issueApproval/ApprovalIssueDetailModal';

export const approveOrRejectIssue = async (issueId, status, comment) => {
  try {
    const response = await fetch(`/api/approvalIssue/${issueId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        comment,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update issue: ${response.statusText}`);
    }

    const result = await response.json();
    return result.message; // Assuming the API returns a success message in "message"
  } catch (error) {
    console.error('Error approving/rejecting issue:', error);
    throw error;
  }
};

const IssueApprovalPage = () => {
  const { state, dispatch } = useContext(IssueContext);
  const [search, setSearch] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetch('/api/employees');
        const employees = await response.json();
        dispatch({ type: 'SET_DATA', payload: { employees } });
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }
    loadEmployees();
  }, [dispatch]);

  useEffect(() => {
    async function loadApprovalIssues() {
      const { category, employee } = state.approvalFilters;
      const { field, order } = state.sort;
      const { page, limit } = state.pagination;

      const query = new URLSearchParams({
        category: category !== 'all' ? category : 'all',
        employee: employee !== 'all' ? employee : 'all',
        sortBy: field,
        order,
        page,
        limit,
      }).toString();

      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await fetch(`/api/approvalIssues?${query}`);
        const data = await response.json();
        dispatch({
          type: 'SET_DATA',
          payload: { approvalIssues: data.issues },
        });
      } catch (error) {
        console.error('Error fetching approval issues:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }

    loadApprovalIssues();
  }, [state.approvalFilters, state.sort, state.pagination, dispatch]);

  const handleApprove = async (issueId, comment) => {
    try {
      await approveOrRejectIssue(issueId, 'accepted', comment);
      removeIssueFromState(issueId);
    } catch (error) {
      console.error('Failed to approve issue:', error);
    }
  };

  const handleReject = async (issueId, comment) => {
    try {
      await approveOrRejectIssue(issueId, 'rejected', comment);
      removeIssueFromState(issueId);
    } catch (error) {
      console.error('Failed to reject issue:', error);
    }
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    dispatch({ type: 'SET_SORT', payload: { field, order } });
  };

  // Helper function to remove the issue from context state
  const removeIssueFromState = (issueId) => {
    const updatedIssues = state.data.issues.filter(
      (issue) => issue.issueId !== issueId
    );
    dispatch({ type: 'SET_DATA', payload: { issues: updatedIssues } });
  };

  return (
    <PageContainer>
      <GreetingSection>Hello, Manager!</GreetingSection>
      <DashboardContainer>
        <FilterBar />

        <MainContent>
          <IssuesFoundSection>
            <IssuesCount>
              {state.data.approvalIssues.length} Issues Found
            </IssuesCount>
            <SortSection>
              <Label>Sort By</Label>
              <Select
                value={`${state.sort.field}-${state.sort.order}`}
                onChange={handleSortChange}
              >
                <option value='createdAt-asc'>Created At (Asc)</option>
                <option value='createdAt-desc'>Created At (Desc)</option>
              </Select>
            </SortSection>
          </IssuesFoundSection>
          <ApprovalIssueTable onIssueClick={setSelectedIssue} />
          <Pagination />
        </MainContent>
      </DashboardContainer>
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </PageContainer>
  );
};

export default IssueApprovalPage;

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
  overflow: hidden;
`;

const FiltersPanel = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const IssuesFoundSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const IssuesCount = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

const SortSection = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 5px;
`;
