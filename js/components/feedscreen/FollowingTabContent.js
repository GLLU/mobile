// @flow

import React from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  RefreshControl,
  View,
  NetInfo,
  ActivityIndicator,
} from 'react-native';
import i18n from 'react-native-i18n';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import _ from 'lodash';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import BaseComponent from '../common/base/BaseComponent';
import MediaContainer from '../common/MediaContainer';
import { formatInvitationMessage } from '../../lib/messages/index';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import EmptyStateScreen from '../common/EmptyStateScreen';
import FiltersView from './FilterContainer';
import FeedFilters from './FeedFilters';
import FeedActiveFilter from '../common/buttons/TagStringButton';
import UserActionCard from '../common/lists/UserActionCard';
const emptyUsersIcon = require('../../../images/emptyStates/user-admin.png');
const search = require('../../../images/icons/search-black.png');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const LOADER_HEIGHT = 30;

class FollowingTabContent extends BaseComponent {

  static propTypes = {
    hasUserSize: React.PropTypes.bool,
    flatLooks: React.PropTypes.array,
    query: React.PropTypes.object,
    reloading: React.PropTypes.bool,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    getFeed: React.PropTypes.func,
    refreshFeed: React.PropTypes.func,
    showBodyTypeModal: React.PropTypes.func,
    loadMore: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._renderRefreshControl = this._renderRefreshControl.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleScrollPosition = this.handleScrollPosition.bind(this);
    this._renderFeedFilters = this._renderFeedFilters.bind(this);
    this._getFeed = this._getFeed.bind(this);
    this.checkIfFeedResultsAreFiltered = this.checkIfFeedResultsAreFiltered.bind(this);
    this.state = {
      isLoading: false,
      noMoreData: false,
      isRefreshing: false,
      currentScrollPosition: 0,
      flatLooksLeft: _.filter(props.flatLooks, (look, index) => index % 2 === 0),
      flatLooksRight: _.filter(props.flatLooks, (look, index) => index % 2 === 1),
      loadingMore: false,
    };
    this.currPosition = 0;
  }

  _onInviteFriendsClick() {
    this.logEvent('Feedscreen', { name: 'Invite your friends click' });
    const message = SocialShare.generateShareMessage(formatInvitationMessage());
    SocialShare.nativeShare(message);
  }

  componentDidMount() {
    const { changeFiltersGender, defaultFilters, showParisBottomMessage, userName, getUsersSuggestions } = this.props;
    this._getFeed(defaultFilters);
    getUsersSuggestions();
    changeFiltersGender(defaultFilters.gender);
    const that = this;
    setInterval(() => {
      that.handleScrollPosition();
    }, 1000);
  }

  _getFeed(query) {
    this.props.getFeed(query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flatLooks !== this.props.flatLooks) {
      this.setState({
        flatLooksLeft: _.filter(nextProps.flatLooks, (look, index) => index % 2 === 0),
        flatLooksRight: _.filter(nextProps.flatLooks, (look, index) => index % 2 === 1),
        loadingMore: false,
      });
    }

    if (nextProps.clearedField) {
      this.currPosition = 0;
      this.setState({ noMoreData: false });
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   if(nextProps !== this.props) {
  //     _.each(Object.keys(this.props),thisPropsKey=>{
  //       if(this.props[thisPropsKey]!==nextProps[thisPropsKey]){
  //         console.log(`MediaContainer, props changed! field: ${thisPropsKey}`,this.props[thisPropsKey],nextProps[thisPropsKey]);
  //         return true
  //       }
  //     })
  //   }
  //   return false
  // }

  handleScroll(event) {
    if (this.props.cardNavigationStack.index === 0) {
      if (this.props.showBodyModal) {
        this.scrollCallAsync(event);
      } else {
        const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
        const contentSizeHeight = event.nativeEvent.contentSize.height;
        const currentScroll = event.nativeEvent.contentOffset.y;
        if (currentScroll + layoutMeasurementHeight > contentSizeHeight - 250) { // currentScroll(topY) + onScreenContentSize > whole scrollView contentSize / 2
          if (!this.state.loadingMore && !this.state.isLoading) {
            this.setState({ loadingMore: true }, this.loadMore);
          }
        } else {
        }
      }
      this.currPosition = event.nativeEvent.contentOffset.y;
    }
  }

  handleScrollPosition() {
    if (this.state.currentScrollPosition !== this.currPosition) {
      this.setState({ currentScrollPosition: this.currPosition });
    }
  }

  loadMore() {
    if (this.state.isLoading) {
      return;
    }
    const { meta: { total }, query } = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({ isLoading: true }, () => {
        this.props.loadMore().then(() => {
          this.setState({ isLoading: false });
        }
        ).catch((err) => {
          this.setState({ isLoading: false });
        });
      });
    } else {
      this.setState({ noMoreData: true });
    }
  }

  _renderLooks(looks: array) {
    return _.map(looks, look => (
      <MediaContainer
        look={look}
        currScroll={this.state.currentScrollPosition}
        navigateTo={this.props.navigateTo}
        navigateToLooksScreen={this.props.navigateToLooksScreen}
        NavigateToLooks={this.props.navigateToLooks}
        sendParisMessage={this.props.showParisBottomMessage}
        key={look.id}
        shouldOptimize={this.state.flatLooksLeft.length > 10}
        showMediaGrid
        fromScreen={'Feedscreen'} />
    ));
  }

  _renderLoadMore() {
    return (
      <View style={styles.loader}>
        {(() => {
          if (this.state.noMoreData) {
            return <Text style={{ color: 'rgb(230,230,230)' }}>No additional looks yet</Text>;
          }
          if (this.state.isLoading) {
            return <Spinner color="rgb(230,230,230)" />;
          }
          if (this.props.flatLooks.length > 2) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')} />;
          }
          return null;
        })()}
      </View>);
  }

  _renderLoading() {
    if (this.props.reloading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color="#666666" />
        </View>
      );
    }
  }

  _renderRefreshingCover() {
    return (
      this.state.isRefreshing &&
      <View style={styles.refreshingCover} />
    );
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this.onRefresh}
        tintColor="#666666"
        colors={['#666666']}
        progressBackgroundColor="#fff"
      />
    );
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    const { refreshFeed, query } = this.props;
    // reset the first page
    const cleanQuery = _.cloneDeep(query);
    delete cleanQuery.page;
    refreshFeed(cleanQuery)
      .then(() => {
        this.setState({ isRefreshing: false });
      })
      .catch((error) => {
        this.setState({ isRefreshing: false });
      });
  }

  renderInviteFriend() {
    return (
      <View style={{ width: deviceWidth / 2, height: deviceWidth / 4, margin: 3, marginRight: 3 }}>
        <Image
          source={{ uri: 'https://cdn1.infash.com/assets/buttons/feed_invite_1.png' }}
          style={{ width: deviceWidth / 2 - 6, height: deviceWidth / 4 }}
          resizeMode={'stretch'} />
      </View>
    );
  }

  renderColumns() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: deviceWidth,
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <View style={{ flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin: 0 }}>
          {this._renderLooks(this.state.flatLooksLeft)}
        </View>
        <View style={{ flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin: 0 }}>
          <TouchableOpacity onPress={() => this._onInviteFriendsClick()}>
            {this.renderInviteFriend()}
          </TouchableOpacity>
          {this._renderLooks(this.state.flatLooksRight)}
        </View>
      </View>
    );
  }

  checkIfFeedResultsAreFiltered() {
    const { query } = this.props;
    const parsedQuery = _.cloneDeep(query);
    delete parsedQuery.page;
    delete parsedQuery.followings;
    delete parsedQuery['sort[field]'];
    delete parsedQuery.gender;
    const bodyTypeFromQuery = parsedQuery.body_type ? parsedQuery.body_type : '';
    if (bodyTypeFromQuery.length === 0) {
      delete parsedQuery.body_type;
    }
    return !_.isEmpty(parsedQuery);
  }

  _renderEmptyContentText() {
    if (this.checkIfFeedResultsAreFiltered()) {
      return (
        <Text style={styles.searchPeopleNoResultsTxt}>{i18n.t('ME_NO_FOLLOWING_RESULTS')}</Text>
      );
    } else {
      return (
        <View>
          <Text style={styles.searchPeopleNoResultsTxt}>{i18n.t('ME_NO_FOLLOWING_TITLE')}</Text>
        </View>
      );
    }
  }

  _renderEmptyContent() {
    const { onFollowClicked, usersSuggestions } = this.props;
    if (usersSuggestions.length > 0) {
      return (
        <ScrollView style={styles.userSuggestionsScroll}>
          {this._renderEmptyContentText()}
          {this._renderUsersSuggestionView()}
        </ScrollView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EmptyStateScreen
          title={i18n.t('ME_NO_FOLLOWING_TITLE')} subtitle={i18n.t('ME_NO_FOLLOWING_LEGEND')}
          icon={require('../../../images/emptyStates/user-admin.png')}
          buttonText={i18n.t('START_FOLLOWING')}
          onButtonClicked={onFollowClicked}
        />
      </View>
    );
  }


  _renderScrollView() {
    const { flatLooks } = this.props;
    return (
      <View style={styles.tab}>
        <ScrollView
          ref={c => this.scrollView = c}
          style={{ flex: 1 }}
          scrollEventThrottle={100}
          onScroll={this.handleScroll}
          refreshControl={this._renderRefreshControl()}>
          {this.renderColumns()}
          { flatLooks.length < 6 ? this._renderUsersSuggestionView() : null}
          {this._renderLoadMore()}
          {this._renderRefreshingCover()}
        </ScrollView>
        {this._renderLoading()}
      </View>
    );
  }

  renderUserSuggestionsList(usersSuggestions) {
    const { navigateTo } = this.props;
    return _.map(usersSuggestions, suggestedUser => (
      <UserActionCard {...suggestedUser} key={suggestedUser.id} navigateTo={navigateTo} />
    ));
  }

  _renderSuggestionHeader() {
    return (
      <View style={styles.userSuggestionHeaderContainer}>
        <Text style={styles.userSuggestionHeaderText}>{i18n.t('PEOPLE_SUGGESTION_FEED')}</Text>
        <Image source={emptyUsersIcon} style={styles.userSuggestionHeaderIcon} resizeMode={'contain'} />
      </View>
    );
  }

  _renderUsersSuggestionView() {
    const { onFollowClicked, usersSuggestions } = this.props;
    if (usersSuggestions.length > 0) {
      return (
        <View style={styles.userSuggestionsContainer}>
          {this._renderSuggestionHeader()}
          {this.renderUserSuggestionsList(usersSuggestions)}
          <TouchableOpacity style={styles.followMoreBtnContainer} onPress={onFollowClicked}>
            <View style={styles.followMoreBtn}>
              <Image source={search} style={styles.searchPeopleIcon} />
            </View>
            <View style={styles.searchPeopleTxtContainer}>
              <Text style={styles.searchPeopleTxt}>{i18n.t('SEARCH_FOR_MORE_PEOPLE')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else return null;
  }

  _renderLoader() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', height: deviceHeight - 150 }}>
        <ActivityIndicator animating style={{ height: 50 }} color={Colors.secondaryColor} />
      </View>

    );
  }

  _renderFilterView() {
    const { myFeedType, toggleFiltersMenus, filtersGender, changeFiltersGender, defaultFilterQuery } = this.props;
    return (
      <FiltersView
        currentFeedTab={myFeedType}
        toggleFiltersMenus={toggleFiltersMenus}
        getFeed={this._getFeed}
        filtersGender={filtersGender}
        changeFiltersGender={changeFiltersGender}
        defaultQuery={defaultFilterQuery} />
    );
  }

  _renderFeedFilters() {
    const { query } = this.props;
    return (
      <FeedFilters query={query} getFeed={this._getFeed} />
    );
  }

  componentDidUpdate(prevProps) {
    const { isFiltersMenuOpen, isTabOnFocus, showBottomCameraButton } = this.props;
    if (isTabOnFocus) {
      if (isFiltersMenuOpen) {
        showBottomCameraButton(false);
      } else {
        showBottomCameraButton(true);
      }
    }
    if (this.scrollView && prevProps.isFiltersMenuOpen !== isFiltersMenuOpen && !isFiltersMenuOpen) {
      _.delay(() => this.scrollView.scrollTo({ y: this.currPosition, x: 0, animated: false }), 0);
    }
  }

  render() {
    const { isFiltersMenuOpen, flatLooks, isLoading } = this.props;
    if (isLoading) {
      return this._renderLoader();
    } else if (isFiltersMenuOpen) {
      return (
        <View style={{ flexGrow: 1, alignSelf: 'stretch' }}>
          { this._renderFilterView() }
        </View>
      );
    } else {
      return (
        <View style={{ flexGrow: 1, alignSelf: 'stretch' }}>
          {this._renderFeedFilters()}
          { flatLooks.length === 0 ? this._renderEmptyContent() : this._renderScrollView() }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    height: LOADER_HEIGHT,
    alignItems: 'center',
    padding: 5,
  },
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  refreshingCover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  linearGradient: {
    width: deviceWidth,
    position: 'absolute',
    top: 0,
  },
  userSuggestionsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: generateAdjustedSize(75),
  },
  followMoreBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: generateAdjustedSize(80),
    height: generateAdjustedSize(80),
    borderRadius: generateAdjustedSize(40),
    borderWidth: 1,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  followMoreBtnContainer: {
    width: deviceWidth / 3,
    padding: generateAdjustedSize(12),
    flexDirection: 'column',
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  searchPeopleTxt: {
    fontSize: generateAdjustedSize(12),
    textAlign: 'center',
    backgroundColor: Colors.transparent,
    color: Colors.black,
    fontFamily: Fonts.mediumFont,

  },
  searchPeopleNoResultsTxt: {
    fontSize: generateAdjustedSize(16),
    textAlign: 'center',
    color: Colors.black,
    padding: 20,
    fontFamily: Fonts.regular,
  },
  searchPeopleIcon: {
    height: generateAdjustedSize(30),
    width: generateAdjustedSize(30),
    marginBottom: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    resizeMode: 'contain',
  },
  searchPeopleTxtContainer: {
    alignSelf: 'center',
    padding: generateAdjustedSize(3),
  },
  userSuggestionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    width: deviceWidth,
    height: generateAdjustedSize(45),
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 3,
    borderColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  userSuggestionHeaderText: {
    flex: 1,
    color: Colors.gray,
    fontWeight: '500',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
  },
  userSuggestionHeaderIcon: {
    position: 'absolute',
    width: generateAdjustedSize(40),
    height: generateAdjustedSize(40),
    padding: generateAdjustedSize(5),
    left: generateAdjustedSize(15),
  },
  userSuggestionsScroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchPeopleNoResultsTxtSubTitle: {
    paddingTop: 0,
  },
});

export default FollowingTabContent;
