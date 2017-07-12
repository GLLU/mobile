import React,{Component} from 'react';
import asScreen from "../common/containers/Screen"
import { Image, TouchableOpacity, Text, ScrollView,View, StyleSheet } from 'react-native';
import styles from './styles';
import { Container, Content,  Icon } from 'native-base';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ProfileView  from './ProfileView';
import StatsView  from './StatsView';
import { getStats, getUserBodyType, addNewLook, getUserLooks, showParisBottomMessage, likeUpdate,unlikeUpdate, loadMoreUserLooks, getUserBalance } from '../../actions';
import _ from 'lodash';
import UserLooks from './UserLooks';
import { editNewLook } from "../../actions/uploadLook";
import Spinner from '../loaders/Spinner';
const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');
const toSettings = require('../../../images/icons/settings.png');

class ProfileScreen extends Component {
  static propTypes = {
    userData: React.PropTypes.object,
    navigation: React.PropTypes.object,
    myUser: React.PropTypes.object,
    stats: React.PropTypes.object,
    hasUserSize: React.PropTypes.bool,
    user_size: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    getUserBodyType: React.PropTypes.func,
    getStats: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    const userData = props.navigation.state.params;
    const isMyProfile = userData.id === this.props.myUser.id || userData.user_id === this.props.myUser.id;
    const currUserId = isMyProfile ? props.myUser.id : userData.user_id||userData.id;
    this.goToAddNewItem = this.goToAddNewItem.bind(this);
    this.handleFollowersPress = this.handleFollowersPress.bind(this);
    this.handleFollowingPress = this.handleFollowingPress.bind(this);
    this.handleBalancePress = this.handleBalancePress.bind(this);
    this.handleBalanceNotAvailablePress = this.handleBalanceNotAvailablePress.bind(this);
    this.handleScrollUserLooks = this.handleScrollUserLooks.bind(this)
    this.loadMoreUserLooks = this.loadMoreUserLooks.bind(this)
    this.state = {
      isMyProfile,
      userId: currUserId,
      noMoreData: false,
      isFollowing: userData.is_following,
      isLoadingLooks: true,
      stats: currUserId === props.stats.user_id ? props.stats : {},
      userLooks: currUserId === props.currLookScreenId ? props.userLooks : [],
      meta: currUserId === props.currLookScreenId ? props.meta : {total_count: 0},
      isLoading: currUserId === props.currLookScreenId,
      balance: props.balance

    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.stats.user_id === this.state.userId && nextProps.stats !== this.state.stats){
      this.setState({stats: nextProps.stats})
    }
    if(nextProps.currLookScreenId === this.state.userId && nextProps.userLooks !== this.state.userLooks){
      this.setState({userLooks: nextProps.userLooks, loadingMore: false, meta: this.props.meta})
    }
    if(this.state.isMyProfile && this.state.balance !== nextProps.balance) {
      this.setState({balance: nextProps.balance})
    }
  }

  componentDidMount() {
    if (this.props.hasUserSize) {
      const data = {
        gender: this.props.myUser.gender,
        bodyType: this.props.myUser.user_size.body_type
      }
      this.props.getUserBodyType(data);
    }
  }

  componentWillMount() {
    const {myUser} = this.props;
    const userData = this.props.navigation.state.params;
    const user = this.state.isMyProfile ? myUser : userData;
    if (this.state.userId !== this.props.currLookScreenId) {
      const looksCall = {
        id: this.state.userId,
        all: this.state.isMyProfile
      }
      this.setState({isLoading: true}, () => {
        this.props.getUserLooks(looksCall).then(() => {
          this.setState({ isLoading: false});
        });
      })
    }
    this.props.getStats(this.state.userId);

    if(this.state.isMyProfile){
      this.props.getUserBalance(this.state.userId);
    }
  }

  handleSettingsPress() {
    this.props.logEvent('ProfileScreen', {name: 'Settings click'});
    this.props.navigateTo('settingsScreen');
  }

  _renderleftBtn() {
    return (
      <TouchableOpacity transparent onPress={this.handleBackToFeedPress.bind(this)} style={styles.headerBtn}>
        <Icon style={StyleSheet.flatten(styles.backBtn)} name="ios-arrow-back"/>
      </TouchableOpacity>
    )


  }

  _renderRightBtn() {
    return this.state.isMyProfile ?
      <TouchableOpacity onPress={this.handleSettingsPress.bind(this)} style={styles.headerBtn}>
        <Image source={toSettings} name="ios-arrow-back" style={styles.settingsBtn}/>
      </TouchableOpacity>
      :

        <View style={styles.settingsBtn}/>

  }

  goToAddNewItem(imagePath) {
    this.props.addNewLook(imagePath).then(() => {
      this.props.navigateTo('addItemScreen');
    });
  }

  toggleFollow(isFollowing) {
    this.props.logEvent('ProfileScreen', {name: 'Follow click', isFollowing:`${isFollowing}`});
    this.setState({isFollowing: isFollowing});
    this.props.getStats(this.state.userId);
  }

  _renderStats() {
    const { following, followers, likes_count} = this.state.stats
    const { isMyProfile } = this.state
    if(!_.isEmpty(this.state.stats)) {
      return (
        <View>
          <StatsView
            following={ following }
            followers={ followers }
            likes={ likes_count }
            isMyProfile={ isMyProfile }
            onFollowersPress={this.handleFollowersPress}
            onFollowingPress={this.handleFollowingPress}
            handleBalancePress = {this.handleBalancePress}
            handleBalanceNotAvailablePress = {this.handleBalanceNotAvailablePress}
            balance={this.state.balance}
          />
        </View>
      )
    }


  }

  handleFollowingPress(stat) {
    this.props.logEvent('ProfileScreen', {name: 'Following click'});
    const userData = this.props.navigation.state.params;
    this.props.navigateTo('followScreen', {
      user: {id: this.state.userId, name:userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleFollowersPress(stat) {
    this.props.logEvent('ProfileScreen', {name: 'Followers click'});
    const userData = this.props.navigation.state.params;
    this.props.navigateTo('followerScreen', {
      user: {id: this.state.userId, name:userData.name},
      isMyProfile: this.state.isMyProfile,
      mode: stat.type,
      count: stat.count
    });
  }

  handleScrollUserLooks(event) {
      const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const currentScroll = event.nativeEvent.contentOffset.y
      if (currentScroll + layoutMeasurementHeight > contentSizeHeight-250) {//currentScroll(topY) + onScreenContentSize > whole scrollView contentSize / 2
        if(this.contentHeight !== contentSizeHeight) {
          this.contentHeight = contentSizeHeight
          if(!this.state.loadingMore) {
            this.setState({loadingMore: true}, () => this.loadMoreUserLooks())
          }

        }
      }

    this.currPosition = event.nativeEvent.contentOffset.y;
  }

  loadMoreUserLooks() {
    if (this.state.isLoading) {
      console.log('already isLoading')
      return;
    }
    let data = {
      id: this.state.userId,
      all: this.state.isMyProfile
    }
    const {meta: {total_count}, query} = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;
    if (pageSize * pageNumber < total_count) {
    // if (pageSize * pageNumber < total_count) {
      this.setState({isLoading: true}, () => {
        this.props.loadMoreUserLooks(data).then(() => {
          this.setState({isLoading: false})}
        ).catch(err => {
          console.log('error', err);
          this.setState({isLoading: false});
        });
      });
    } else {
      this.setState({noMoreData: true})
      console.log('end of LooksScreen');
    }
  }

  handleBackToFeedPress() {
    this.props.logEvent('ProfileScreen', {name: 'Back to Feed click'});
    this.props.goBack();
  }

  handleBalancePress() {
    this.props.logEvent('ProfileScreen', {name: 'Wallet Pressed'});
    if(this.state.balance < 50) {
      this.props.showParisBottomMessage(`Hey, you can withdraw the reward once you reach at least US$50.00`);
    } else {
      this.props.showParisBottomMessage(`Hey, to withdraw please Contact us`);
    }

  }

  handleBalanceNotAvailablePress() {
    this.props.logEvent('ProfileScreen', {name: 'Wallet Pressed Not Available'});
    this.props.showParisBottomMessage(`Sorry, We are having problems with our servers, please check again shortly`);
  }

  _renderLoadMore() {
    return (
      <View style={styles.loader}>
        {(() => {
          if (this.state.noMoreData) {
            return <Text style={{color: 'rgb(230,230,230)'}}>No additional looks yet</Text>
          }
          if (this.state.isLoading) {
            return <Spinner color='rgb(230,230,230)'/>;
          }
          if(this.state.userLooks.length > 2) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')} />;

          }
          return null;
        })()}
      </View>);
  }


  _renderRefreshingCover() {
    return (
      this.state.isRefreshing &&
      <View style={styles.refreshingCover}/>
    )
  }

  _renderLoading() {
    if (this.props.reloading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color='#666666'/>
        </View>
      );
    }
  }

  render() {
    const {isMyProfile} = this.state;
    const userData = this.props.navigation.state.params;
    const {myUser} = this.props;
    const user = isMyProfile ? myUser : userData;
    const {about_me,avatar} = user;
    if (!_.isEmpty(user)) {
      let avatarUrl = avatar ? avatar.url : null;
      return (
        <Container>
            <ScrollView scrollEventThrottle={100}
                        onScroll={this.handleScrollUserLooks}
                        pagingEnabled={false}
            style={{backgroundColor: 'white'}}>
              <Image source={profileBackground} style={styles.bg}>
                <LinearGradient colors={['#0C0C0C', '#4C4C4C']}
                                style={[styles.linearGradient, {opacity: 0.7}]}/>
                <View style={styles.profileHeader}>
                    { this._renderleftBtn() }
                    <ProfileView profilePic={avatarUrl}
                                 userid={this.state.userId}
                                 name={user.name}
                                 username={user.username}
                                 isMyProfile={this.state.isMyProfile}
                                 isFollowing={this.state.isFollowing}
                                 onFollowPress={this.toggleFollow.bind(this)}
                                 navigateTo = {this.props.navigateTo}
                    />
                    { this._renderRightBtn() }
                </View>
                <View style={styles.description}>
                  <Text ellipsizeMode="middle" style={styles.descriptionText}>{about_me}</Text>
                </View>
                { this._renderStats() }
              </Image>
              <UserLooks
                myUserId={this.props.myUser.id}
                userLooks={this.state.userLooks}
                navigateTo={this.props.navigateTo}
                isMyProfile={this.state.isMyProfile}
                editNewLook = {this.props.editNewLook}
                addNewLook = {this.props.addNewLook}
                likeUpdate = {this.props.likeUpdate}
                unlikeUpdate = {this.props.unlikeUpdate}
                meta={this.props.meta}
                isLoading={this.state.isLoading}
              />
              {this._renderLoadMore()}
              {this._renderRefreshingCover()}
            </ScrollView>
          {this._renderLoading()}
        </Container>
      )
    }

    return null;
  }
}

function bindAction(dispatch) {
  return {
    getStats: (id) => dispatch(getStats(id)),
    getUserBalance: (id) => dispatch(getUserBalance(id)),
    getUserBodyType: (data) => dispatch(getUserBodyType(data)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    editNewLook: (id) => dispatch(editNewLook(id)),
    getUserLooks: data => dispatch(getUserLooks(data)),
    loadMoreUserLooks: (looksCall) => dispatch(loadMoreUserLooks(looksCall)),
    showParisBottomMessage: (message) => dispatch(showParisBottomMessage(message)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unlikeUpdate: (id) => dispatch(unlikeUpdate(id)),
  };
}

const mapStateToProps = state => {
  const hasUserSize = state.user.user_size !== null && !_.isEmpty(state.user.user_size);
  const user_size = hasUserSize ? state.user.user_size : {};
  return {
    myUser: state.user,
    stats: state.stats,
    balance: state.wallet.balance,
    hasUserSize,
    user_size: user_size,
    currLookScreenId: state.userLooks.currId,
    isLoading: state.loader.loading,
    userLooks: state.userLooks.userLooksData,
    cardNavigation: state.cardNavigation,
    meta: state.userLooks.meta,
    query: state.userLooks.query,
  };
};

export default connect(mapStateToProps, bindAction)(asScreen(ProfileScreen));
