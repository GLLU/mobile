import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { getFeed } from '../../actions';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import FilterBar from './filters/FilterBar';
import RecentTab from './RecentTab';
import BestMatchTab from './BestMatchTab';
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
    searchTerm: React.PropTypes.string,
    clearSearchTerm: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      currFeedTypeSelected: 'relevant',
      currFeedCategorySelected: '',
      searchTerm: this.props.searchTerm,
      filterHeight: 45,
    };
  }

  componentWillMount() {
    this.props.getFeed({type: 'relevant'});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.searchTerm !== this.props.searchTerm) {
      this.setState({
        searchTerm: nextProps.searchTerm
      });
      this._filterFeed(this.state.currFeedTypeSelected, this.state.currFeedCategorySelected, nextProps.searchTerm)
    }
  }

  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  _filterFeed(type, category = '', term = this.state.searchTerm) {
    if(type !== this.state.currFeedTypeSelected){
      this.setState({
        currFeedTypeSelected: type
      })
    }

    if(category !== this.state.currFeedCategorySelected){
      this.setState({
        currFeedCategorySelected: category
      })
    }
    this.props.getFeed({type, category, term});
  }

  _renderFeed() {
    if(this.state.currFeedTypeSelected === 'relevant') {
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

  render() {
    let mainViewStyle = {flexGrow: 1};
    if (this.mainViewHeight) {
      mainViewStyle = _.merge(mainViewStyle, { height: this.mainViewHeight - this.state.filterHeight });
    }
    return(
      <View style={myStyles.mainView}>
        <FilterBar
            filterFeed={(type, category, term) => this._filterFeed(type, category, term)}
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

