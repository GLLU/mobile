import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { getFeed, resetFeed, loadMore } from '../../actions';
import TabContent from './TabContent';
import SearchView from './SearchView'
import Utils from '../../Utils';
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
    navigation: React.PropTypes.object,
    getFeed: React.PropTypes.func,
    resetFeed: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      reloading: false,
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
    const {reloading} = this.state;
    const tabLabel = this.props.query.type === 'relevant' ? 'BEST MATCH' : 'RECENT';
    return (
      <TabContent
        reloading={reloading}
        handleSwipeTab={this.handleSwipeTab.bind(this)}
        tabLabel={tabLabel}/>
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
    navigation: state.cardNavigation,
    query: state.feed.query,
  };
}

export default connect(mapStateToProps, bindActions)(MainView);

