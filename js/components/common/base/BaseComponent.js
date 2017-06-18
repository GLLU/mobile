import React,{ Component } from 'react';
import withAnalytics from '../analytics/WithAnalytics';
import withBreadcrumbs from '../bugsnag/WithBreadcrumbs';

class BaseComponent extends Component {

  static propTypes={
    logEvent:React.PropTypes.func
  };

  logEvent=this.props.logEvent
}

export default withAnalytics(withBreadcrumbs(BaseComponent));
