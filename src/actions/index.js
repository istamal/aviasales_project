import { createAction } from 'redux-actions';
import axios from 'axios';

export const requestTickets = createAction('TICKETS_REQUESTE');
export const requestSucsess = createAction('REQUEST_SUCSESS');
export const requestFailure = createAction('REQUEST_FAILURE');


export const cheapestTickets = createAction('SHOW_CHEAPEST_TICKETS');
export const fastestTickets = createAction('SHOW_FASTEST_TICKETS');

export const allTickets = createAction('REQUEST_ALL_TICKETS');
export const withoutStopsTickets = createAction('REQUEST_TICKETS_WITHOUT_STOPS');
export const oneStopTickets = createAction('REQUEST_ONE_STOP');
export const twoStopsTickets = createAction('REQUEST_TWO_STOPS');
export const threeStopsTickets = createAction('REQUEST_THREE_STOPS');

export const addTickets = () => async (dispatch) => {
  dispatch(requestTickets());
  let obj = {
    tickets: [],
  };
  const responseOfSearchId = await axios.get('https://front-test.beta.aviasales.ru/search');
  const { searchId } = responseOfSearchId.data;
  const fetchData = async (dispatcher) => {
    try {
      const responce = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
      obj = {
        ...obj,
        tickets: [...responce.data.tickets, ...obj.tickets],
        stop: responce.data.stop,
      };
      dispatcher(requestSucsess(obj));
      if (obj.stop) {
        return dispatcher(requestSucsess(obj));
      }
      return fetchData(dispatcher);
    } catch (err) {
      return fetchData(dispatcher);
    }
  };
  fetchData(dispatch);
};
