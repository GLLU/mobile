import React from 'react';
import BasePage from '../common/base/BasePage';
import {Text, View, StyleSheet} from 'react-native';
import * as _ from "lodash";
import BodyTypePicker from "./BodyTypePicker";

class MyBodyType extends BasePage {
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
      <BodyTypePicker navigateTo={this.navigateTo}/>
    )
  }
}

export default MyBodyType;
