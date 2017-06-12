import {Component} from "react";
import Analytics from '../../../lib/analytics/Analytics';


export default function withAnalytics(WrappedComponent) {

  return class WithAnalytics extends Component {
    constructor(props) {
      super(props);
      this.logEvent=this.logEvent.bind(this);
    }

    logEvent(name, params = {}) {
      // set it async to not affect main thread
      setTimeout(() => {
        Analytics.logEvent(name, params);
      }, 10);
    }

    render() {
      return <WrappedComponent
        {...this.props}
        logEvent={this.logEvent}
      />
    }
  }
}