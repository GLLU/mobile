import React, { Component } from 'react';
import { Animated, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import CommentsViewHeader from './CommentsViewHeader'
import CommentInput from './CommentInput'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  headerContainer: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#f2f2f2'
  },
  commentsCountContainer:{
    justifyContent:'center',
    flex:1,
    backgroundColor: '#00D7B2',
    paddingTop: 10,
    paddingBottom: 10,
  },
  commentsCountText:{
    color:'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  showAllContainer:{
    paddingLeft: 12,
    flex:3,
  },
  viewTitle:{
    paddingLeft: 12,
    flex:12,
    fontWeight:'bold',
    textAlign: 'left'

  }
});

export default class CommentsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeAnimContent: new Animated.Value(-300)
    };
  }

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    isHidden: React.PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isHidden: true,
    count:48
  };

  _animateShow() {
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: 0,
        friction: 9
      }            // Configuration
    ).start();
  }

  _animateHide() {
    Animated.spring(          // Uses easing functions
      this.state.fadeAnimContent,    // The value to drive
      {
        toValue: -300,
        friction: 9
      }            // Configuration
    ).start();
  }

  render() {
    if (this.props.isHidden) {
      this._animateHide()
    }
    else {
      this._animateShow()
    }
    return (
      <Animated.View style={[{bottom: this.state.fadeAnimContent},this.props.style,styles.container]}>
        <CommentsViewHeader count={this.props.count}/>
        <View>
          <Text>
            Hello World I'm Comments
          </Text>
        </View>
        <View style={{flexDirection:'column', backgroundColor:'#ADADAD'}}>
          <View style={{flex:1}} name="spacer"/>
          <CommentInput style={{flex:2}}/>
          <View style={{flex:1}} name="spacer"/>
        </View>
        <View style={{height:70}}/>
      </Animated.View>
    );
  }
}
