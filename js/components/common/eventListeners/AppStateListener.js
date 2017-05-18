import * as React from "react";
import { AppState } from "react-native";

export default function listenToAppState(WrappedComponent) {

  return class AppStateListener extends React.Component {

    constructor(props) {
      super(props);
      this.handleAppStateChange=this.handleAppStateChange.bind(this);
      this.state={
        active:true
      }
    }

    componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = nextAppState => this.setState({isActive:nextAppState===this.state.active});

    render() {
      return <WrappedComponent {...this.props} active={this.state.active}/>
    }
  }
}