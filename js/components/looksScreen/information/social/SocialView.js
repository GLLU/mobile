'use strict';

import React, { PureComponent } from 'react';
import {
  StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback, TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { formatNumberAsString } from "../../../../utils/FormatUtils";
import Fonts from "../../../../styles/Fonts.styles";
import * as _ from "lodash";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  icon: {
    height: 50,
    width: 50
  },
  counter: {
    marginLeft: 10,
    fontFamily: 'HelveticaNeue', // need to replace with Fonts.boldFont
    fontSize: 20,
    fontWeight: 'bold'
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

class SocialView extends PureComponent {

  static propTypes = {
    item: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLikesNumberPress: React.PropTypes.func,
  }

  static defaultProps = {
    count: 0,
    onPress: _.noop
  };

  render() {
    const {icon, count, onPress} = this.props;
    const formattedCount = formatNumberAsString(count)
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={icon} style={styles.icon}/>
        <Text style={styles.counter}>{formattedCount}</Text>
      </TouchableOpacity>
    )
  }
}

export default SocialView

