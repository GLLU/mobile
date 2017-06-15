import * as React from "react";
import * as Cache from '../../../lib/cache/FSVideoCache'

const isOnScreenCheck=WrappedComponent=>{

  return class IsOnScreenChecker extends React.Component {

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

    isOnScreen(props) {

      return props.navigation.index === this.state.currentPageIndex
    }

    render() {
      return <WrappedComponent {...this.props} isOnScreen={this.state.isOnScreen}/>
    }
  }
};

export default isOnScreenCheck;