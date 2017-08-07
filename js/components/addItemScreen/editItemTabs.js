import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import StepZeroBrand from './StepZeroBrand';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';
import {CATEGORY, BRAND, COLOR, MOOD, DESCRIPTION, LINK} from './index'
import CategoryTab from './tabs/CategoryTab'
import MoodTab from './tabs/MoodTab'
export default class EditItemTabs extends Component {
  constructor(props: object) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.updateCategoryItem = this.updateCategoryItem.bind(this);
    this._renderNavigationButton = this._renderNavigationButton.bind(this);
    this._handleTabsIndexChange = this._handleTabsIndexChange.bind(this);
    this.state = {
      index: 0,
      routes: [
        {key: CATEGORY, title: 'CATEGORY'},
        {key: BRAND, title: 'BRAND'},
        {key: COLOR, title: 'COLOR'},
        {key: MOOD, title: 'MOOD'},
        {key: DESCRIPTION, title: 'DESCRIPTION'},
        {key: LINK, title: 'LINK'},
      ],
      loaded: false
    }
  }

  _handleTabsIndexChange = (index) => {
    this.setState({index});
  };

  componentWillReceiveProps() {
    this.setState({loaded: !this.state.loaded})
  }

  _renderHeader = props => (
    <TabBar
      tabStyle={styles.tabStyle} style={styles.TabBar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle} {...props}
      scrollEnabled/>
  );

  updateCategoryItem(category) {
    this.props.addItemType(category)

  }

  _renderScene = ({route}) => {
    const {currentItem, categoryFilters, occasionsFilters, itemCategory, itemOccasions} = this.props
    switch (route.key) {
      case CATEGORY:
        return (<CategoryTab
          currentFilter={itemCategory} filters={categoryFilters}
          updateCurrentFilter={(category) => this.props.addItemType(category)}/>);
      case BRAND:
        return (<StepZeroBrand item={currentItem}></StepZeroBrand>);
      case COLOR:
        return (<View></View>);
      case MOOD:
        return (<MoodTab
          currentFilter={itemOccasions} filters={occasionsFilters}
          updateCurrentFilter={(occasion, selected) => this.props.toggleOccasionTag(occasion, selected)}
          mode={'multi'}/>);
      case DESCRIPTION:
        return (<View></View>);
      case LINK:
        return (<View></View>);
      default:
        return <View style={{height: 200, width: 450, backgroundColor: 'red'}}/>
          ;
    }
  };

  _renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TabViewAnimated
          style={styles.tabViewAnimatedContainer}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleTabsIndexChange}
          swipeEnabled={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: Colors.primaryColor,
  },
  tabStyle: {
    height: 41.5,
    width: 90,
    paddingHorizontal: 3
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
    fontSize: generateAdjustedSize(12),
    marginHorizontal: 2
  },
});
