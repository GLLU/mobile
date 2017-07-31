import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import SearchTab from './SearchTab';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';

export default class SearchTabs extends PureComponent {
  constructor(props) {
    super(props);
    this._handleIndexChange = this._handleIndexChange.bind(this)
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
    const {navigateTo} = this.props;

    switch (route.key) {
      case 'looks':
        return (<SearchTab
          navigateTo={navigateTo}
          isTabOnFocus={this.state.index === 1}/>);
      case 'people':
        return (<SearchTab
          navigateTo={navigateTo} isTabOnFocus={this.state.index === 1}/>);
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
