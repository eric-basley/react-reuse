import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

const App = ({label}) => {
  return (
      <span>{label}</span>
  )
}

App.propTypes = {
  //label: PropTypes.string.isRequired
  label: PropTypes.string
}

const label = store => store.label;
const selector = createSelector(label, label => { return {label} });
export default connect(selector)(App);

