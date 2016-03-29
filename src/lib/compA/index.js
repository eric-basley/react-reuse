import React, {Component, PropTypes} from 'react';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'
import { Provider } from 'react-redux';
import CompA from './app';
import EventEmitter from 'eventemitter2';

export const actionsTypes = {
  SHOW_LABEL: 'SHOW_LABEL',
}

export function showLabel(label){
  return {
    type: actionsTypes.SHOW_LABEL,
    label
  }
}

const middleware = (eventEmitter) => {
  return store => next => action => {
    const result = next(action);
    switch(action.type){
      case actionsTypes.SHOW_LABEL:
        return eventEmitter.emit(action.type, {label: result.label});
    }
    return result;
  }
};

const rootReducer = (state, action) => {
  switch(action.type){
    case actionsTypes.SHOW_LABEL:
      return {...state, label: action.label};
    default:
      return state;
  }
}

const configureStore = (eventEmitter, {label}) => {
  return createStore(
    rootReducer,
    {label},
    applyMiddleware(middleware(eventEmitter), createLogger()),
  );
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.eventEmitter = new EventEmitter();
    this.store = configureStore(this.eventEmitter, props);
  }

  showLabel = label => {
    this.store.dispatch(showLabel(label));
  }


  on(subject, cb){
    this.eventEmitter.on(subject, cb);
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.label !== this.props.label){
      this.store.dispatch(showLabel(nextProps.label));
    }
  }

  render(){
    return (
      <Provider store={this.store}>
        <CompA/>
      </Provider>
    )
  }
}

App.PropTypes = {
  label: PropTypes.string,
}


