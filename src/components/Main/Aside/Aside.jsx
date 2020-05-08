import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actions from '../../../actions/index';

const Ul = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const Li = styled.li`
  padding: 10px 20px;
  padding-left: 50px;
  position: relative;
  line-height: 22px;

  &:hover {
    background-color: #F1FCFF;;
  }
`;

const Input = styled.input`
  display: none;
  &:checked + label:after {
    display: inline-block;
  }
  
  &:checked + label:before {
    border: 1px solid #2196F3;
  }
`;

const Label = styled.label`

  &:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: 20px;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    border: 1px solid #9ABBCE;
  }
  &:after {
    content: "";
    display: none;
    position: absolute;
    transform: rotate(-45deg);
    top: 15px;
    left: 25px;
    width: 10px;
    height: 5px;
    border: 2px solid #2196F3;
    border-top: transparent;
    border-right: transparent;
  }
`;

const Section = styled.section`
  background-color: #fff;
  width: 250px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: left;
  align-self: flex-start;
  /* TEXT_STYLES */
  color: #4A4A4A;
  font-family: 'Open Sans' sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  /* TEXT_STYLES */
  @media (max-width: 768px) {
    align-self: center;
    margin-bottom: 20px;
  }
`;

const H1 = styled.h1`
  font-size: 12px;
  text-transform: uppercase;
  margin: 0;
  margin-top: 20px;
  text-align: center;
`;

const mapStateToProps = (state) => {
  const props = {
    tickets: state.tickets.tickets,
    allTicketsFilter: state.allTicketsFilter,
    oneStopFilter: state.oneStopFilter,
    twoStopsFilter: state.twoStopsFilter,
    threeStopsFilter: state.threeStopsFilter,
    withoutStopsFilter: state.withoutStopsFilter,
  };
  return props;
};

const actionCreators = {
  addTickets: actions.addTickets,
  allTickets: actions.allTickets,
  oneStopTickets: actions.oneStopTickets,
  twoStopsTickets: actions.twoStopsTickets,
  threeStopsTickets: actions.threeStopsTickets,
  withoutStopsTickets: actions.withoutStopsTickets,
};

const Aside = (props) => {
  const {
    allTicketsFilter,
    allTickets,
    oneStopTickets,
    oneStopFilter,
    twoStopsTickets,
    twoStopsFilter,
    threeStopsFilter,
    threeStopsTickets,
    withoutStopsTickets,
    withoutStopsFilter,
  } = props;

  return (
    <Section>
      <H1>количество пересадок</H1>
      <Ul>
        <Li>
          <Input id="1" type="checkbox" checked={allTicketsFilter} onChange={() => allTickets(allTicketsFilter)} />
          <Label htmlFor="1">Все</Label>
        </Li>
        <Li>
          <Input id="2" type="checkbox" checked={withoutStopsFilter} onChange={() => withoutStopsTickets(withoutStopsFilter)} />
          <Label htmlFor="2">Без пересадок</Label>
        </Li>
        <Li>
          <Input id="3" type="checkbox" checked={oneStopFilter} onChange={() => oneStopTickets(oneStopFilter)} />
          <Label htmlFor="3">1 пересадка</Label>
        </Li>
        <Li>
          <Input id="4" type="checkbox" checked={twoStopsFilter} onChange={() => twoStopsTickets(twoStopsFilter)} />
          <Label htmlFor="4">2 пересадки</Label>
        </Li>
        <Li>
          <Input id="5" type="checkbox" checked={threeStopsFilter} onChange={() => threeStopsTickets(threeStopsFilter)} />
          <Label htmlFor="5">3 пересадки</Label>
        </Li>
      </Ul>
    </Section>
  );
};

Aside.propTypes = {
  allTickets: PropTypes.func.isRequired,
  allTicketsFilter: PropTypes.bool.isRequired,
  oneStopFilter: PropTypes.bool.isRequired,
  oneStopTickets: PropTypes.func.isRequired,
  twoStopsTickets: PropTypes.func.isRequired,
  twoStopsFilter: PropTypes.bool.isRequired,
  threeStopsTickets: PropTypes.func.isRequired,
  threeStopsFilter: PropTypes.bool.isRequired,
  withoutStopsTickets: PropTypes.func.isRequired,
  withoutStopsFilter: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Aside);
