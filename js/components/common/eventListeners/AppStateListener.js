import * as React from "react";
import { AppState } from "react-native";

export default function listenToAppState(WrappedComponent) {

  return class AppStateListener extends React.Component {

    constructor(props) {
      super(props);
      this.handleAppStateChange=this.handleAppStateChange.bind(this);
      this.state={
        currAppState:'active'
      }
    }

    componentDidMount() {
      AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this.handleAppStateChange);
    }

    //handleAppStateChange = nextAppState => console.log('nextAppState',nextAppState);
    handleAppStateChange = nextAppState => this.setState({currAppState: nextAppState});

    render() {
      return <WrappedComponent {...this.props} currentAppState={this.state.currAppState}/>
    }
  }
}