import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import StepZeroBrand from './StepZeroBrand';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';
import Colors from '../../styles/Colors.styles';
import {generateAdjustedSize} from './../../utils/AdjustabaleContent';
import {CATEGORY, BRAND, COLOR, MOOD, DESCRIPTION, LINK} from './UploadLookScreen'
import CategoryTab from './tabs/CategoryTab'
import MoodTab from './tabs/MoodTab'
import ColorsTab from './tabs/ColorsTab'
import DescriptionTab from './tabs/descriptionTab'
import LinkTab from './tabs/linkTab'
export default class EditItemTabs extends Component {
  constructor(props: object) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.updateCategoryItem = this.updateCategoryItem.bind(this);
    this._renderNavigationButton = this._renderNavigationButton.bind(this);
    this._handleTabsIndexChange = this._handleTabsIndexChange.bind(this);
    this._addItemTag = this._addItemTag.bind(this);
    this._addItemCategory = this._addItemCategory.bind(this);
    this.state = {
      index: 0,
      routes: [
        {key: CATEGORY, title: 'CATEGORY'},
        {key: BRAND, title: 'BRAND'},
        {key: COLOR, title: 'COLOR'},
        {key: MOOD, title: 'MOOD'},
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

    <View style={{flexDirection: 'row'}}>
      <TabBar
        tabStyle={styles.tabStyle} style={styles.TabBar}
        labelStyle={styles.labelStyle}
        indicatorStyle={styles.indicatorStyle} {...props}
        scrollEnabled
        renderIcon={(currTab) => this.renderTabIcon(currTab) }/>

    </View>
  );

  renderTabIcon(currTab) {
    const {itemCategory, currentItem} = this.props
    switch (this.state.routes[currTab.index].key) {
      case CATEGORY:
        return this.renderTabIndicator(itemCategory !== -1);
      case BRAND:
        return this.renderTabIndicator(!!currentItem.brand);
    }
  }

  renderTabIndicator(isFine) {
    if (isFine) {
      return (
        <View
          style={{width: 10, height: 10, backgroundColor: 'green', borderRadius: 5, marginRight: 3}}/>
      )
    } else {
      return (
        <View
          style={{width: 10, height: 10, backgroundColor: 'red', borderRadius: 5, marginRight: 3}}/>
      )
    }

  }

  updateCategoryItem(category) {
    this.props.addItemType(category)

  }

  _addItemTag(color) {
    if (color.selected) {
      this.props.removeItemTag(color.name, color.selected)
    } else {
      this.props.addItemTag(color.name, color.selected)
    }

  }

  _addItemCategory(category) {
    const {addItemType} = this.props;
    addItemType(category)
    let that = this;
    setTimeout(function () {
      that._handleTabsIndexChange(that.state.index += 1);
    }, 2000);
  }

  _renderScene = ({route}) => {
    const {currentItem, addItemType, categoryFilters, occasionsFilters, itemCategory, addUrl, itemOccasions, toggleOccasionTag, colorsFilters, itemColors, itemUrl} = this.props
    switch (route.key) {
      case CATEGORY:
        return (<CategoryTab
          currentFilter={itemCategory} filters={categoryFilters}
          updateCurrentFilter={(category) => this._addItemCategory(category)}/>);
      case BRAND:
        return (<StepZeroBrand item={currentItem}></StepZeroBrand>);
      case COLOR:
        return (<ColorsTab
          currentFilter={itemColors} filters={colorsFilters}
          updateCurrentFilter={(name) => this._addItemTag(name)}/>);
      case MOOD:
        return (<MoodTab
          currentFilter={itemOccasions} filters={occasionsFilters}
          updateCurrentFilter={(occasion, selected) => toggleOccasionTag(occasion, selected)}/>);
      case LINK:
        return (<LinkTab itemUrl={itemUrl} addUrl={(url) => addUrl(url)}/>);
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
    flex: 1,
    width: 90,
    paddingHorizontal: 3,
    flexDirection: 'row'
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
