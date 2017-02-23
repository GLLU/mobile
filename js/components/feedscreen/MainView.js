import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { getFeed } from '../../actions';
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
    term: React.PropTypes.string,
    searchStatus: React.PropTypes.bool,
    clearSearchTerm: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      type: 'relevant',
      category: '',
      term: this.props.term,
      filterHeight: 45,
    };
  }

  componentWillMount() {
    this.props.getFeed({type: 'relevant'});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.term !== this.props.term) {
      this.setState({
        term: nextProps.term
      });
      this._filterFeed(this.state.type, this.state.category, nextProps.term)
    }
  }

  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }


  _filterFeed(query) {
    console.log('_filterFeed', query);
    const {type, category, term } = this.state;
    let newState = _.merge({
      type,
      category,
      term,
    }, query);

    this.setState(newState, () => {
      this.props.getFeed(newState);  
    });
  }

  _renderFeed() {
    if(this.state.type === 'relevant') {
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

  handleFilterBarHeightChanged(height) {
    this.setState({filterHeight: height});
  }

  _handleMainviewHeight(e) {
    const height = e.nativeEvent.layout.height;
    this.mainViewHeight = height;
  }

  _handleSearchInput(term) {
    this._filterFeed({term})
  }

  _clearSearchTerm() {
    this._filterFeed({term: ''})
  }

  render() {
    let mainViewStyle = {flexGrow: 1};
    if (this.mainViewHeight) {
      mainViewStyle = _.merge(mainViewStyle, { height: this.mainViewHeight - this.state.filterHeight });
    }
    return(
      <View style={myStyles.mainView}>
        {this.props.searchStatus ? <SearchBar handleSearchInput={(term) => this._handleSearchInput(term)} clearText={this.state.term}/> : null}
        <FilterBar
            type={this.state.type}
            category={this.state.category}
            filterFeed={this._filterFeed.bind(this)}
            clearSearchTerm={this.props.clearSearchTerm}
            onHeightChanged={this.handleFilterBarHeightChanged.bind(this)}
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
    getFeed: (query) => dispatch(getFeed(query))
  };
}

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(MainView);

