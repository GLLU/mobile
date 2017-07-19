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

class FeedCommentsView extends PureComponent {

  static propTypes = {
    comments: React.PropTypes.number,
    onPress: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  getCommentsAmountStringFeedView(comments = 0) {
    comments = comments.toString();
    if (comments.length > 4 && comments.length < 7) {
      comments = `${Math.floor(comments / 1000)}K`;
    } else if (comments.length === 7) {
      comments = `${Math.floor(comments / 1000000)}M`;
    }
    return comments;
  }

  renderCommentsAmount(comments: string) {
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginLeft: 3 }}>
        <View>
          <Text style={styles.countLikeLabel}>{`${comments}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { comments, onPress } = this.props;
    const commentsAmount = formatNumberAsString(comments);
    return (
      <View style={[styles.likeContainer]}>
        <TouchableWithoutFeedback transparent onPress={onPress} style={styles.btnWithImage}>
          <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between', marginRight: 5 }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Image source={bubbleIcon} style={styles.iconBubbleWithImage} />
            </View>
            {comments > 0 ? this.renderCommentsAmount(commentsAmount) : <View />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default FeedCommentsView;

