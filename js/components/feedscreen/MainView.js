import React, { Component } from 'react';
import { View, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { getFeed } from '../../actions/feed';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import FilterBar from './filters/FilterBar';
import RecentTab from './RecentTab';
import BestMatchTab from './BestMatchTab';
import tabTheme from './../../themes/tab';
import styles from './styles';

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
      searchTerm: this.props.searchTerm
    };
    this.props.getFeed('relevant');
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
    this.props.getFeed(type, category, term);
  }

  componentWillUnmount(){
    console.log('main un mount')
  }
  _renderFeed() {
    if(this.state.currFeedTypeSelected === 'relevant') {
      return <BestMatchTab handleSwipeTab={this.handleSwipeTab.bind(this)} tabLabel='BEST MATCH' looks={this.props.looks}/>
    } else {
      return <RecentTab tabLabel='RECENT' handleSwipeTab={this.handleSwipeTab.bind(this)} looks={this.props.looks}/>
    }
  }

  _renderLoading() {
    if(this.props.navigation.index === 0){
      return <SpinnerSwitch />
    } else {
      this._renderFeed()
    }
  }
  render() {
    return(
      <View style={styles.mainView} scrollEnabled={false}>
        <Container>
            <Content theme={tabTheme} scrollEnabled={false}>
              <FilterBar filterFeed={(type, category, term) => this._filterFeed(type, category, term)} clearSearchTerm={this.props.clearSearchTerm}/>
              { this.props.isLoading === 0 ? this._renderFeed() : this._renderLoading() }
            </Content>
        </Container>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    getFeed: (feedType,feedCategory, feedTerm) => dispatch(getFeed(feedType, feedCategory, feedTerm))
  };
}

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  looks: state.feed.looks,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(MainView);

