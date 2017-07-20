// @flow

import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
import { formatNumberAsString } from "../../../utils/FormatUtils";

const bubbleIcon = require('../../../../images/icons/speech-bubble.png');

const styles = StyleSheet.create({
  likeContainer: {
    height: 30,
    marginLeft: 3,
    backgroundColor: 'transparent',
  },
  btnWithImage: {
    backgroundColor: 'blue',
  },
  iconBubbleWithImage: {
    height: 18,
    width: 18,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginTop: 3,
  },
  countLikeLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

type Props = {
  comments: number,
  onPress: void
}

class FeedCommentsView extends PureComponent {

  props: Props;

  renderCommentsAmount(comments: number) {
    const commentsAmount = formatNumberAsString(comments);
    return (
      <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 3}}>
        <Text style={styles.countLikeLabel}>{`${commentsAmount}`}</Text>
      </View>
    );
  }

  render() {
    const {comments, onPress} = this.props;
    return (
      <View style={[styles.likeContainer]}>
        <TouchableWithoutFeedback transparent onPress={onPress} style={styles.btnWithImage}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'flex-end',
            justifyContent: 'space-between',
            marginRight: 5
          }}>
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={bubbleIcon} style={styles.iconBubbleWithImage}/>
            </View>
            {comments > 0 ? this.renderCommentsAmount(comments) : <View/>}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default FeedCommentsView;

