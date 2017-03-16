import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, Animated, InteractionManager, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import styles from './styles';
import BottomLookContainer from './BottomLookContainer';
import { likeUpdate, unLikeUpdate } from '../../actions/likes';
import { loadMore, replaceAt } from '../../actions';
import { reportAbuse } from '../../actions/looks';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const w = Dimensions.get('window').width;
const { popRoute, pushRoute } = actions
const LOADER_HEIGHT = 30;

class LooksScreen extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number
    ]),
    flatLooksData: React.PropTypes.array,
    navigation: React.PropTypes.object,
    meta: React.PropTypes.object,
    query: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    likeUpdate: React.PropTypes.func,
    unLikeUpdate: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    loadMore: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0.35),
      fadeAnimContent: new Animated.Value(0),
      likes: this.props.flatLook.likes,
      liked: this.props.flatLook.liked,
      showAsFeed: typeof this.props.flatLook === 'number', // Will check if recieved one object or an index of flatLooksData
      width: w,
      height: h,
    }
    this.loadMoreAsync = _.debounce(this.loadMore, 100)
  }

  componentDidMount() {
    if(this.state.showAsFeed){
      this._scrollView.scrollTo({ x: 0, y: h*this.props.flatLook, animated: true });
    }
  }

  _toggleLike(isLiked){
    if (isLiked) {
      let data = {id: this.props.flatLook.id, likes: this.state.likes+1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: this.props.flatLook.id, likes: this.state.likes-1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  _tempPopRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  _goToProfile(look) {
      this.props.replaceAt('looksScreen', { key: 'profileScreen', optional: look}, this.props.navigation.key);
  }

  onLoad() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 750
    }).start();
  }

  loadMore() {
    console.log('loadMore');
    if (this.state.isLoading) {
      return;
    }
    const { meta: { total }, query } = this.props;
    const pageSize = query.page.size;
    const pageNumber = query.page.number;

    if (pageSize * pageNumber < total) {
      this.setState({isLoading: true}, () => {
        this.props.loadMore().then(() => {
          this.setState({isLoading: false});
        }).catch(err => {
          console.log('error', err);
          this.setState({isLoading: false});
        });
      });
    } else {
      this.setState({noMoreData: true})
      console.log('end of feed');
    }
  }

  componentWillUnmount() {
    console.log('lookscreen screen will unmount')
  }

  handleScroll(event) {
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const currentScroll = event.nativeEvent.contentOffset.y
    const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
    if (compare <= LOADER_HEIGHT) {
      this.loadMoreAsync();
    }
  }

  handleImageLayout(e) {
    const { width, height } = e.nativeEvent.layout;
    this.setState({width, height});
  }

  render() {
    let looksArr = this.state.showAsFeed ? this.props.flatLooksData : [this.props.flatLook]
    const { width, height } = this.state;
    return (
      <View>
        <ScrollView pagingEnabled={true}
                    ref={(c) => { this._scrollView = c; }}
                    scrollEventThrottle={100}
                    onScroll={this.handleScroll.bind(this)}>
          {looksArr.map((look, index) => {
            return (
              <View key={index}>
                <Animated.Image
                  resizeMode={'cover'}
                  style={[{opacity: this.state.fadeAnim},styles.itemImage]}
                  source={{uri: look.uri}}
                  onLayout={this.handleImageLayout.bind(this)}
                  onLoad={this.onLoad()}>
                  <BottomLookContainer
                    width={width}
                    height={height}
                    look={look}
                    tempPopRoute={(e) => this._tempPopRoute()}
                    goToProfile={(look) => this._goToProfile(look)}
                    toggleLike={(isLiked) => this._toggleLike(isLiked)}
                    toggleMenu={() => this._toggleMenu()}
                    isMenuOpen={this.state.isMenuOpen}
                    reportAbuse={(lookId) => this.props.reportAbuse(lookId)}
                  />
                </Animated.Image>
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unLikeUpdate: (id) => dispatch(unLikeUpdate(id)),
    reportAbuse: (lookId) => dispatch(reportAbuse(lookId)),
    loadMore: () => dispatch(loadMore()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => {
  return {
    isLoading: state.loader.loading,
    navigation: state.cardNavigation,
    flatLooksData: state.feed.flatLooksData,
    meta: state.feed.meta,
    query: state.feed.query,
  };
};

export default connect(mapStateToProps, bindAction)(LooksScreen);
