// components/Pagination.js
import React, { useContext } from 'react';
import { IssueContext } from '../context/IssueContext';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const PageButton = styled.button`
  margin: 0 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
`;

export default function Pagination() {
  const { state, dispatch } = useContext(IssueContext);
  const { data, pagination } = state;
  const totalPages = Math.ceil(data.issues.length / pagination.limit);

  const changePage = (newPage) => {
    dispatch({ type: 'SET_PAGINATION', payload: { page: newPage } });
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => changePage(pagination.page - 1)}
        disabled={pagination.page === 1}
      >
        Previous
      </PageButton>
      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index}
          onClick={() => changePage(index + 1)}
          disabled={pagination.page === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => changePage(pagination.page + 1)}
        disabled={pagination.page === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
}
