'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getLookLikes, initLookLikes } from '../../actions';

import FollowListView from './shared/LookLikeListView'
import asScreen from "../common/containers/Screen"

class LikesScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getLookLikesData = this.getLookLikesData.bind(this);
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params.lookId;
    if (userData) {
      this.getLookLikesData(userData);
    }

  }

  componentWillUnmount() {
    this.props.initLookLikes();
  }

  getLookLikesData() {
    const userData = this.props.navigation.state.params.lookId;
    this.props.getLookLikes(userData);
  }

  renderListView(likesCount) {

    return(
      <FollowListView
        headerData={likesCount}
        likes={this.props.likes}
        navigateTo={this.props.navigateTo}
        goBack={this.props.goBack}
        onEndReached={this.getLookLikesData}/>
    )
  }
  
  render() {
    const likesCount = this.props.navigation.state.params.count;
    return (
          <View style={{flex:1, flexDirection:'column', backgroundColor:'white'}} >
            {this.props.likes.length > 0 ? this.renderListView(likesCount) : null }
          </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    getLookLikes: (id) => dispatch(getLookLikes(id)),
    initLookLikes: () => dispatch(initLookLikes()),
  };
}

const mapStateToProps = state => {
  return {
    likes: state.lookLikes.lookLikesData,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(LikesScreen));