// @flow

import {connect} from 'react-redux';
import {NavigationActions} from "react-navigation";

import Analytics from '../../lib/analytics/Analytics';
import {logout} from '../../actions';
import SettingsScreen from './SettingsScreen';
import asScreen from '../common/containers/Screen';

function bindAction(dispatch, ownProps) {
  return {
    logout: () => {

      Analytics.logEvent('SettingsScreen', { name: 'logout' });
      dispatch(logout());
      ownProps.navigation.dispatch(new NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'splash' })]
      }));
    },
    onBack: () => {
      ownProps.navigation.back();
    },
  };
}

const mapStateToProps = state => ({
  shareToken: state.user.invitation_share_token,
});

export default connect(mapStateToProps, bindAction)(asScreen(SettingsScreen));
