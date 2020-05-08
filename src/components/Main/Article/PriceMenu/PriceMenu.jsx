import React from 'react';
import styled from 'styled-components';
import CheepestTicketsButton from './CheepestTicketsButton/CheepestTicketsButton';
import FastestTicketsButton from './FastestTicketsButton/FastestTicketsButton';

const PriceMenuWrapper = styled.section`
  display: flex;
  margin-bottom: 20px;
  `;

const PriceMenu = (porps) => (
  <PriceMenuWrapper>
    <CheepestTicketsButton />
    <FastestTicketsButton />
  </PriceMenuWrapper>
);

export default PriceMenu;
