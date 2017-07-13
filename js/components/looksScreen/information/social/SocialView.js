'use strict';

import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import { formatNumberAsString } from "../../../../utils/FormatUtils";
import Fonts from "../../../../styles/Fonts.styles";

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue'
  },
  iconWithImage: {
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 3
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
  }

  constructor(props) {
    super(props);
    this.handleLikePress = this.handleLikePress.bind(this);
    this.handleLikesNumberPress = this.handleLikesNumberPress.bind(this);
  }

  handleLikePress() {
    const {item} = this.props;
    const shouldActive = !item.liked;
    this.props.onPress(shouldActive);
  }

  handleLikesNumberPress() {
    const {item} = this.props;
    if (item.likes > 0) {
      this.props.onLikesNumberPress();
    }
  }

  render() {
    const {item, icon, count} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', padding:20}}>
        <Image source={icon} style={{height:50,width:50}}/>
        <Text style={[Fonts.boldFont,{marginLeft:10}]}>{formatNumberAsString(count)}</Text>
      </View>
    )
  }
}

export default SocialView

