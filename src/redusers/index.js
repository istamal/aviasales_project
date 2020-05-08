import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const requestStatus = handleActions({
  [actions.requestTickets]() {
    return 'requested';
  },
  [actions.requestSucsess]() {
    return 'sucsess';
  },
  [actions.requestFailure]() {
    return 'failure';
  },
}, 'none');

const cheapestTicketsFilter = handleActions({
  [actions.cheapestTickets](state, { payload }) {
    return !payload;
  },
  [actions.fastestTickets](state, { payload }) {
    return false;
  },
}, false);

const fastestTicketsFilter = handleActions({
  [actions.fastestTickets](state, { payload }) {
    return !payload;
  },
  [actions.cheapestTickets](state, { payload }) {
    return false;
  },
}, false);

const allTicketsFilter = handleActions({
  [actions.allTickets](state, { payload }) {
    return !payload;
  },
  [actions.oneStopTickets]() {
    return false;
  },
  [actions.twoStopsTickets]() {
    return false;
  },
  [actions.threeStopsTickets]() {
    return false;
  },
  [actions.withoutStopsTickets]() {
    return false;
  },
}, false);

const oneStopFilter = handleActions({
  [actions.oneStopTickets](state, { payload }) {
    return !payload;
  },
  [actions.allTickets]() {
    return false;
  },
}, false);

const twoStopsFilter = handleActions({
  [actions.twoStopsTickets](state, { payload }) {
    return !payload;
  },
  [actions.allTickets]() {
    return false;
  },
}, false);

const threeStopsFilter = handleActions({
  [actions.threeStopsTickets](state, { payload }) {
    return !payload;
  },
  [actions.allTickets]() {
    return false;
  },
}, false);

const withoutStopsFilter = handleActions({
  [actions.withoutStopsTickets](state, { payload }) {
    return !payload;
  },
  [actions.allTickets]() {
    return false;
  },
}, false);

const tickets = handleActions({
  [actions.requestSucsess](state, { payload }) {
    return {
      ...state,
      all: payload.tickets,
    };
  },
}, { all: [] });

const redusers = combineReducers({
  tickets,
  requestStatus,
  allTicketsFilter,
  oneStopFilter,
  cheapestTicketsFilter,
  fastestTicketsFilter,
  twoStopsFilter,
  threeStopsFilter,
  withoutStopsFilter,
});

export default redusers;
