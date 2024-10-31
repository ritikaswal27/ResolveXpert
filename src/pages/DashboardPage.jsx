// src/pages/DashboardPage.js
import React from 'react';
import styled from 'styled-components';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import IssueCategories from '../components/IssueCategories';
// import MyIssues from '../components/MyIssues';

const DashboardPage = () => {
  return (
    <Container>
      {/* <Sidebar />
      <MainContent>
        <Navbar />
        <Greeting>Hello, [User]</Greeting>
        <IssueCategories />
        <MyIssues />
      </MainContent> */}
    </Container>
  );
};

export default DashboardPage;

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Greeting = styled.h2`
  margin-bottom: 20px;
`;
