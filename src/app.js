import React, {Component} from 'react';
import _ from 'lodash';

export default class App extends Component{
  state = {fruits: []};

  componentWillMount(){
    const store = this.props.store;
    store.on(fruits => {
      this.setState({fruits});
    })

    store.onEnd( () => {
      console.log("this is the end ...")
    })

    store.rollFruits();
  }

  render(){
    return (
      <div>
        <BanditManchot fruits={this.state.fruits}/>
      </div>
    );
  }
}

const BanditManchot = ({fruits}) => {
  const styles = {
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '50px',
      height: '200px',
      width: '70%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
    }
  };

  const fruitsItems = fruits.map(fruit => <FruitItem key={fruit.id} fruit={fruit}/>);

  return (
    <div style={styles.container}>
      {fruitsItems}
    </div>
  );
}

class FruitItem extends Component{
  shouldComponentUpdate(nextProps){
    return (this.props.fruit.icon !== nextProps.fruit.icon || this.props.fruit.color !== nextProps.fruit.color);
  }

  render(){
    const {fruit} = this.props;
    const styles = {
      item:{
        flexBasis: '25%',
        fontSize: '10em',
        color: fruit.color
      }
    };
    const fruitIcon =  <i className={`fa fa-${fruit.icon ? fruit.icon : 'spinner fa-spin'}`}/>;
    return (
      <div style={styles.item}>
        {fruitIcon}
      </div>
    )
  }
}

