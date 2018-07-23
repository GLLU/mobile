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
  ActivityIndicator,
} from 'react-native';
import _ from 'lodash';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import BaseComponent from '../common/base/BaseComponent';
import MediaContainer from '../common/MediaContainer';
import { formatInvitationMessage } from '../../lib/messages/index';
import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import QuerySuggestions from './querySuggestionsGrid/QuerySuggestions';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import i18n from 'react-native-i18n';
import FiltersView from './FilterContainer';
import FeedFilters from './FeedFilters';
import EmptyStateScreen from '../common/EmptyStateScreen';

const noResultsIcon = require('../../../images/emptyStates/search.png');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const LOADER_HEIGHT = 30;

class HotTabContent extends BaseComponent {

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
    this.getFeedWithSuggestion = this.getFeedWithSuggestion.bind(this);
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
    const { changeFiltersGender, defaultFilters } = this.props;
    this._getFeed(defaultFilters);
    changeFiltersGender(defaultFilters.gender);
    const that = this;
    setInterval(() => {
      that.handleScrollPosition();
    }, 1000);
  }

  _getFeed(query) {
    this.props.getFeed({ ...query, 'page[size]': 31, 'page[number]': 1 });
  }

  getFeedWithSuggestion(suggestionQuery) {
    this.setState({ isRefreshing: true });
    const { getFeed } = this.props;
    getFeed(suggestionQuery)
      .then(() => {
        this.setState({ isRefreshing: false });
      })
      .catch((error) => {
        this.setState({ isRefreshing: false });
      });
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

  handleScroll(event) {
    if (this.props.cardNavigationStack.index === 0) {
      const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const currentScroll = event.nativeEvent.contentOffset.y;
      if (currentScroll + layoutMeasurementHeight > contentSizeHeight - 2350 - layoutMeasurementHeight) { // currentScroll(topY) + onScreenContentSize > whole scrollView contentSize / 2
        // if (!this.state.loadingMore && !this.state.isLoading) {
        //   this.setState({ loadingMore: true }, this.loadMore);
        // }
        this.loadMore();
      } else {
      }
    }
    this.currPosition = event.nativeEvent.contentOffset.y;
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

    if (query['page[number]'] * query['page[size]'] < total) {
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
        fromScreen={'Feedscreen'}/>
    ));
  }

  _renderLoadMore() {
    const { querySuggestions } = this.props;

    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <Spinner color="rgb(230,230,230)" />
        </View>
      );
    }
    if (this.props.flatLooks.length > 2) {
      return (
        <View style={styles.loader}>
          <Image source={require('../../../images/icons/feedLoadMore.gif')} />
        </View>
      );
    }
  }

  _renderLoading() {
    if (this.props.reloading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color="#666666"/>
        </View>
      );
    }
  }

  _renderRefreshingCover() {
    return (
      this.state.isRefreshing &&
      <View style={styles.refreshingCover}/>
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

  difference(object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] = _.isObject(value) && _.isObject(base[key]) ? this.difference(value, base[key]) : value;
      }
    });
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
          source={{ uri: 'https://cdn1.infash.com/assets/buttons/feed_invite_2.png' }}
          style={{ width: deviceWidth / 2 - 6, height: deviceWidth / 4 }}
          resizeMode={'stretch'}/>
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

  _renderEmptyContent() {
    const { querySuggestions } = this.props;
    const emptyTitle = i18n.t('EMPTY_FEED_TITLE');
    const emptySubtitle = i18n.t('EMPTY_FEED_LEGEND');
    if (!_.isEmpty(querySuggestions)) {
      return (
        <ScrollView style={styles.looksSuggestionsScroll}>
          <Text style={styles.filterLooksNoResultsTxt}>{i18n.t('ME_NO_BEST_MATCH_RESULTS')}</Text>
          <QuerySuggestions querySuggestions={querySuggestions} getFeedWithSuggestion={this.getFeedWithSuggestion}/>
        </ScrollView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <EmptyStateScreen
          title={emptyTitle}
          subtitle={emptySubtitle} icon={noResultsIcon}/>
      </View>
    );
  }

  _renderScrollView() {
    return (
      <View style={styles.tab}>
        <ScrollView
          ref={c => this.scrollView = c}
          style={{ flex: 1 }}
          scrollEventThrottle={100}
          onScroll={this.handleScroll}
          refreshControl={this._renderRefreshControl()}>
          {this.renderColumns()}
          {this._renderLoadMore()}
          {this._renderRefreshingCover()}
        </ScrollView>
        {this._renderLoading()}
      </View>
    );
  }

  _renderLoader() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', height: deviceHeight - 150 }}>
        <ActivityIndicator animating style={{ height: 50 }} color={Colors.secondaryColor}/>
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
        defaultQuery={defaultFilterQuery}/>
    );
  }

  _renderFeedFilters() {
    const { query } = this.props;
    return (
      <FeedFilters query={query} getFeed={this._getFeed}/>
    );
  }

  componentDidUpdate(nextProps, nextState) {
    const { isFiltersMenuOpen, isTabOnFocus, showBottomCameraButton } = this.props;
    if (isTabOnFocus) {
      if (isFiltersMenuOpen) {
        showBottomCameraButton(false);
      } else {
        showBottomCameraButton(true);
      }
    }
    if (this.scrollView && nextProps.isFiltersMenuOpen !== isFiltersMenuOpen && !isFiltersMenuOpen) {
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
          {this._renderFilterView()}
        </View>
      );
    } else {
      return (
        <View style={{ flexGrow: 1, alignSelf: 'stretch' }}>
          {this._renderFeedFilters()}
          {flatLooks.length === 0 ? this._renderEmptyContent() : this._renderScrollView()}
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
  looksSuggestionsScroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  filterLooksNoResultsTxt: {
    fontSize: generateAdjustedSize(16),
    textAlign: 'center',
    color: Colors.black,
    padding: 20,
    fontFamily: Fonts.regular,
  },
});

export default HotTabContent;
