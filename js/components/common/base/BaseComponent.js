import React,{ Component } from 'react';
import withAnalytics from '../analytics/WithAnalytics';
import withBreadcrumbs from '../bugsnag/WithBreadcrumbs';

class BaseComponent extends Component {

  logEvent=this.props.logEvent
}

export default withAnalytics(withBreadcrumbs(BaseComponent));
