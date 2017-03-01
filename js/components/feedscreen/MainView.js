import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore } from '../../actions';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import FilterBar from './filters/FilterBar';
import RecentTab from './RecentTab';
import BestMatchTab from './BestMatchTab';
import SearchBar from './SearchBar';
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
      reload: false,
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

  getFeed(query) {
    this.setState({reload: true}, () => {
      this.props.getFeed(query).then(() => {
        this.setState({reload: false});
      });  
    });
  }

  resetFeed() {
    this.setState({reload: true}, () => {
      this.props.resetFeed().then(() => {
        this.setState({reload: false});
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
    const { reload } = this.state;
    if(this.props.query.type === 'relevant') {
      return <BestMatchTab reload={reload} filterHeight={this.state.filterHeight} handleSwipeTab={this.handleSwipeTab.bind(this)} tabLabel='BEST MATCH'/>
    } else {
      return <RecentTab reload={reload} filterHeight={this.state.filterHeight} tabLabel='RECENT' handleSwipeTab={this.handleSwipeTab.bind(this)}/>
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

