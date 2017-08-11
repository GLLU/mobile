// @flow

import {connect} from 'react-redux';
import EditItemTabs from './editItemTabs';
import {
  addItemTag,
  removeItemTag,
} from '../../actions';

import {
  addItemType,
  toggleOccasionTag,
  toggleItemColors,
  addDescription,
  addUrl,
  addBrandName,
} from '../../actions/uploadLookB';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addItemType: (type) => dispatch(addItemType(type, ownProps.item)),
    toggleOccasionTag: (tag, selected) => dispatch(toggleOccasionTag(tag.id, selected, ownProps.item)),
    toggleItemColors: (tag, selected) => dispatch(toggleItemColors(tag.id, selected, ownProps.item)),
    addItemTag: (name) => dispatch(addItemTag(name, ownProps.item)),
    removeItemTag: (name) => dispatch(removeItemTag(name, ownProps.item)),
    addDescription: (description) => dispatch(addDescription(description)),
    addUrl: (url) => dispatch(addUrl(url, ownProps.item)),
    addBrandName: (brand) => dispatch(addBrandName(brand, ownProps.item)),
  };
}

function mapStateToProps(state, ownProps) {
  const currentItem = _.find(state.uploadLook.items, (item) => item.id === ownProps.item)

  if (!currentItem) {
    return {};
  }
  return {
    categoryFilters: state.filters.categories,
    occasionsFilters: state.filters.occasion_tags,
    colorsFilters: state.filters.filterColors,
    brandsFilters: state.filters.featuredBrands,
    itemCategory: currentItem.category,
    itemBrand: currentItem.brand,
    itemOccasions: currentItem.occasions,
    itemDescription: state.uploadLook.description,
    itemUrl: currentItem.url,
    itemColors: currentItem.colors,
    currentItem,

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditItemTabs);
