import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#f2f2f2'
  },
  commentsCountContainer:{
    justifyContent:'center',
    flex:1,
    backgroundColor: '#00D7B2',
    paddingTop: 6,
    paddingBottom: 6,
  },
  commentsCountText:{
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  viewTitle:{
    paddingLeft: 12,
    flex:9,
    paddingTop: 6,
    paddingBottom: 6,
    fontWeight:'bold',
    fontSize:16,
    textAlign: 'left'
  }
});

export default class CommentsViewHeader extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    count: React.PropTypes.number
  };

  static defaultProps = {
    style: {},
    count:0
  };

  render() {
    return (
      <View style={[styles.container,this.props.style]}>
        <TouchableHighlight style={styles.commentsCountContainer}>
          <Text style={styles.commentsCountText}>
            {this.props.count}
          </Text>
        </TouchableHighlight>
        <Text style={styles.viewTitle}>COMMENTS</Text>
      </View>
    );
  }
}










