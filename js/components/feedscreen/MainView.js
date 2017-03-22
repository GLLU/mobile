import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore } from '../../actions';
import FilterBar from './filters/FilterBar';
import TabContent from './TabContent';
import SearchBar from './SearchBar';
import SearchView from './SearchView'
import Utils from '../../Utils';
import _ from 'lodash';

const myStyles = StyleSheet.create({
  mainView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
});

class MainView extends Component {
  static propTypes = {
    searchStatus: React.PropTypes.bool,
    query: React.PropTypes.object,
    navigation: React.PropTypes.object,
    getFeed: React.PropTypes.func,
    resetFeed: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      filterHeight: 45,
      searchHeight: 60,
      reloading: false,
    };
  }

  componentWillMount() {
    this.getFeed(this.props.query);
  }

  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  preloadLookImages(looks) {
    Utils.preloadLookImages(looks).then(() => {
      this.setState({reloading: false});
    }).catch(err => {
      console.log('something wrong with preload image', err);
      this.setState({reloading: false});
    });
  }

  getFeed(query) {
    this.setState({reloading: true}, () => {
      this.props.getFeed(query).then((looks) => {
        this.preloadLookImages(looks);
      });
    });
  }

  resetFeed() {
    this.setState({reloading: true}, () => {
      this.props.resetFeed().then((looks) => {
        this.preloadLookImages(looks);
      });
    });
  }

  _clearFilter() {
    this._filterFeed({}, true);
  }

  _filterFeed(query, reset = false) {
    if (reset) {
      return this.resetFeed();
    }
    let newState = {};
    const oldState = _.cloneDeep(this.props.query);
    if (reset) {
      newState = {type: 'relevant', category: null, term: ''};
    } else {
      newState = _.merge(this.props.query, query);
    }
    if (!_.isEqual(newState, oldState)) {
      this.getFeed(newState);
    }
  }

  _renderFeed() {
    const {reloading} = this.state;
    const tabLabel = this.props.query.type === 'relevant' ? 'BEST MATCH' : 'RECENT';
    return (
      <TabContent
        reloading={reloading}
        filterHeight={this.state.filterHeight}
        handleSwipeTab={this.handleSwipeTab.bind(this)}
        tabLabel={tabLabel}/>
    );
  }

  _handleMainviewHeight(e) {
    const height = e.nativeEvent.layout.height;
    this.mainViewHeight = height;
  }

  _handleSearchInput(term) {
    this._filterFeed({term})
  }

  _handleFilterLayoutChanged(e) {
    const height = e.nativeEvent.layout.height;
    if (height != this.state.filterHeight) {
      this.setState({filterHeight: height});
    }
  }

  _handleSearchLayoutChanged(e) {
    const height = e.nativeEvent.layout.height;
    if (height != this.state.searchHeight) {
      this.setState({searchHeight: height});
    }
  }

  renderSearchView() {
    if (this.props.searchStatus) {
      return (
        <SearchView
          onSearchBarLayout={e => this._handleSearchLayoutChanged(e)}
          handleSearchInput={(term) => this._handleSearchInput(term)}
          clearText={this.props.query.term}
          onFilterBarLayout={e => this._handleFilterLayoutChanged(e)}
          typeFilter={this.props.query.type}
          categoryFilter={this.props.query.category}
          clearFilter={this._clearFilter.bind(this)}
          filterFeed={this._filterFeed.bind(this)}
        />);
    }
  }

  render() {
    let mainViewStyle = {flexGrow: 1};
    if (this.mainViewHeight) {
      mainViewStyle = _.merge(mainViewStyle, {height: this.mainViewHeight - this.state.filterHeight - this.state.searchHeight});
    }
    return (
      <View style={myStyles.mainView}>
        {this.renderSearchView()}
        <View style={mainViewStyle} onLayout={e => this._handleMainviewHeight(e)}>
          { this._renderFeed() }
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    getFeed: (query) => dispatch(getFeed(query)),
    resetFeed: () => dispatch(resetFeed()),
    loadMore: () => dispatch(loadMore()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  query: state.feed.query,
});

export default connect(mapStateToProps, bindActions)(MainView);

