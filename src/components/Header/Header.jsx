import React from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';

const breatheAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const Img = styled.img`
  animation-name: ${(props) => (props.animated === 'requested' ? breatheAnimation : 'none')};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const mapStateToProps = (state) => ({
  requestStatus: state.requestStatus,
});

const Header = (props) => (
  <Img animated={props.requestStatus} src="http://localhost:3000/github.io/aviasales/Logo.svg" alt="logo" />
);

export default connect(mapStateToProps)(Header);
