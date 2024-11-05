// // src/pages/IssueApprovalPage.js
// import React, { useContext, useEffect, useState } from 'react';
// import { IssueContext } from '../context/IssueContext';
// import FilterBar from '../components/FilterBar';
// import IssueTable from '../components/ApprovalIssueTable';
// import Pagination from '../components/Pagination';
// import styled from 'styled-components';

// const PageContainer = styled.div`
//   display: flex;
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 10px;
//   }
// `;

// const FiltersPanel = styled.div`
//   width: 250px;
//   margin-right: 20px;

//   @media (max-width: 768px) {
//     width: 100%;
//     margin-right: 0;
//   }
// `;

// const MainContent = styled.div`
//   flex: 1;
// `;

// const SearchBar = styled.input`
//   width: 100%;
//   padding: 8px;
//   margin-bottom: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const ClearButton = styled.button`
//   width: 100%;
//   padding: 8px;
//   color: white;
//   background-color: #ff4d4d;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   font-size: 1rem;
//   margin-top: 10px;

//   &:hover {
//     background-color: #ff3333;
//   }
// `;

// export default function IssueApprovalPage() {
//   const { state, dispatch } = useContext(IssueContext);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     // Load the issues for approval (replace with actual data fetching)
//     async function loadIssues() {
//       dispatch({ type: 'SET_LOADING', payload: true });
//       const pendingIssues = await fetchPendingIssues(); // Replace with actual API call
//       dispatch({ type: 'SET_DATA', payload: { issues: pendingIssues } });
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }

//     loadIssues();
//   }, [dispatch]);

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     dispatch({
//       type: 'SET_APPROVAL_FILTER',
//       payload: { search: e.target.value },
//     });
//   };

//   const handleClearFilters = () => {
//     setSearch('');
//     dispatch({
//       type: 'SET_APPROVAL_FILTER',
//       payload: {
//         issueAge: 'All',
//         raisedBy: 'All',
//         sortBy: 'Submission Date (Newest)',
//       },
//     });
//   };

//   return (
//     <PageContainer>
//       <FiltersPanel>
//         <SearchBar
//           type='text'
//           placeholder='Search issues...'
//           value={search}
//           onChange={handleSearchChange}
//         />
//         <FilterBar />
//         <ClearButton onClick={handleClearFilters}>Clear Filters</ClearButton>
//       </FiltersPanel>
//       <MainContent>
//         <h1>4 Issues Found</h1>
//         <IssueTable />
//         <Pagination />
//       </MainContent>
//     </PageContainer>
//   );
// }

// src/pages/IssueApprovalPage.js
import React, { useContext, useEffect, useState } from 'react';
import { IssueContext } from '../context/IssueContext';
import FilterBar from '../components/FilterBar';
import IssueTable from '../components/ApprovalIssueTable';
import Pagination from '../components/Pagination';
import styled from 'styled-components';
import IssueDetailModal from '../components/ApprovalIssueDetailModal';

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

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 15px;
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FiltersPanel = styled.div`
  width: 250px;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const ClearButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  background-color: #ff4d4d;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ff3333;
  }
`;

export default function IssueApprovalPage() {
  const { state, dispatch } = useContext(IssueContext);
  const [search, setSearch] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Load the issues for approval (replace with actual data fetching)
    async function loadIssues() {
      dispatch({ type: 'SET_LOADING', payload: true });
      const pendingIssues = await fetchPendingIssues(); // Replace with actual API call
      dispatch({ type: 'SET_DATA', payload: { issues: pendingIssues } });
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    loadIssues();
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    dispatch({
      type: 'SET_APPROVAL_FILTER',
      payload: { search: e.target.value },
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    dispatch({
      type: 'SET_APPROVAL_FILTER',
      payload: {
        issueAge: 'All',
        raisedBy: 'All',
        sortBy: 'Submission Date (Newest)',
      },
    });
  };

  //approval issue detail modal
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
  };

  const handleCloseModal = () => {
    setSelectedIssue(null);
  };

  const handleApprove = (issueId) => {
    // Handle approve action here (e.g., API call, state update)
    alert(`Approved issue with ID: ${issueId} and Comment: ${comment}`);
    handleCloseModal();
  };

  const handleReject = (issueId) => {
    // Handle reject action here (e.g., API call, state update)
    alert(`Rejected issue with ID: ${issueId} and Comment: ${comment}`);
    handleCloseModal();
  };

  const handleCommentChange = (newComment) => {
    setComment(newComment);
  };

  return (
    <PageContainer>
      <GreetingSection>Hello, Manager!</GreetingSection>
      <DashboardContainer>
        <FiltersPanel>
          <SearchBar
            type='text'
            placeholder='Search issues...'
            value={search}
            onChange={handleSearchChange}
          />
          <FilterBar />
          <ClearButton onClick={handleClearFilters}>Clear Filters</ClearButton>
        </FiltersPanel>
        <MainContent>
          <h1>4 Issues Found</h1>
          <IssueTable onIssueClick={handleIssueClick} />
          <Pagination />
        </MainContent>
      </DashboardContainer>
      {/* Render the modal when an issue is selected */}
      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          onCommentChange={handleCommentChange}
        />
      )}
    </PageContainer>
  );
}
