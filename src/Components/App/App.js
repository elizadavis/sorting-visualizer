import React from 'react';
import { connect } from 'react-redux';
import { Routes } from './Routes';
import { Header, Footer } from '../Main';
import { Alerts } from '../Alerts/Alerts';
import { ALERTS_ACTIONS } from '../../Actions/actions';

class App extends React.Component {
  componentDidMount() {
    this.props.clearState();
  }

  render() {
    const { alerts } = this.props;

    return (
      <div className="app">
        <Header />
        <Alerts alerts={alerts} />
        <Routes />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { alertList: alerts } = state.alerts;

  return {
    alerts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearState: () => {
      dispatch({ type: ALERTS_ACTIONS.ALERTS_RESET });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
