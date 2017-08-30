import React, { Component } from 'react';
import { ListView, Image, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import EmptyView from './EmptyView';
import { getUserFollowersData } from '../../../../actions';
import { addNewLook } from '../../../../actions/uploadLook';
import asScreen from '../../../common/containers/Screen';
import ListScreen from '../../../common/lists/ListScreen';
import UserActionRow from '../../../common/lists/UserActionRow';
import { openCamera } from '../../../../lib/camera/CameraUtils';
import { formatLook } from '../../../../utils/UploadUtils';
import EmptyStateScreen from '../../../common/EmptyStateScreen';
import { getFollowsWithUsersObj } from '../../../../utils/UsersUtils';

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
      followers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const userData = this.props.navigation.state.params;
    if (nextProps.currId === userData.user.id) {
      this.setState({ followers: nextProps.followers });
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
    this.uploadLook();
  }

  async uploadLook() {
    this.props.logEvent('Followerscreen', { name: 'user started uploading a look', origin: 'followers' });
    const path = await openCamera(true);
    const file = formatLook(path);
    if (file) {
      this.goToAddNewItem(file);
    } else {
      this.props.logEvent('Followerscreen', { name: 'User canceled the upload look', origin: 'camera' });
    }
  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('uploadLookScreen', { mode: 'create' });
    }).catch((err) => {
      console.log('addNewLook err', err);
    });
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;

    const emptyStateTitle = userData.isMyProfile ? I18n.t('ME_NO_FOLLOWERS_TITLE') : `${userData.user.name} ${I18n.t('NO_FOLLOWING_TITLE')}`;
    const emptyStateSubtitle = userData.isMyProfile ? I18n.t('ME_NO_FOLLOWERS_LEGEND') : null;
    const emptyStateButtonText = userData.isMyProfile ? I18n.t('POST_NOW') : null;

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EmptyStateScreen
          title={emptyStateTitle} subtitle={emptyStateSubtitle}
          icon={require('../../../../../images/emptyStates/users.png')}
          buttonText={emptyStateButtonText}
          onButtonClicked={this.handleUploadPress} />
      </View>
    );
  }

  render() {
    const userData = this.props.navigation.state.params;
    const headerData = { title: 'Followers', count: userData.count };

    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ListScreen
          renderEmpty={this._renderOnEmpty}
          renderItem={item => <UserActionRow {...item} navigateTo={this.props.navigateTo} />}
          headerData={headerData}
          data={this.state.followers}
          navigateTo={this.props.navigateTo}
          goBack={this.props.goBack}
          onEndReached={this.getFollowersData} />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    addNewLook: imagePath => dispatch(addNewLook(imagePath)),
    getUserFollowersData: (id, pageNumber, pageSize) => dispatch(getUserFollowersData(id, pageNumber, pageSize)),
  };
}

const mapStateToProps = (state) => {
  const followersDataWithUsersObjs = getFollowsWithUsersObj(state.userFollowers.userFollowersData, state.users.usersData);
  return {
    followers: followersDataWithUsersObjs,
    isLoading: state.userFollowers.isLoading,
    currId: state.userFollowers.currId,
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(FollowerScreen));
