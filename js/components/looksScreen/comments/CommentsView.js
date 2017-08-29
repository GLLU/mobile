import React, { Component } from 'react';
import { Animated, ListView, View, Text, TouchableHighlight, StyleSheet,Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { noop } from 'lodash'
import CommentsViewHeader from './CommentsViewHeader'
import CommentInput from './CommentInput'
import CommentsListView from './CommentsListView'
import BottomHalfScreenModal from '../common/BottomHalfScreenModal'
import Spinner from '../../loaders/Spinner';
import { getLookCommentsData, initLookComments, addLookComment } from '../../../actions';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { getDataWithUsersObj } from '../../../utils/UsersUtils';

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

  componentDidMount() {
    if(this.props.isOpen) {
      this.getCommentsData();
    }
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
    console.log('this.props.myUser',this.props.myUser)
    const comment = {
      id: -1,
      created_at: new Date().toUTCString(),
      user_id: this.props.myUser.id,
      userId: this.props.myUser.id,
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
    console.log('user',user)
    this.props.goToProfile(user);
  }

  _renderFooter() {
    return (
      <View
        style={{ height: 70, flexDirection: 'column',justifyContent:'center', backgroundColor: '#f2f2f2'}}>
        <CommentInput onSendPress={this._pushComment}/>
      </View>
    );
  }

  _renderListView() {
    console.log('booommm', this.props.comments)
    return (
      <CommentsListView onUserPress={this.onUserNavigate} isEmpty={this.state.count === 0}
                        comments={this.props.comments}
                        onEndReached={this.getCommentsData}/>
    )
  }

  render() {
    return (
      <BottomHalfScreenModal {...this.props}>
        <CommentsViewHeader count={this.state.count}/>
        {this.props.areCommentsLoaded ? this._renderListView() : <Spinner style={{flex: 1, justifyContent: 'center', padding: 10}}/>}
        {this._renderFooter()}
        <View style={{height:statusBarHeight}}/>
      </BottomHalfScreenModal>
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
  const commentsDataWithUsersObjs = getDataWithUsersObj(state.lookComments.lookCommentsData, state.users.usersData, false);
  return ({
    myUser: state.user,
    comments: commentsDataWithUsersObjs,
    areCommentsLoaded: state.lookComments.currId !== -1
  });
};

export default connect(mapStateToProps, bindAction)(CommentsView);