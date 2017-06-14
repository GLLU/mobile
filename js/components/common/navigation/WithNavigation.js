import React,{Component} from "react";
import WithAnalytics from '../analytics/WithAnalytics'
import {NavigationActions} from "react-navigation";
import {Alert} from "react-native";


export default function withNavigation(WrappedComponent) {

  class WithNavigation extends Component {
    constructor(props) {
      super(props);
      this.navigateTo=this.navigateTo.bind(this);
      this.goBack=this.goBack.bind(this);
      this.resetTo=this.resetTo.bind(this);
      this.resetWithPayload=this.resetWithPayload.bind(this);
    }

    resetTo(route) {
      this.props.resetWithPayload({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: route })]
      });
    }

    resetWithPayload(payload){
      this.props.navigation.dispatch(new NavigationActions.reset(payload))
    }

    navigateTo(route,params) {
      this.props.navigation.navigate(route, params)
    }

    goBack(withConfirmation = false) {
      this.props.logEvent(this.constructor.name, { name: `user pressed back`});
      if (withConfirmation===true) {
        Alert.alert(
          '',
          'Are you sure you want to go back?',
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed');
              },
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => {
                this.props.navigation.goBack();
              }
            }
          ]
        );
      } else {
        this.props.navigation.goBack();
      }
    }

    render() {
      return <WrappedComponent
        {...this.props}
        resetTo={this.resetTo}
        resetWithPayload={this.resetWithPayload}
        navigateTo={this.navigateTo}
        goBack={this.goBack}
      />
    }
  }
  return WithAnalytics(WithNavigation)
}