import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ImageWithTags from '../common/ImageWithTags';
import ItemInfoView from './ItemInfoView';
import { createLookItem, selectLookItem } from '../../actions';
import ActionsBar from './ActionsBar';
import ExtraDimensions from 'react-native-extra-dimensions-android';

import { IMAGE_VIEW_WIDTH } from './styles';

class StepOne extends Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    newTag: React.PropTypes.bool,
    createLookItem: React.PropTypes.func,
    selectLookItem: React.PropTypes.func,
    continueAction: React.PropTypes.func,
    tagAnotherAction: React.PropTypes.func,
    image: React.PropTypes.string,
    items: React.PropTypes.array,
  }

  _renderActionsContainer() {
    return <ActionsBar continueAction={this.props.continueAction} tagAnotherAction={this.props.tagAnotherAction} />;
  }

  render() {
    const { items, image, createLookItem, selectLookItem } = this.props;
    return(
      <View style={{flex: 1}}>
        <ScrollView scrollEnabled={true} style={{marginTop: 10, marginBottom: 50 + ExtraDimensions.get('STATUS_BAR_HEIGHT')}}>
          <View style={{padding: 20, alignItems: 'center'}}>
            <ImageWithTags
                items={items}
                image={image}
                createLookItem={createLookItem}
                selectLookItem={selectLookItem}
                width={IMAGE_VIEW_WIDTH}/>
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
    selectLookItem: (tag) => dispatch(selectLookItem(tag)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(StepOne);