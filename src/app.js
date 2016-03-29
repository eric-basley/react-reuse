import React, {Component} from 'react';
import CompA, {actionsTypes} from './lib/compA';

const labelName = (label, count) => label + count;

export default class App extends Component{
  state = {
    label: "COUCOU",
    changeLabel: false,
    count: 0,
  }

  componentDidMount(){
    this.compB.showLabel(labelName(this.state.label, this.state.count) + '-compB');
    this.compA.on( actionsTypes.SHOW_LABEL, data => {
      this.compB.showLabel(data.label + '-compB');
    });
  }

  init = (e) => {
    this.setState({count: 0}, () => {
      this.compB.showLabel(labelName(this.state.label, this.state.count) + '-compB');
    });
  }

  stop = (e) => {
    e.preventDefault();
    this.setState({changeLabel: false});
  }

  start = (e) => {
    const doChangeLabel = () => {
      setTimeout( () => {
        this.setState({count: this.state.count + 1})
        const {changeLabel} = this.state;
        if(changeLabel) doChangeLabel();
      }, 500);
    }
    e.preventDefault();
    this.setState({changeLabel: true});
    doChangeLabel();
  }

  render(){
    return (
      <div>
        <button onClick={this.start}>START</button>
        <button onClick={this.stop}>STOP</button>
        <button onClick={this.init}>INIT</button>
        <CompA ref={(c) => this.compA = c} label={labelName(this.state.label, this.state.count)}/>
        <span> {' ====> '} </span>
        <CompA ref={(c) => this.compB = c}/>
      </div>
    );
  }
}


