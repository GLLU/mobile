import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BrandSelector from './BrandSelector';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from './../../utils/AdjustabaleContent';
import { CATEGORY, BRAND, COLOR, MOOD, LINK, DESCRIPTION } from './UploadLookScreen';
import FilterGroup from '../feedscreen/filters/FilterGroup';
import DescriptionTab from './tabs/descriptionTab';
import LinkTab from './tabs/linkTab';
const vsign = require('../../../images/indicators/v_sign.png')

export default class EditItemTabs extends Component {
  constructor(props: object) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.updateCategoryItem = this.updateCategoryItem.bind(this);
    this._renderNavigationButton = this._renderNavigationButton.bind(this);
    this._handleTabsIndexChange = this._handleTabsIndexChange.bind(this);
    this._addItemTag = this._addItemTag.bind(this);
    this._addItemCategory = this._addItemCategory.bind(this);
    this.routes = [
      { key: CATEGORY, title: 'CATEGORY' },
      { key: BRAND, title: 'BRAND' },
      { key: COLOR, title: 'COLOR' },
      { key: MOOD, title: 'MOOD' },
      { key: DESCRIPTION, title: 'Description' },
      { key: LINK, title: 'LINK' },
    ]
    this.routesNoDescription = [
      { key: CATEGORY, title: 'CATEGORY' },
      { key: BRAND, title: 'BRAND' },
      { key: COLOR, title: 'COLOR' },
      { key: MOOD, title: 'MOOD' },
      { key: LINK, title: 'LINK' },
    ]
    this.state = {
      index: 0,
      routes: this.routes,
      loaded: false,
    };
  }

  _handleTabsIndexChange = (index) => {
    this.props.setCurrentStep(this.state.routes[index].key)
    this.setState({ index });
  };

  componentWillReceiveProps(nextProps) {
    const {isFirstItem, currentItem} = this.props
    this.setState({ loaded: !this.state.loaded });
    if(nextProps.currentItem !== currentItem) {
      this._handleTabsIndexChange(0)
    }
    if( nextProps.isFirstItem !== isFirstItem) {
      this.setState({routes: nextProps.isFirstItem ? this.routes : this.routesNoDescription})
    }
  }

  _renderHeader = props => (

    <View style={{ flexDirection: 'row' }}>
      <TabBar
        tabStyle={styles.tabStyle} style={styles.TabBar}
        labelStyle={styles.labelStyle}
        indicatorStyle={styles.indicatorStyle} {...props}
        scrollEnabled
        renderIcon={currTab => this.renderTabIcon(currTab)} />

    </View>
  );

  renderTabIcon(currTab) {
    const { itemCategory, currentItem, itemDescription, itemColors } = this.props;
    switch (this.state.routes[currTab.index].key) {
      case CATEGORY:
        return this.renderTabIndicator(itemCategory !== -1);
      case BRAND:
        return this.renderTabIndicator(!!currentItem.brand);
      case MOOD:
        return this.renderTabIndicator(!!currentItem.occasions.length > 0);
      case COLOR:
        return this.renderTabIndicator(!!itemColors.length > 0);
      case DESCRIPTION:
        return this.renderTabIndicator(itemDescription.length > 1);
      case LINK:
        return this.renderTabIndicator(!!currentItem.url);
    }
  }

  renderTabIndicator(isFine) {
    if (isFine) {
      return (
        <Image source={vsign}
               resizeMode={'contain'}
          style={{ width: 12, height: 12, marginRight: 3 }} />
      );
    } else {
      return (
        <View
          style={{ width: 10, height: 10, backgroundColor: 'red', borderRadius: 5, marginRight: 3 }} />
      );
    }
  }

  updateCategoryItem(category) {
    this.props.addItemType(category);
  }

  _addItemTag(color) {
    const {removeItemTag, addItemTag} = this.props
    if (color.selected) {
      removeItemTag(color, color.selected);
    } else {
      addItemTag(color, color.selected);
    }
  }

  _addItemCategory(category) {
    const { addItemType } = this.props;
    addItemType(category);
    const that = this;
    setTimeout(() => {
      that._handleTabsIndexChange(that.state.index + 1);
    }, 500);
  }

  _renderScene = ({ route }) => {
    const {index} = this.state
    const { currentItem, categoryFilters, occasionsFilters, itemCategory, addUrl, itemOccasions, toggleOccasionTag, colorsFilters, itemColors, itemUrl, itemDescription, addDescription } = this.props;
    switch (route.key) {
      case CATEGORY:
        return (<FilterGroup
          mode="single" onSelectionChange={this._addItemCategory}
          filters={categoryFilters} currentFilter={itemCategory}/>);

      case BRAND:
        return (<BrandSelector item={currentItem} handleTabsIndexChange={() => this._handleTabsIndexChange(index + 1)} />);
      case COLOR:
        return (<FilterGroup
          mode="multi" onSelectionChange={this._addItemTag}
          filters={colorsFilters} currentFilter={itemColors}/>);
      case MOOD:
        return (<FilterGroup
          mode="multi" onSelectionChange={(occasion, selected) => toggleOccasionTag(occasion, selected)}
          filters={occasionsFilters} currentFilter={itemOccasions}/>);
      case DESCRIPTION:
        return (<DescriptionTab
            description={itemDescription}
            addDescription={(description) => addDescription(description)} />)
      case LINK:
        return (<LinkTab itemUrl={itemUrl} addUrl={url => addUrl(url)} />);
      default:
        return <View style={{ height: 200, width: 450, backgroundColor: 'red' }} />;
    }
  };

  _renderNavigationButton(icon: string, onPress: void, iconStyle: object, containerStyle: object) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle} />
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
    flexDirection: 'row',
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
    marginHorizontal: 2,
  },
});
