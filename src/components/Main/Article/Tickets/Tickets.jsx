import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { PropTypes } from 'prop-types';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';

const breatheAnimation = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  background-color: transparent;
  border-radius: 50%;
  border-top: 4px solid black;
  border-right: 4px solid #ccc;
  border-bottom: 4px solid #ccc;
  border-left: 4px solid #ccc;
  animation-name: ${breatheAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 height: 50px;
`;

const TicketWrapper = styled.div`
  padding: 20px;
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  align-items: flex-end;
  background: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const Div = styled.div`
  width: 100%;
  text-align: left;
`;

const Price = styled.h1`
  margin: 0;
  font-weight: 600;
  font-size: 24px;
  color: #2196F3;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  margin-bottom: 20px;
`;

const Title = styled.div`
  text-transform: uppercase;
  color: #A0B0B9;
  line-height: 18px;
  font-size: 12px;
`;

const Val = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 10px;
  `;

const numbersOFStopsRender = (segment) => {
  if (!segment.stops.length) {
    return (
      <div>
        <Title>без пересадки</Title>
        <Val>-</Val>
      </div>
    );
  }

  if (segment.stops.length === 1) {
    return (
      <div>
        <Title>{`${segment.stops.length} пересадка`}</Title>
        <Val>{segment.stops.join(', ')}</Val>
      </div>
    );
  }

  return (
    <div>
      <Title>{`${segment.stops.length} пересадки`}</Title>
      <Val>{segment.stops.join(', ')}</Val>
    </div>
  );
};

const renderTickets = (tickets) => (
  <div>
    {tickets.map((item) => {
      const date = new Date(item.segments[0].date);
      const newDate = new Date(item.segments[0].duration * 60000);
      const date2 = new Date(item.segments[1].date);
      const newDate2 = new Date(item.segments[1].duration * 60000);

      return (
        <TicketWrapper key={_.uniqueId()}>
          <Div>
            <Price>{`${item.price} P`}</Price>
            <Title>{`${item.segments[0].origin} - ${item.segments[0].destination}`}</Title>
            <Val>{`${date.getUTCHours()}:${date.getMinutes()} - ${newDate.getUTCHours()}:${newDate.getMinutes()}`}</Val>
            <Title>{`${item.segments[1].origin} - ${item.segments[1].destination}`}</Title>
            <Val>{`${date2.getUTCHours()}:${date2.getMinutes()} - ${newDate2.getUTCHours()}:${newDate2.getMinutes()}`}</Val>
          </Div>
          <Div>
            <Title>В пути</Title>
            <Val>{`${(item.segments[0].duration / 60).toFixed()}ч ${(item.segments[0].duration % 60).toFixed()}м`}</Val>
            <Title>В пути</Title>
            <Val>{`${(item.segments[1].duration / 60).toFixed()}ч ${(item.segments[1].duration % 60).toFixed()}м`}</Val>
          </Div>
          <Div>
            <Logo alt="" src={`https://pics.avs.io/99/36/${item.carrier}.png`} />
            {numbersOFStopsRender(item.segments[0])}
            {numbersOFStopsRender(item.segments[1])}
          </Div>
        </TicketWrapper>
      );
    })}
  </div>
);

const getState = (state) => state;

const filteredTickets = createSelector(
  getState,
  ({
    tickets,
    oneStopFilter,
    cheapestTicketsFilter,
    fastestTicketsFilter,
    twoStopsFilter,
    threeStopsFilter,
    withoutStopsFilter,
  }) => {
    let filtered = tickets.all;
    const stopsNumbers = [];

    if (withoutStopsFilter) {
      stopsNumbers.push(0);
    }
    if (oneStopFilter) {
      stopsNumbers.push(1);
    }
    if (twoStopsFilter) {
      stopsNumbers.push(2);
    }
    if (threeStopsFilter) {
      stopsNumbers.push(3);
    }
    if (stopsNumbers.length > 0) {
      filtered = tickets.all.filter(
        (val) => {
          const stopsLength = val.segments[0].stops.length + val.segments[1].stops.length;
          for (let i = 0; i < stopsNumbers.length; i++) {
            if (stopsLength === stopsNumbers[i]) {
              return true;
            }
          }
          return false;
        },
      );
    }
    if (cheapestTicketsFilter) {
      const averagePrice = Math.ceil(filtered.reduce(
        (acc, item) => (acc + item.price), 0,
      ) / filtered.length);
      return filtered.filter((item) => item.price < averagePrice).slice(0, 5);
    }
    if (fastestTicketsFilter) {
      const averageDuration = Math.ceil(filtered.reduce(
        (acc, item) => (acc + item.segments[0].duration), 0,
      ) / filtered.length);
      return filtered.filter((item) => item.segments[0].duration < averageDuration).slice(0, 5);
    }
    return filtered.slice(0, 5);
  },
);

const mapStateToProps = (state) => {
  const props = {
    tickets: filteredTickets(state),
    oneStopFilter: state.oneStopFilter,
    requestStatus: state.requestStatus,
  };

  return props;
};

class Tickets extends React.Component {
  render() {
    const {
      requestStatus,
      tickets,
    } = this.props;

    if (requestStatus === 'requested') {
      return (
        <Container>
          <Circle />
        </Container>
      );
    }

    if (requestStatus === 'sucsess') {
      return renderTickets(tickets);
    }

    if (requestStatus === 'failure') {
      return (
        <h1>Упс! Что-то пошло не так, пожалуйста перезагрузите страницу.</h1>
      );
    }

    return (
      <div>
        loading...
      </div>
    );
  }
}

Tickets.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  tickets: PropTypes.array.isRequired,
  requestStatus: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Tickets);
