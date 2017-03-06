import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Button, Icon} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import Tags from './Tags';
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

class OccasionsDropdown extends Component {

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
    this.props.toggleOccasionTag(tag, selected);
  }

  _renderOccasionsDropdown() {
    const { occasionTags, selectedTags } = this.props;
    return occasionTags.map((tag, index) => {
      const selected = _.find(selectedTags, x => x.id == tag.id);
      const btnStyle = selected ? styles.tagButtonActive : styles.tagButton;
      const btnTextStyle = selected ? styles.tagButtonTextActive : styles.tagButtonText;
      return (
        <View key={index} style={[styles.tagTextContainer]}>
          <Button style={btnStyle} textStyle={btnTextStyle} onPress={(e) => this._toggleOccasionTag(tag, selected)}>
            {tag.name}
          </Button>
        </View>
      )
    })
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
              <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                <MultiSelect
                  style={{flex: 1}}
                  items={occasionTags}
                  uniqueKey="id"
                  selectedItemsChange={(selectedItems) => this.setState({selectedItems})}
                  selectedItems={selectedItems}
                  selectText="Pick Items"
                  searchInputPlaceholderText="Search Items..."
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
              </View>
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
    occasionTags: [ { id: 89,
       name: 'Beach/Pool',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 91,
       name: 'Brunch',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 93,
       name: 'Breakfast',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 95,
       name: 'Business Meeting',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 97,
       name: 'Casual event',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 99,
       name: 'Club',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 101,
       name: 'Concert',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 103,
       name: 'Date',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 105,
       name: 'Dinner',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 107,
       name: 'Drinks',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 109,
       name: 'With Family',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 111,
       name: 'With Friends',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 113,
       name: 'Gym/Workout',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 115,
       name: 'Around the house',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 117,
       name: 'Sexy Time',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 119,
       name: 'Bedtime',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 121,
       name: 'School',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 123,
       name: 'Special event',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null },
     { id: 125,
       name: 'Work',
       gender: 'male',
       kind: 'occasion',
       parent_id: null,
       icon: null,
       parent: null } ],
  };
};

export default connect(mapStateToProps, bindActions)(OccasionsDropdown);