import {Component} from "react";
import withBugsnag from "./WithBugsnag";


export default function withBreadcrumbs(WrappedComponent) {

  class WithBreadcrumbs extends Component {
    constructor(props) {
      super(props);
    }

    componentWillReceiveProps(nextProps) {
      this.setLeaveBreadcrumb(nextProps);
    }

    setLeaveBreadcrumb(props) {
      props.bugsnag.leaveBreadcrumb("Component", {
        component: this.constructor.name,
        props: props,
      })
    }

    render() {
      return <WrappedComponent
        {...this.props}
      />
    }
  }

  return withBugsnag(WithBreadcrumbs)
}