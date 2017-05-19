import React,{ Component } from 'react';
import * as Utils from '../../../utils';
import Analytics from '../../../lib/analytics/Analytics';

class BaseComponent extends Component {

  static propTypes={
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.bugsnag = Utils.getBugsnagClient();
    this.setBugsnagUser(props.user);
    this.setLeaveBreadcrumb(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user && nextProps.user!==this.props.user){
      this.setBugsnagUser(nextProps.user);
    }
    this.setLeaveBreadcrumb(nextProps);
  }

  setLeaveBreadcrumb(props) {
    this.bugsnag.leaveBreadcrumb("Component", {
      component: this.constructor.name,
      props: props,
    })
  }

  setBugsnagUser(user) {
    if (user && user.id && user.username && user.email) {
      this.bugsnag.setUser(user.id.toString(), user.username, user.email);
    }
  }

  logEvent(name, params = {}) {
    // set it async to not affect main thread
    setTimeout(() => {
      Analytics.logEvent(name, params);
    }, 10);
  }
}

export default BaseComponent;
