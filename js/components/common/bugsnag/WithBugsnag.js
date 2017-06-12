import React,{Component} from "react";
import { getBugsnagClient } from "../../../utils/BugsnagUtils";


export default function withBugsnag(WrappedComponent) {

  return class WithBugsnag extends Component {
    constructor(props) {
      super(props);
      this.bugsnag = getBugsnagClient();
    }

    render() {
      return <WrappedComponent
        {...this.props}
        bugsnag={this.bugsnag}
      />
    }
  }
}