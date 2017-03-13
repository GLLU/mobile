import React, { Component } from 'react';
import { Animated, ListView,  View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as _ from 'lodash'
import CommentsViewHeader from './CommentsViewHeader'
import CommentInput from './CommentInput'
import CommentsListView from './CommentsListView'

import { navigateTo, popRoute, getLookCommentsData, initLookComments } from '../../../actions';

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

  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e6e6e6',
  },
});

class CommentsView extends Component {

  static propTypes = {
    style: React.PropTypes.oneOfType([React.PropTypes.style, React.PropTypes.object]),
    isHidden: React.PropTypes.bool,
    comments: React.PropTypes.array,
    count: React.PropTypes.number,
    look_id:React.PropTypes.number
  };

  static defaultProps = {
    style: {},
    isHidden: true,
    comments:[],
  };

  constructor(props) {
    super(props);
    this._renderFooter=this._renderFooter.bind(this);
    this._pushComment=this._pushComment.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      fadeAnimContent: new Animated.Value(-500),
      comments: props.comments,
      isTrueEndReached: false
    };
  }

  componentWillMount() {
    this.getCommentsData();
  }

  componentWillUnmount() {
    this.props.initLookComments();
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEmpty(nextProps.comments)) {
      this.setState({isTrueEndReached: true});
    }
    if (nextProps.comments !== this.props.comments) {
      this.setState({comments:nextProps.comments })
    }
  }

  getCommentsData() {
    this.props.getLookCommentsData(this.props.look_id, this.currentPageIndex);
    this.currentPageIndex++;
  }

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
        toValue: -500,
        friction: 9
      }            // Configuration
    ).start();
  }

  _pushComment(value){
    const comment={
      id: -1,
      created_at: new Date().toUTCString(),
      user_id: this.props.myUser.id,
      user: this.props.myUser,
      look_id: this.props.look_id,
      //parent_id is used for hierarchical comments and therefore currently not relevant
      parent_id: null,
      body: value,
      children: []
    };
    const comments = _.union(this.state.comments,[comment]);
    this.setState({comments:comments});
  }

  _renderFooter(){
    return (
      <View style={{paddingBottom: 5,paddingTop: 5,flex: 2,flexDirection:'column', backgroundColor:'#f2f2f2'}}>
        <CommentInput onSendPress={this._pushComment}/>
      </View>
    );
  }

  render() {
    if (this.props.isHidden) {
      this._animateHide()
    }
    else {
      this._animateShow()
    }
    console.log(this.props.count);
    return (
      <Animated.View style={[{bottom: this.state.fadeAnimContent},this.props.style,styles.container]}>
        <CommentsViewHeader count={this.props.count}/>
        <CommentsListView isEmpty={this.props.count==0} comments={this.state.comments} onEndReached={this.getCommentsData}/>
        {this._renderFooter()}
        <View style={{height:70}}/>
      </Animated.View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    getLookCommentsData: (id, pageNumber, pageSize) => dispatch(getLookCommentsData(id, pageNumber, pageSize)),
    initLookComments: () => dispatch(initLookComments()),
  };
}

const mapStateToProps = state => {
  return ({
    myUser: state.user,
    comments: state.lookComments.lookCommentsData
  });
};

export default connect(mapStateToProps, bindAction)(CommentsView);