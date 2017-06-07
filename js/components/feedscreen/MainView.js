import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore, clearFeed } from '../../actions';
import TabContent from './TabContent';
import SearchView from './SearchView'
import Utils from '../../utils';
import _ from 'lodash';
import VisibilityContainer from "../common/VisibilityContainer";

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
      clearedField: false
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

  render() {
    return (
      <View style={myStyles.mainView}>
        {this.renderSearchView()}
        <View style={{flexGrow: 1, alignSelf: 'stretch'}}>
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
  };
}

export default connect(mapStateToProps, bindActions)(MainView);

