import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import PeopleSearchTab from './PeopleSearchTabContainer';
import LooksSearchTab from './LooksSearchTabContainer';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';

export default class SearchTabs extends Component {
  constructor(props) {
    super(props);
    this._handleIndexChange = this._handleIndexChange.bind(this)
    this._renderScene = this._renderScene.bind(this)
    this.state = {
      index: 0,
      routes: [
        {key: 'looks', title: 'Looks'},
        {key: 'people', title: 'People'},
      ],
    };
  }

  componentDidMount() {
    this.props.setCurrentTab(this.state.routes[this.state.index])
  }

  _handleIndexChange = index => {
    this.setState({index})
    this.props.setCurrentTab(this.state.routes[index])
  };

  _renderHeader = props => <TabBar
    tabStyle={styles.tabStyle} style={styles.TabBar}
    labelStyle={styles.labelStyle}
    indicatorStyle={styles.indicatorStyle} {...props} />;

  _renderScene = ({route}) => {
    const {navigateTo, searchFromHistory} = this.props;
    switch (route.key) {
      case 'looks':
        return (<LooksSearchTab
          navigateTo={navigateTo}
          isTabOnFocus={this.state.index === 1}
          searchFromHistory={searchFromHistory}/>);
      case 'people':
        return (<PeopleSearchTab
          navigateTo={navigateTo}
          isTabOnFocus={this.state.index === 1}
          searchFromHistory={searchFromHistory}
        />);
      default:
        return <View style={{height: 200, width: 450, backgroundColor: 'red'}}/>
          ;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor,
  },
  tabStyle: {
    height: 41.5,
  },
  TabBar: {
    backgroundColor: Colors.backgroundGrey,
  },
  indicatorStyle: {
    backgroundColor: Colors.secondaryColor,
  },
  labelStyle: {
    color: Colors.black,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: generateAdjustedSize(13),
  },
});
