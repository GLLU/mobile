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
      currFeedTypeSelected: 'relevant'

    }
    this.props.getFeed('relevant');
  }


  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  _toggleFeedType(currFeedTypeSelected) {
    this.props.getFeed(currFeedTypeSelected);
    this.setState({
      currFeedTypeSelected
    })
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
              <FilterBar toggleFeedType={(FeedTypeSelected) => this._toggleFeedType(FeedTypeSelected)}/>
              { Object.keys(this.props.looks).length !== 0 && this.props.isLoading === 0 ? this._renderFeed() : <SpinnerSwitch /> }
            </Content>
        </Container>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    getFeed: feedType => dispatch(getFeed(feedType))
  };
}

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  looks: state.feed.looks,
});

export default connect(mapStateToProps, bindActions)(MainView);

