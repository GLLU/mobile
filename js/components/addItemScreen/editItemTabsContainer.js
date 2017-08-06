// @flow

import {connect} from 'react-redux';
import EditItemTabs from './editItemTabs';
import {
  addItemType,
  toggleOccasionTag
} from '../../actions';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addItemType: (type) => dispatch(addItemType(type, ownProps.item)),
    toggleOccasionTag: (tag, selected) => dispatch(toggleOccasionTag(tag.id, selected, ownProps.item)),
  };
}

function mapStateToProps(state, ownProps) {
  const currentItem = _.find(state.uploadLook.items, (item) => item.id === ownProps.item)
  return {
    categoryFilters: state.filters.categories,
    occasionsFilters: state.filters.occasion_tags,
    itemCategory: currentItem.category,
    itemBrand: currentItem.brand,
    itemOccasions: currentItem.occasions

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditItemTabs);
