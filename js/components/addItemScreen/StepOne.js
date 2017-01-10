import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import ImageWithTags from '../common/ImageWithTags';
import ItemInfoView from './ItemInfoView';
import { addTag } from '../../actions';

const w = Dimensions.get('window').width;

class StepOne extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    newTag: React.PropTypes.bool,
    addTag: React.PropTypes.func,
    image: React.PropTypes.object,
    tags: React.PropTypes.array,
    editingTagIndex: React.PropTypes.number,
  }

  renderItemInfo() {
    return <ItemInfoView/>;
  }

  render() {
    const { tags, editingTagIndex, image, addTag } = this.props;
    return(
      <ScrollView scrollEnabled={true} style={{marginVertical: 10}}>
        <View style={{flex: 1, padding: 20}}>
          <ImageWithTags tags={tags} image={image} addTag={addTag} width={w - 40}/>
        </View>
        {this.props.newTag && this.renderItemInfo()}
      </ScrollView>
    )
  }
}

import { connect } from 'react-redux';
function bindActions(dispatch) {
  return {
    addTag: (tag) => dispatch(addTag(tag)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(StepOne);