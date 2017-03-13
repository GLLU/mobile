import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Button, Icon} from 'native-base';
import MultiSelect from '../../common/MultiSelect';
import Tags from './Tags';
import BaseComponent from '../../common/BaseComponent';
import _ from 'lodash';

import {
  loadOccasionTags,
} from '../../../actions';

const styles = StyleSheet.create({
  tagTextContainer: {
    margin: 5,
    flexDirection: 'row'
  },
  tagButton: {
    borderRadius: 5,
    backgroundColor: 'black',
  },
  tagButtonActive: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
  tagButtonText: {
    color: 'white',
  },
  tagButtonTextActive: {
    color: '#333333',
  },
});

class OccasionsDropdown extends BaseComponent {

  static propTypes = {
    itemOccasionsDropdown: React.PropTypes.array,
    occasionTags: React.PropTypes.array,
    selectedTags: React.PropTypes.array,
    toggleOccasionTag: React.PropTypes.func,
    loadOccasionTags: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    }
  }

  componentWillMount() {
    this.props.loadOccasionTags().catch(err => {
      console.log('unable to load occasionTags');
    });
  }

  _toggleOccasionTag(tag, selected) {
    this.logEvent('UploadLookScreen', { name: 'Occasion tag', tag: tag.name });
    this.props.toggleOccasionTag(tag, selected);
  }

  handleItemsSelected(selectedItems) {
    this.setState({selectedItems}, () => {
      console.log('handleItemsSelected', selectedItems);
      selectedItems.map(tag => {
        this.logEvent('UploadLookScreen', { name: 'Occasion tag', tag: tag.name });
        this.props.toggleOccasionTag(tag, false);
      });
    });
  }

  removeTag(tag) {
    const { selectedItems } = this.state;
    const remaining = _.filter(selectedItems, x => x.id !== tag.id);
    this.setState({selectedItems: remaining});
  }

  renderSelectedItems() {
    const { selectedItems } = this.state;
    return (
      <Tags style={{flex: 1}} itemTags={selectedItems} removeTag={this.removeTag.bind(this)}/>
    );
  }

  render () {
    const { occasionTags, selectedTags } = this.props;
    const { selectedItems } = this.state;
    console.log('render OccasionsDropdown ', occasionTags)
    return (<View style={{flex: 1, flexDirection: 'column'}}>
              <MultiSelect
                style={{flex: 1}}
                items={occasionTags}
                uniqueKey="id"
                selectedItemsChange={this.handleItemsSelected.bind(this)}
                selectedItems={selectedItems}
                selectText="Pick Events"
                searchInputPlaceholderText="Search Events..."
                fontFamily="PlayfairDisplay-Regular"
                altFontFamily="PlayfairDisplay-Regular"
                tagRemoveIconColor="#000FFF"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemFontFamily="PlayfairDisplay-Bold"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemFontFamily="PlayfairDisplay-Regular"
                itemTextColor="#000"
                searchInputStyle={{fontFamily: 'PlayfairDisplay-Regular', color: '#CCC'}}
                renderSelectedItems={this.renderSelectedItems.bind(this)}
              />
            </View>)
  }

}


import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    loadOccasionTags: () => dispatch(loadOccasionTags()),
  };
}

const mapStateToProps = state => {
  return {
    occasionTags: state.filters.occasion_tags,
  };
};

export default connect(mapStateToProps, bindActions)(OccasionsDropdown);