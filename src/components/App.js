// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AppContainer from './AppContainer';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header loading={this.props.loading} />
        <AppContainer />
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.ajaxCallsInProgress > 0
});

export default withRouter(connect(mapStateToProps)(App));
