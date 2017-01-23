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
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
      currFeedTypeSelected: 'relevant',
      currFeedCategorySelected: ''

    }
    this.props.getFeed('relevant');
  }


  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  _toggleFeedType(currFeedTypeSelected, FeedCategorySelected) {
    this.props.getFeed(currFeedTypeSelected, FeedCategorySelected);
    this.setState({
      currFeedTypeSelected
    })
  }

  _toggleFeedCategoryFilter(currFeedCategorySelected) {

    this.setState({
      currFeedCategorySelected
    })
    this.props.getFeed(this.state.currFeedTypeSelected, currFeedCategorySelected);
  }

  _renderFeed() {
    if(this.state.currFeedTypeSelected === 'relevant') {
      return <BestMatchTab handleSwipeTab={this.handleSwipeTab.bind(this)} tabLabel='BEST MATCH' looks={this.props.looks}/>
    } else {
      return <RecentTab tabLabel='RECENT' handleSwipeTab={this.handleSwipeTab.bind(this)} looks={this.props.looks}/>
    }
  }

  render() {
    return(
      <View style={styles.mainView} scrollEnabled={false}>
        <Container>
            <Content theme={tabTheme} scrollEnabled={false}>
              <FilterBar toggleFeedType={(FeedTypeSelected, FeedCategorySelected) => this._toggleFeedType(FeedTypeSelected,FeedCategorySelected)}
                         toggleFeedCategoryFilter={(FeedCategorySelected) => this._toggleFeedCategoryFilter(FeedCategorySelected)}/>
              { this.props.isLoading === 0 ? this._renderFeed() : <SpinnerSwitch /> }
            </Content>
        </Container>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    getFeed: (feedType,feedCategory) => dispatch(getFeed(feedType, feedCategory))
  };
}

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  looks: state.feed.looks,
});

export default connect(mapStateToProps, bindActions)(MainView);

