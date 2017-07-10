import * as React from "react";
import * as Cache from '../../../lib/cache/FSVideoCache'
import { connect } from 'react-redux';

const isOnScreenCheck=WrappedComponent=>{

  class IsOnScreenChecker extends React.Component {

    static propTypes={
      navigation:React.PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props);
      this.state={
        currentPageIndex:props.navigation.index,
        isOnScreen: true
      }
    }

    componentWillReceiveProps(nextProps){
      const nextStatus=this.isOnScreen(nextProps);
      if(nextStatus !== this.state.isOnScreen){
        this.setState({isOnScreen: nextStatus});
      }
    }

    isOnScreen(props) { //TODO will be refactored after we will refactor redux containers
      return props.navigation.index === this.state.currentPageIndex || props.navigation.index === 0 //When the current media is mounted it will save the index of the screen is created on, then we will check if this screen is on the front/show all media if on feed
    }

    render() {
      return <WrappedComponent {...this.props} isOnScreen={this.state.isOnScreen}/>
    }
  }
  const mapStateToProps = state => {
    return {
      navigation: state.cardNavigation,
    };
  };

  return connect(mapStateToProps)(IsOnScreenChecker)
};

export default isOnScreenCheck;