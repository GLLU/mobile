import React, { Component } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import BrandSelector from './BrandSelector';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Colors from '../../styles/Colors.styles';
import { generateAdjustedSize } from './../../utils/AdjustabaleContent';
import { CATEGORY, BRAND, COLOR, MOOD, LINK, DESCRIPTION } from './UploadLookScreen';
import ScrollableSelectableList from '../common/itemParams/ScrollableSelectableList';
import DescriptionTab from './tabs/descriptionTab';
import LinkTab from './tabs/linkTab';
const vsign = require('../../../images/indicators/v_sign.png');
import i18n from 'react-native-i18n';

export default class EditItemTabs extends Component {
  constructor(props: object) {
    super(props);
    this._renderHeader = this._renderHeader.bind(this);
    this.updateCategoryItem = this.updateCategoryItem.bind(this);
    this._renderNavigationButton = this._renderNavigationButton.bind(this);
    this._handleTabsIndexChange = this._handleTabsIndexChange.bind(this);
    this._addItemTag = this._addItemTag.bind(this);
    this._addItemCategory = this._addItemCategory.bind(this);
    this._addItemBrand = this._addItemBrand.bind(this);
    this.routes = [
      { key: CATEGORY, title: i18n.t('CATEGORY')},
      { key: BRAND, title: i18n.t('BRAND')},
      { key: COLOR, title: i18n.t('COLOR')},
      { key: MOOD, title: i18n.t('MOOD')},
      { key: DESCRIPTION, title: i18n.t('DESCRIPTION')},
      { key: LINK, title: i18n.t('LINK')},
    ];
    this.routesNoDescription = [
      { key: CATEGORY, title: 'CATEGORY' },
      { key: BRAND, title: 'BRAND' },
      { key: COLOR, title: 'COLOR' },
      { key: MOOD, title: 'MOOD' },
      { key: LINK, title: 'LINK' },
    ];
    this.state = {
      index: 0,
      routes: this.routes,
      loaded: false,
    };
  }

  _handleTabsIndexChange = (index) => {
    this.props.setCurrentStep(this.state.routes[index].key);
    this.setState({ index });
  };

  componentWillReceiveProps(nextProps) {
    const { isFirstItem, currentItem } = this.props;
    this.setState({ loaded: !this.state.loaded });
    if (nextProps.currentItem !== currentItem) {
      this._handleTabsIndexChange(0);
    }
    if (nextProps.isFirstItem !== isFirstItem) {
      this.setState({ routes: nextProps.isFirstItem ? this.routes : this.routesNoDescription });
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
        return itemCategory !== -1 ? this._renderVSign() : this._renderRequiredSign();
      case BRAND:
        return currentItem.brand ? this._renderVSign() : this._renderRequiredSign();
      case MOOD:
        return !!currentItem.occasions.length > 0 ? this._renderVSign() : null;
      case COLOR:
        return !!itemColors.length > 0 ? this._renderVSign() : null;
      case DESCRIPTION:
        return itemDescription.length > 1 ? this._renderVSign() : null;
      case LINK:
        return currentItem.url ? this._renderVSign() : null;
    }
  }

  _renderVSign() {
    return (
      <Image
        source={vsign}
        resizeMode={'contain'}
        style={styles.vsignImg} />
    );
  }

  _renderRequiredSign() {
    return (
      <View
        style={styles.requiredSign} />
    );
  }

  updateCategoryItem(category) {
    this.props.addItemType(category);
  }

  _addItemTag(color) {
    const { removeItemTag, addItemTag } = this.props;
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

  _addItemBrand(brand) {
    const { addBrandName } = this.props;
    addBrandName(brand.id);
    const that = this;
    setTimeout(() => {
      that._handleTabsIndexChange(that.state.index + 1);
    }, 500);
  }

  _renderScene = ({ route }) => {
    const { index } = this.state;
    const { currentItem, categoryFilters, toggleItemColors, brandsFilters, itemBrand, occasionsFilters, itemCategory, addUrl, itemOccasions, toggleOccasionTag, colorsFilters, itemColors, itemUrl, itemDescription, addDescription } = this.props;
    switch (route.key) {
      case CATEGORY:
        return (<ScrollableSelectableList
          mode="single" onSelectionChange={this._addItemCategory}
          filters={categoryFilters} currentFilter={itemCategory} />);

      case BRAND:
        return (
          <View style={{flex: 1}}>
            <ScrollableSelectableList
              mode="single" onSelectionChange={this._addItemBrand} showTexts={false}
              filters={brandsFilters} currentFilter={itemBrand} />
            <BrandSelector item={currentItem} handleTabsIndexChange={() => this._handleTabsIndexChange(index + 1)} />
          </View>
        );
      case COLOR:
        return (<ScrollableSelectableList
          mode="multi" onSelectionChange={color => toggleItemColors(color, color.selected)}
          filters={colorsFilters} currentFilter={itemColors} />);
      case MOOD:
        return (<ScrollableSelectableList
          mode="multi" onSelectionChange={occasion => toggleOccasionTag(occasion, occasion.selected)}
          filters={occasionsFilters} currentFilter={itemOccasions} />);
      case DESCRIPTION:
        return (<DescriptionTab
          description={itemDescription}
          addDescription={description => addDescription(description)} />);
      case LINK:
        return (<LinkTab itemUrl={itemUrl} addUrl={url => addUrl(url)} />);
      default:
        return <View style={styles.emptyTab} />;
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
    const { currentItem } = this.props;

    if (!currentItem) {
      return null;
    }

    return (
      <KeyboardAvoidingView behavior={'padding'}>
        <View  style={styles.container}>
          <TabViewAnimated
            style={styles.tabViewAnimatedContainer}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleTabsIndexChange}
            swipeEnabled={false}
          />
        </View>
      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: generateAdjustedSize(135),
    backgroundColor: Colors.white,
  },
  tabStyle: {
    flex: 1,
    width: 100,
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
  emptyTab: {
    height: generateAdjustedSize(200),
    width: generateAdjustedSize(450),
  },
  vsignImg: {
    width: 12,
    height: 12,
    marginRight: 3,
  },
  requiredSign: {
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    marginRight: 3,
  },
});
