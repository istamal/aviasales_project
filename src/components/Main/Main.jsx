import React from 'react';
import styled from 'styled-components';
import Aside from './Aside/Aside';
import Article from './Article/Article';

const MainWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  `;

const Main = (props) => (
  <MainWrapper>
    <Aside />
    <Article />
  </MainWrapper>
);

export default Main;
