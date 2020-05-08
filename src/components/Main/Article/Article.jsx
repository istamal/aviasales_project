import React from 'react';
import styled from 'styled-components';
import PriceMenu from './PriceMenu/PriceMenu';
import Posts from './Tickets/Tickets';

const ArticleWrapper = styled.section`
  width: 100%;
  margin-left: 20px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
  `;

const Article = () => (
  <ArticleWrapper>
    <PriceMenu />
    <Posts />
  </ArticleWrapper>
);

export default Article;
