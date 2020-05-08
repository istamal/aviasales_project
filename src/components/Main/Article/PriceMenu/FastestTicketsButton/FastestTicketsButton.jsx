import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../../../actions';

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: ${(props) => (props.primary ? 'none' : '1px solid #DFE5EC')};
  border-radius: 0 5px 5px 0;
  background: ${(props) => (props.primary ? '#2196F3' : '#fff')};
  /* TEXT_STYLES */
  color: ${(props) => (props.primary ? '#fff' : '#4A4A4A')};
  text-transform: uppercase;
  font-family: 'Open Sans' sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  `;

const actionCreators = {
  fastestTickets: actions.fastestTickets,
};

const mapStateToProps = (state) => ({
  fastestTicketsFilter: state.fastestTicketsFilter,
});

const FastestTicketsButton = (props) => {
  const { fastestTickets, fastestTicketsFilter } = props;
  return (
    <Wrapper primary={fastestTicketsFilter} onClick={() => fastestTickets(fastestTicketsFilter)}>Самый быстрый</Wrapper>
  );
};

export default connect(mapStateToProps, actionCreators)(FastestTicketsButton);
