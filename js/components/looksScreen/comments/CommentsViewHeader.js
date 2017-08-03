import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import i18n from 'react-native-i18n';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height:40,
    flexDirection: 'row',
    backgroundColor: '#f2f2f2'
  },
  commentsCountContainer: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#00D7B2',
    paddingTop: 6,
    paddingBottom: 6,
  },
  commentsCountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
  },
  viewTitle: {
    paddingLeft: 12,
    flex: 9,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 16,
    fontFamily: Fonts.regularFont,
    textAlign: 'left',
    alignSelf: 'center',
  }
});

export default class CommentsViewHeader extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    style: React.PropTypes.any,
    count: React.PropTypes.number
  };

  static defaultProps = {
    style: {}
  };

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <TouchableHighlight style={styles.commentsCountContainer}>
          <Text style={styles.commentsCountText}>
            {this.props.count}
          </Text>
        </TouchableHighlight>
        <Text style={styles.viewTitle}>{i18n.t('COMMENTS')}</Text>
      </View>
    );
  }
}










