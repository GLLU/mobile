import * as selfRef from './TrackingUtils'
import Analytics from '../lib/analytics/Analytics';

export default selfRef

export const trackScreenByNavigationState=(nextNavigationState,previousNavigationState)=>{
  const newScreen=getScreenByNavigationState(nextNavigationState);
  const oldScreen=getScreenByNavigationState(previousNavigationState);
  Analytics.endTrackScreen({
    page: oldScreen
  }, true);
  Analytics.trackScreen({
    page: newScreen
  }, true);

}

const getScreenByNavigationState=(navigationState)=>navigationState.routes[navigationState.index].routeName;