// @flow

import { connect } from 'react-redux';
import EditItemTabs from './editItemTabs';
import {
  addItemTag,
  removeItemTag,
} from '../../actions';

import {
  addUrl,
  addBrandName,
} from '../../actions/uploadLook';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addItemTag: (name) => dispatch(addItemTag(name, ownProps.item)),
    removeItemTag: (name) => dispatch(removeItemTag(name, ownProps.item)),
    addUrl: (url) => dispatch(addUrl(url, ownProps.item)),
    addBrandName: (brand) => dispatch(addBrandName(brand, ownProps.item)),
  };
}

function mapStateToProps(state, ownProps) {
  const currentItem = _.find(state.uploadLook.items, item => item.id === ownProps.item.id);

  if (!currentItem) {
    return {};
  }
  return {
    brandsFilters: state.filters.featuredBrands,
    itemBrand: currentItem.brand,
    itemUrl: currentItem.url,
    currentItem,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(EditItemTabs);
