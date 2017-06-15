import React,{Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as _ from "lodash";
import BodyTypePicker from "./BodyTypePicker";
import asScreen from "../common/containers/Screen"

class MyBodyType extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  static defaultProps = {
    navigateTo: _.noop
}

  render() {
    return (
      <BodyTypePicker navigateTo={this.props.navigateTo}/>
    )
  }
}

export default asScreen(MyBodyType);
