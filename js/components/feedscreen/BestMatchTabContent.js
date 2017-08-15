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
  Animated,
  RefreshControl,
  View,
  NetInfo,
  ActivityIndicator,
} from 'react-native';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import BaseComponent from '../common/base/BaseComponent';
import MediaContainer from '../common/MediaContainer';
import _ from 'lodash';
import {formatInvitationMessage} from '../../lib/messages/index';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../styles/Colors.styles';
import Fonts from '../../styles/Fonts.styles';
import i18n from 'react-native-i18n';
import BodyTypePicker from '../myBodyType/BodyTypePicker';
import SolidButton from "../common/buttons/SolidButton";
import FiltersView from './FilterContainer';
import EmptyStateScreen from '../common/EmptyStateScreen';
import FeedFilters from './FeedFilters';
import {generateAdjustedSize} from '../../utils/AdjustabaleContent';
import {CATEGORIES, EVENTS} from '../../reducers/filters';

const noResultsIcon = require('../../../images/emptyStates/search.png');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const LOADER_HEIGHT = 30;

class BestMatchTabContent extends BaseComponent {

  static propTypes = {
    hasUserSize: React.PropTypes.bool,
    flatLooks: React.PropTypes.array,
    query: React.PropTypes.object,
    reloading: React.PropTypes.bool,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    getFeed: React.PropTypes.func,
    showBodyTypeModal: React.PropTypes.func,
    loadMore: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this._renderRefreshControl = this._renderRefreshControl.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.handleScrollPositionForVideo = this.handleScrollPositionForVideo.bind(this);
    this._renderFeedFilters = this._renderFeedFilters.bind(this);
    this._getFeed = this._getFeed.bind(this);
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
    this.logEvent('Feedscreen', {name: 'Invite your friends click'});
    const message = SocialShare.generateShareMessage(formatInvitationMessage());
    SocialShare.nativeShare(message);
  }

  componentDidMount() {
    this._getFeed(this.props.defaultFilters);
    const that = this;
    setInterval(() => {
      that.handleScrollPositionForVideo();
    }, 1000);
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        isConnected ? this.props.showParisBottomMessage(`Hey ${this.props.userName}, you look amazing today!`) : null;
      }
    );
  }

  _getFeed(query) {
    this.props.getFeed(query);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isTabOnFocus && this.props.isTabOnFocus) {
      this.props.showBottomCameraButton(false);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isTabOnFocus && !this.props.isTabOnFocus && !nextProps.hasUserSize) {
      this.props.showBottomCameraButton(false);
    }

    if (!this.props.hasUserSize && nextProps.hasUserSize) {
      this._getFeed(this.props.defaultFilters);
    }

    if (nextProps.flatLooks !== this.props.flatLooks) {
      this.setState({
        flatLooksLeft: _.filter(nextProps.flatLooks, (look, index) => index % 2 === 0),
        flatLooksRight: _.filter(nextProps.flatLooks, (look, index) => index % 2 === 1),
        loadingMore: false,
      });
    }

    if (nextProps.clearedField) {
      this.currPosition = 0;
      this.setState({noMoreData: false});
    }

    if (this.props.isFilterMenuOpen !== nextProps.isFilterMenuOpen) {
      this.props.showBottomCameraButton(!nextProps.isFilterMenuOpen)
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
        const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
        const contentSizeHeight = event.nativeEvent.contentSize.height;
        const currentScroll = event.nativeEvent.contentOffset.y;
        if (currentScroll + layoutMeasurementHeight > contentSizeHeight - 250) { // currentScroll(topY) + onScreenContentSize > whole scrollView contentSize / 2
          if (!this.state.loadingMore && !this.state.isLoading) {
            this.setState({loadingMore: true}, this.loadMore);
          }
        } else {
        }
      }
      this.currPosition = event.nativeEvent.contentOffset.y;
  }

  handleScrollPositionForVideo() {
    if (this.state.currentScrollPosition !== this.currPosition) {
      this.props.showBottomCameraButton(this.state.currentScrollPosition > this.currPosition);
      this.setState({currentScrollPosition: this.currPosition});
    }
  }

  loadMore() {
    if (this.state.isLoading) {
      console.log('already isLoading');
      return;
    }
    const {meta: {total}, query} = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({isLoading: true}, () => {
        this.props.loadMore().then(() => {
            this.setState({isLoading: false});
          }
        ).catch((err) => {
          console.log('error', err);
          this.setState({isLoading: false});
        });
      });
    } else {
      this.setState({noMoreData: true});
      console.log('end of feed');
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
    return (
      <View style={styles.loader}>
        {(() => {
          if (this.state.noMoreData) {
            return <Text style={{color: 'rgb(230,230,230)'}}>No additional looks yet</Text>;
          }
          if (this.state.isLoading) {
            return <Spinner color="rgb(230,230,230)"/>;
          }
          if (this.props.flatLooks.length > 2) {
            return <Image source={require('../../../images/icons/feedLoadMore.gif')}/>;
          }
          return null;
        })()}
      </View>);
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

  onRefresh() {
    this.setState({isRefreshing: true});
    const {getFeed, query} = this.props;
    // reset the first page
    const cleanQuery = _.cloneDeep(query);
    delete cleanQuery.page;
    getFeed(cleanQuery)
      .then(() => {
        this.setState({isRefreshing: false});
      })
      .catch((error) => {
        console.log('Error when preload image', error);
        this.setState({isRefreshing: false});
      });
  }

  renderInviteFriend() {
    return (
      <View style={{width: deviceWidth / 2, height: deviceWidth / 4, margin: 3, marginRight: 3}}>
        <Image
          source={{uri: 'https://cdn1.infash.com/assets/buttons/feed_invite_1.png'}}
          style={{width: deviceWidth / 2 - 6, height: deviceWidth / 4}}
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
        <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin: 0}}>
          {this._renderLooks(this.state.flatLooksLeft)}
        </View>
        <View style={{flex: 0.5, flexDirection: 'column', padding: 0, paddingHorizontal: 0, margin: 0}}>
          <TouchableOpacity onPress={() => this._onInviteFriendsClick()}>
            {this.renderInviteFriend()}
          </TouchableOpacity>
          {this._renderLooks(this.state.flatLooksRight)}
        </View>
      </View>
    );
  }

  _renderEmptyContent() {
    const emptyTitle = i18n.t('EMPTY_FEED_TITLE');
    const emptySubtitle = i18n.t('EMPTY_FEED_LEGEND');

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
          ref={ c => this.scrollView = c }
          style={{flex: 1}}
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
      <View style={{alignItems: 'center', justifyContent: 'center', height: deviceHeight - 150}}>
        <ActivityIndicator animating style={{height: 50}} color={Colors.secondaryColor}/>
      </View>

    );
  }

  _renderFilterView() {
    const {myFeedType} = this.props;
    return (
      <FiltersView currentFeedTab={myFeedType} showFilters={[CATEGORIES, EVENTS]}/>
    )
  }

  _renderFeedFilters() {
    const {query} = this.props;
    const clonedQuery = _.cloneDeep(query);
    delete clonedQuery.body_type
    return (
      <FeedFilters query={clonedQuery} getFeed={this._getFeed}/>
    )
  }

  componentDidUpdate(prevProps) {
    const {isFilterMenuOpen} = this.props
    if(this.scrollView && prevProps.isFilterMenuOpen !== isFilterMenuOpen && !isFilterMenuOpen) {
      _.delay(() => this.scrollView.scrollTo({ y: this.currPosition, x: 0, animated: false}), 0)
    }
  }

  render() {
    const {isFilterMenuOpen, flatLooks, isLoading, hasUserSize} = this.props
    if (!hasUserSize) {
      return this._renderChooseBodyShape();
    } else if (isLoading) {
      return this._renderLoader();
    } else {
      if(isFilterMenuOpen) {
        return (
          <View style={{flexGrow: 1, alignSelf: 'stretch'}}>
            { this._renderFilterView() }
          </View>
        );
      } else {
        return (
          <View style={{flexGrow: 1, alignSelf: 'stretch'}}>
            {this._renderFeedFilters()}
            { flatLooks.length === 0 ? this._renderEmptyContent() : this._renderScrollView() }
          </View>
        );
      }
    }
  }

  _renderChooseBodyShape = () => {

    const {saveBodyShape} = this.props;

    return (
      <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
        <ScrollView contentContainerStyle={{paddingBottom: 16}}>
          <Text style={styles.bodyShapeLegend}>{i18n.t('BODY_SHAPE_LEGEND')}</Text>
          <BodyTypePicker
            goBack={() => this.toggleBodyTypeModal(false)}
            onPick={() => this.toggleBodyTypeModal(false)}/>
          <SolidButton label="CHOOSE" onPress={saveBodyShape}/>
        </ScrollView>
      </View>
    );
  }
}

const
  styles = StyleSheet.create({
    bodyShapeLegend: {
      marginHorizontal: 16,
      marginVertical: 12,
      textAlign: 'center',
      fontFamily: Fonts.contentFont,
      color: Colors.black,
      fontSize: generateAdjustedSize(16),
    },
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
  });

export default BestMatchTabContent;
