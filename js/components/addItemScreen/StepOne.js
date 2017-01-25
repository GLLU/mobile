import React, { Component } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import ImageWithTags from '../common/ImageWithTags';
import ItemInfoView from './ItemInfoView';
import { createLookItem } from '../../actions';
import ActionsBar from './ActionsBar';

const w = Dimensions.get('window').width;

class StepOne extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    newTag: React.PropTypes.bool,
    createLookItem: React.PropTypes.func,
    continueAction: React.PropTypes.func,
    tagAnotherAction: React.PropTypes.func,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
    editingTagIndex: React.PropTypes.number,
  }

  _renderActionsContainer() {
    return <ActionsBar continueAction={this.props.continueAction} tagAnotherAction={this.props.tagAnotherAction} />;
  }

  render() {
    const { items, editingTagIndex, image, createLookItem } = this.props;
    return(
      <View style={{flex: 1}}>
        <ScrollView scrollEnabled={true} style={{marginTop: 10, marginBottom: 50}}>
          <View style={{padding: 20}}>
            <ImageWithTags items={items} image={image} createLookItem={createLookItem} width={w - 40}/>
          </View>
          <ItemInfoView/>
        </ScrollView>
        {this._renderActionsContainer()}
      </View>
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