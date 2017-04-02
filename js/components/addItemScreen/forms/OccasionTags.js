import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Container, Button, Icon} from 'native-base';
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

class OccasionTags extends Component {

  static propTypes = {
    itemOccasionTags: React.PropTypes.array,
    occasionTags: React.PropTypes.array,
    selectedTags: React.PropTypes.array,
    toggleOccasionTag: React.PropTypes.func,
    loadOccasionTags: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.loadOccasionTags().catch(err => {
      console.log('unable to load occasionTags');
    });
  }

  _toggleOccasionTag(tag, selected) {
    this.props.toggleOccasionTag(tag, selected);
  }

  _renderOccasionTags() {
    const { occasionTags, selectedTags } = this.props;
    return occasionTags.map((tag, index) => {
      const selected = _.find(selectedTags, x => x.id === tag.id);
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

  render () {
    return (<View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
              {this._renderOccasionTags()}
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

export default connect(mapStateToProps, bindActions)(OccasionTags);