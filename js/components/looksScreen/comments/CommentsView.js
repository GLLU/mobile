import React, { Component } from 'react';
import { Animated, ListView, View, Text, TouchableHighlight, StyleSheet,Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { noop } from 'lodash'
import CommentsViewHeader from './CommentsViewHeader'
import CommentInput from './CommentInput'
import CommentsListView from './CommentsListView'
import BottomHalfScrenModal from '../common/BottomHalfScreenModal'
import Spinner from '../../loaders/Spinner';
import { getLookCommentsData, initLookComments, addLookComment } from '../../../actions';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const statusBarHeight = Platform.os === 'ios' ? 0 : ExtraDimensions.get('STATUS_BAR_HEIGHT');

class CommentsView extends Component {

  static propTypes = {
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    comments: React.PropTypes.array,
    count: React.PropTypes.number,
    look_id: React.PropTypes.number,
    onRequestClose: React.PropTypes.func,
    goToProfile: React.PropTypes.func,
    areCommentsLoaded: React.PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    comments: [],
    onRequestClose: noop,
    goToProfile: noop,
  };

  constructor(props) {
    super(props);
    this._renderFooter = this._renderFooter.bind(this);
    this._pushComment = this._pushComment.bind(this);
    this.getCommentsData = this.getCommentsData.bind(this);
    this.onUserNavigate = this.onUserNavigate.bind(this);
    this._renderListView = this._renderListView.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      count: this.props.count,
      isTrueEndReached: false
    };
  }

  getCommentsData() {
    this.props.getLookCommentsData(this.props.look_id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      if (!nextProps.isOpen) {
        this.props.initLookComments();
        this.currentPageIndex = 1;
      }
      else {
        this.getCommentsData();
      }
    }

  }

  _pushComment(value) {
    const comment = {
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
    this.props.addLookComment(comment);
    this.setState({count: this.state.count + 1})
  }

  onUserNavigate(user) {
    this.props.goToProfile(user);
  }

  _renderFooter() {
    return (
      <View
        style={{ height: 80, flexDirection: 'column',justifyContent:'center', backgroundColor: '#f2f2f2'}}>
        <CommentInput onSendPress={this._pushComment}/>
      </View>
    );
  }

  _renderListView() {
    return (
      <CommentsListView onUserPress={this.onUserNavigate} isEmpty={this.state.count === 0}
                        comments={this.props.comments}
                        onEndReached={this.getCommentsData}/>
    )
  }

  render() {
    return (
      <BottomHalfScrenModal {...this.props}>
        <CommentsViewHeader count={this.state.count}/>
        {this.props.areCommentsLoaded ? this._renderListView() : <Spinner/>}
        {this._renderFooter()}
        <View style={{height:statusBarHeight}}/>
      </BottomHalfScrenModal>
    );
  }
}

function bindAction(dispatch) {
  return {
    getLookCommentsData: (id, pageNumber, pageSize) => dispatch(getLookCommentsData(id, pageNumber, pageSize)),
    initLookComments: () => dispatch(initLookComments()),
    addLookComment: (data) => dispatch(addLookComment(data)),
  };
}

const mapStateToProps = state => {
  return ({
    myUser: state.user,
    comments: state.lookComments.lookCommentsData,
    areCommentsLoaded: state.lookComments.currId !== -1
  });
};

export default connect(mapStateToProps, bindAction)(CommentsView);