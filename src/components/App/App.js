/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Header from '../Header/Header';
import Main from '../Main/Main';
import * as actions from '../../actions/index';

const actionCreators = {
  addTickets: actions.addTickets,
};

const Wrapper = styled.div`
  width: 60%;
  @media (max-width: 768px) {
    width: 95%;
  }
  margin: 0 auto;
  `;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount = () => {
    const { addTickets } = this.props;
    addTickets();
  }

  render() {
    return (
      <Wrapper className="App">
        <Header />
        <Main />
      </Wrapper>
    );
  }
}

App.propTypes = {
  addTickets: PropTypes.func.isRequired,
};

export default connect(null, actionCreators)(App);
