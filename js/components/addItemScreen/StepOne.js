import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import ImageWithTags from '../common/ImageWithTags';
import ItemInfoView from './ItemInfoView';
import { createLookItem } from '../../actions';

const w = Dimensions.get('window').width;

class StepOne extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    newTag: React.PropTypes.bool,
    createLookItem: React.PropTypes.func,
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
    editingTagIndex: React.PropTypes.number,
  }

  render() {
    const { tags, editingTagIndex, image, createLookItem } = this.props;
    return(
      <ScrollView scrollEnabled={true} style={{marginVertical: 10}}>
        <View style={{padding: 20}}>
          <ImageWithTags tags={tags} image={image} createLookItem={createLookItem} width={w - 40}/>
        </View>
        <ItemInfoView/>
      </ScrollView>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    createLookItem: (tag) => dispatch(createLookItem(tag)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(StepOne);