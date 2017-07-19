import React,{Component} from "react";
import WithAnalytics from '../analytics/WithAnalytics'
import {NavigationActions} from "react-navigation";
import {Alert} from "react-native";
import { connect } from "react-redux";
import * as _ from "lodash";


export default function withNavigation(WrappedComponent) {

  class WithNavigation extends Component {

    static propTypes={
      cardNavigation:React.PropTypes.object.isRequired,
      navigation:React.PropTypes.object.isRequired,
      logEvent:React.PropTypes.func
    }

    static defaultProps={
      logEvent:_.noop
    }

    constructor(props) {
      super(props);
      this.navigateTo=this.navigateTo.bind(this);
      this.goBack=this.goBack.bind(this);
      this.resetTo=this.resetTo.bind(this);
      this.resetWithPayload=this.resetWithPayload.bind(this);
    }

    resetTo(route) {
      this.resetWithPayload({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: route })]
      });
    }

    _getNavigationRouteNameFromPayload(payload){
      const {index,actions} = payload;
      const route=actions[index];
      return route ? route.routeName : _.last(actions).routeName;
    }

    resetWithPayload(payload){
      this.props.logEvent(`reseting navigation to ${this._getNavigationRouteNameFromPayload(payload)}`);
      this.props.navigation.dispatch(new NavigationActions.reset(payload))
    }

    navigateTo(route,params) {
      const {routes,index}=this.props.cardNavigation;
      const currentRoute= routes[index].routeName;
      if(currentRoute!==route){
        this.props.logEvent(`navigating to ${route}`);
        this.props.navigation.navigate(route, params)
      }
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

  const mapStateToProps = state => {
    return {
      cardNavigation: state.cardNavigation,
    };
  };

  return connect(mapStateToProps)(WithAnalytics(WithNavigation))
}