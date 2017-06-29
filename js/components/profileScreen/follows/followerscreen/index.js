'use strict';

import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import EmptyView from './EmptyView'
import { addNewLook, getUserFollowersData} from '../../../../actions';
import asScreen from "../../../common/containers/Screen"
import ListScreen from "../../../common/lists/ListScreen";
import UserActionRow from "../../../common/lists/UserActionRow";
import { openCamera } from "../../../../lib/camera/CameraUtils";

class FollowerScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowersData = this.getFollowersData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this.handleUploadPress = this.handleUploadPress.bind(this);
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      photoModal: false,
      followers: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const userData = this.props.navigation.state.params;
    if(nextProps.currId === userData.user.id){
      this.setState({followers: nextProps.followers})
    }
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params;
    if (userData.count) {
      this.getFollowersData();
    }
  }

  getFollowersData() {
    const userData = this.props.navigation.state.params;
    this.props.getUserFollowersData(userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  handleUploadPress() {
    this.props.logEvent('Followerscreen', { name: "Upload '+' click" });
    this.openCamera()
  }

  async openCamera() {
    this.props.logEvent('Followerscreen', { name: 'Open Camera click' });
    let file = {};
    file.path = await openCamera(true);
    if(file.path.search(".mp4") > -1) {
      file.localPath = file.path
      file.path = file.path.replace('file://', '')
      file.type = 'look[video]'
    } else {
      file.type = 'look[image]'
    }
    this.goToAddNewItem(file);
  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('addItemScreen',{ mode: 'create' })
    }).catch(err => {
      console.log('addNewLook err', err);
    });
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;
    return (
      <EmptyView onUploadButtonPress={this.handleUploadPress} isMyProfile={userData.isMyProfile}
                 name={userData.user.name}/>
    );
  }

  render() {
    const userData = this.props.navigation.state.params;
    const headerData = {title: 'Followers', count:userData.count};
    return (
      <View>
      <ListScreen
        renderEmpty={this._renderOnEmpty}
        renderItem={(item) => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
        headerData={headerData}
        data={this.state.followers}
        navigateTo={this.props.navigateTo}
        goBack={this.props.goBack}
        onEndReached={this.getFollowersData}/>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    getUserFollowersData: (id, pageNumber, pageSize) => dispatch(getUserFollowersData(id, pageNumber, pageSize)),
  };
}

const mapStateToProps = state => {
  return {
    followers: state.userFollowers.userFollowersData,
    currId: state.userFollowers.currId,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(FollowerScreen));