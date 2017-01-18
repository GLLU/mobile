import React, { Component } from 'react';
import { View, Container, Content } from 'native-base';
var CustomTabBar = require('./CustomTabBar');
import FilterBar from './filters/FilterBar';

import RecentTab from './RecentTab';
import FollowingTab from './FollowingTab';
import BestMatchTab from './BestMatchTab';

import tabTheme from './../../themes/tab';
import styles from './styles';

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      isOpen: false,
    }
  }


  handleSwipeTab(locked) {
    this.setState({
      locked: locked
    })
  }

  _toggleFeedType(currFeedTypeSelected) {
    this.setState({
      currFeedTypeSelected
    })
    console.log(this.state.currFeedTypeSelected)
  }

  render() {
    return(
      <View style={styles.mainView} scrollEnabled={false}>
        <Container>
            <Content theme={tabTheme} scrollEnabled={false}>
              <FilterBar toggleFeedType={(FeedTypeSelected) => this._toggleFeedType(FeedTypeSelected)}/>
              {this.state.currFeedTypeSelected === 'Best Match' ?
                <BestMatchTab handleSwipeTab={this.handleSwipeTab.bind(this)} tabLabel='ALL' />
                :
                <RecentTab tabLabel='NEW' handleSwipeTab={this.handleSwipeTab.bind(this)}/>
              }
            </Content>
        </Container>
      </View>
    )
  }
}

export default MainView;
