import React, {Component} from 'react';
import {ListView, Image, TouchableOpacity, Text, ActivityIndicator, View} from 'react-native';
import I18n from 'react-native-i18n';
import {connect} from 'react-redux';
import {getUserFollowsData} from '../../../../actions';
import asScreen from '../../../common/containers/Screen';
import ListScreen from '../../../common/lists/ListScreen';
import UserActionRow from '../../../common/lists/UserActionRow';
import EmptyStateScreen from '../../../common/EmptyStateScreen';
import { getFollowsWithUsersObj } from '../../../../utils/UsersUtils';

class FollowScreen extends Component {

  static propTypes = {
    mode: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.getFollowsData = this.getFollowsData.bind(this);
    this._renderOnEmpty = this._renderOnEmpty.bind(this);
    this.currentPageIndex = 1;
    this.state = {
      follows: [],
    };
  }

  componentWillMount() {
    const userData = this.props.navigation.state.params;
    if (userData.count) {
      this.getFollowsData();
    }
  }

  getFollowsData() {
    const userData = this.props.navigation.state.params;
    console.log('userData2',userData)
    this.props.getUserFollowsData(userData.user.id, this.currentPageIndex);
    this.currentPageIndex++;
  }

  componentWillReceiveProps(nextProps) {
    const userData = this.props.navigation.state.params;
    if (nextProps.currId === userData.user.id) {
      this.setState({ follows: nextProps.follows });
    }
  }

  _renderOnEmpty() {
    const userData = this.props.navigation.state.params;

    const emptyStateTitle = userData.isMyProfile ? I18n.t('ME_NO_FOLLOWING_TITLE') : `${userData.user.name} ${I18n.t('NO_FOLLOWING_TITLE')}`;
    const emptyStateSubtitle = userData.isMyProfile ? I18n.t('ME_NO_FOLLOWING_LEGEND') : null;
    const emptyStateButtonText = userData.isMyProfile ? I18n.t('START_FOLLOWING') : null;

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EmptyStateScreen
          title={emptyStateTitle} subtitle={emptyStateSubtitle}
          icon={require('../../../../../images/emptyStates/user-admin.png')}
          buttonText={emptyStateButtonText}
          onButtonClicked={()=> this.props.navigateTo('searchScreen')}
          />
      </View>
    );

  }

  render() {
    const userData = this.props.navigation.state.params;
    const headerData = { title: 'Following', count: userData.count };

    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ListScreen
        renderEmpty={this._renderOnEmpty}
        renderItem={item => <UserActionRow {...item} navigateTo={this.props.navigateTo}/>}
        headerData={headerData}
        data={this.state.follows}
        navigateTo={this.props.navigateTo}
        goBack={this.props.goBack}
        onEndReached={this.getFollowsData}/>
    );
  }
}

function bindAction(dispatch) {
  return {
    getUserFollowsData: (id, pageNumber, pageSize) => dispatch(getUserFollowsData(id, pageNumber, pageSize)),
  };
}

const mapStateToProps = state => {
  const followsDataWithUsersObjs = getFollowsWithUsersObj(state.userFollows.userFollowsData, state.users.usersData);
  return{
    follows: followsDataWithUsersObjs,
    isLoading: state.userFollows.isLoading,
    currId: state.userFollows.currId,
  }
};

export default connect(mapStateToProps, bindAction)(asScreen(FollowScreen));
