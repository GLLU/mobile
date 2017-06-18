import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore, clearFeed } from '../../actions';
import TabContent from './TabContent';
import SearchView from './SearchView'
import _ from 'lodash';
import VisibilityContainer from "../common/VisibilityContainer";
const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');
import LinearGradient from 'react-native-linear-gradient';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
import ExtraDimensions from 'react-native-extra-dimensions-android';
import ParisAdjustableMessage from '../paris/ParisAdjustableMessage';

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  linearGradient: {
    width: deviceWidth,
    position: 'absolute',
    top: 0
  },
});

class MainView extends Component {
  static propTypes = {
    searchStatus: React.PropTypes.bool,
    query: React.PropTypes.object,
    getFeed: React.PropTypes.func,
    resetFeed: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleSwipeTab = this.handleSwipeTab.bind(this)
    this.state = {
      locked: false,
      isOpen: false,
      reloading: false,
      clearedField: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchTerm !== this.props.searchTerm) {
      this._handleSearchInput(nextProps.searchTerm)
    }
  }

  componentWillMount() {
    this.getFeed(this.props.defaultFilters);
  }

  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  getFeed(query) {
      this.props.clearFeed().then(() => {
        this.setState({ clearedField: true});
        this.props.getFeed(query).then(() => {
          this.setState({ clearedField: false});
        });
      });
  }

  resetFeed() {
    this.setState({reloading: true}, () => {
      this.props.resetFeed().then(() => {
        this.setState({reloading: false});
      });
    });
  }

  _clearFilter() {
    this._filterFeed({}, true);
  }

  _filterFeed(query) {
    if (_.isEmpty(query)) {
      this.resetFeed()
    }
    else {
      if (!_.isEqual(query, this.props.query)) {
        this.getFeed(query);
      }
    }
  }

  _renderFeed() {
    const {reloading, clearedField} = this.state;
    const tabLabel = this.props.query.type === 'relevant' ? 'BEST MATCH' : 'RECENT';
    return (
      <TabContent
        navigateTo={this.props.navigateTo}
        reloading={reloading}
        handleSwipeTab={this.handleSwipeTab}
        tabLabel={tabLabel}
        clearedField={clearedField}/>
    );
  }

  _handleSearchInput(term) {
    this._filterFeed({term})
  }

  renderSearchView() {
    return (
      <VisibilityContainer visible={this.props.searchStatus}>
        <SearchView
          handleSearchInput={(term) => this._handleSearchInput(term)}
          clearText={this.props.query.term}
          typeFilter={this.props.query.type}
          clearFilter={this._clearFilter.bind(this)}
          filterFeed={this._filterFeed.bind(this)}
        />
      </VisibilityContainer>
    );
  }

  renderEmptyContent() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Image source={profileBackground} style={{resizeMode: 'contain', width: deviceWidth, height: deviceHeight-80, alignSelf: 'flex-start'}} >
          <LinearGradient colors={['#0C0C0C', '#4C4C4C']}
                          style={[myStyles.linearGradient, {opacity: 0.7}]}/>
          <View style={{marginTop: 100}}>
            <ParisAdjustableMessage text={'Sorry, no looks available yet, you should upload one!'}/>
          </View>
        </Image>

      </View>
    )
  }

  render() {
    return (
      <View style={myStyles.mainView}>
        {this.renderSearchView()}
        <View style={{flexGrow: 1, alignSelf: 'stretch'}}>
          { !this.state.clearedField && this.props.totalLooks === 0 ? this.renderEmptyContent() : this._renderFeed() }
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    getFeed: (query) => dispatch(getFeed(query)),
    resetFeed: () => dispatch(resetFeed()),
    clearFeed: () => dispatch(clearFeed()),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = state => {
  let defaultFilters = {
    gender: '',
    body_type: ''
  };
  if (state.user.user_size) {
    const myBodyType = state.user.user_size.body_type ? state.user.user_size.body_type : '';
    const myGender = state.user.gender ? state.user.gender : '';
    defaultFilters = {
      gender: myGender,
      body_type: myBodyType
    };
  }
  return {
    defaultFilters: defaultFilters,
    query: state.feed.query,
    totalLooks: state.feed.meta.total
  };
}

export default connect(mapStateToProps, bindActions)(MainView);

