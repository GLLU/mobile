import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore } from '../../actions';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import FilterBar from './filters/FilterBar';
import RecentTab from './RecentTab';
import BestMatchTab from './BestMatchTab';
import SearchBar from './SearchBar';
import tabTheme from './../../themes/tab';
import styles from './styles';
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
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      filterHeight: 45,
      searchHeight: 60,
    };
  }

  componentWillMount() {
    this.getFeed();
  }

  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  getFeed() {
    this.props.getFeed(this.props.query);
  }

  _clearFilter() {
    this._filterFeed({}, true);
  }

  _filterFeed(query, reset = false) {
    console.log('_filterFeed', query);
    if (reset) {
      return this.props.resetFeed();
    }
    let newState = {};
    const oldState = _.cloneDeep(this.props.query);
    if (reset) {
      newState = {type: 'relevant', category: null, term: ''};
    } else {
      newState = _.merge(this.props.query, query);
    }
    
    console.log('newState', newState);
    if (!_.isEqual(newState, oldState)) {
      this.props.getFeed(newState);
    }
  }

  _renderFeed() {
    if(this.props.query.type === 'relevant') {
      return <BestMatchTab filterHeight={this.state.filterHeight} handleSwipeTab={this.handleSwipeTab.bind(this)} tabLabel='BEST MATCH'/>
    } else {
      return <RecentTab  filterHeight={this.state.filterHeight} tabLabel='RECENT' handleSwipeTab={this.handleSwipeTab.bind(this)}/>
    }
  }

  _renderLoading() {
    if(this.props.navigation.index === 0){
      return <SpinnerSwitch />
    } else {
      this._renderFeed()
    }
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

  render() {
    let mainViewStyle = {flexGrow: 1};
    if (this.mainViewHeight) {
      mainViewStyle = _.merge(mainViewStyle, { height: this.mainViewHeight - this.state.filterHeight - this.state.searchHeight });
    }
    return(
      <View style={myStyles.mainView}>
        {this.props.searchStatus ? <SearchBar onLayout={e => this._handleSearchLayoutChanged(e)} handleSearchInput={(term) => this._handleSearchInput(term)} clearText={this.props.query.term}/> : null}
        <FilterBar
             onLayout={e => this._handleFilterLayoutChanged(e)}
            type={this.props.query.type}
            category={this.props.query.category}
            filterFeed={this._filterFeed.bind(this)}
            clearFilter={this._clearFilter.bind(this)}
            />
        <View style={mainViewStyle} onLayout={e => this._handleMainviewHeight(e)}>
          { this.props.isLoading === 0 ? this._renderFeed() : this._renderLoading() }
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
  isLoading: state.api.isReading,
  navigation: state.cardNavigation,
  query: state.feed.query,
});

export default connect(mapStateToProps, bindActions)(MainView);

