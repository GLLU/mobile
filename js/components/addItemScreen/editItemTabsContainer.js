// @flow

import {connect} from 'react-redux';
import EditItemTabs from './editItemTabs';
import {
  addItemType,
  toggleOccasionTag,
  addItemTag,
  removeItemTag
} from '../../actions';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    addItemType: (type) => dispatch(addItemType(type, ownProps.item)),
    toggleOccasionTag: (tag, selected) => dispatch(toggleOccasionTag(tag.id, selected, ownProps.item)),
    addItemTag: (name, itemId) => dispatch(addItemTag(name, ownProps.item)),
    removeItemTag: (name) => dispatch(removeItemTag(name, ownProps.item)),
  };
}

function mapStateToProps(state, ownProps) {
  const currentItem = _.find(state.uploadLook.items, (item) => item.id === ownProps.item)
  let itemColors = _.map(_.filter(currentItem.tags, (tag) => {
    for (let i = 0; i < state.filters.colors.length; i++) {
      if (tag.name === state.filters.colors[i].name) {
        return tag.name
      }
    }
  }), "name")
  console.log('itemColors', itemColors)
  return {
    categoryFilters: state.filters.categories,
    occasionsFilters: state.filters.occasion_tags,
    colorsFilters: state.filters.colors,
    itemCategory: currentItem.category,
    itemBrand: currentItem.brand,
    itemOccasions: currentItem.occasions,
    itemColors,
    currentItem

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditItemTabs);
