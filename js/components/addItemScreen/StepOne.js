import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import ImageView from './ImageView';
import ItemInfoView from './ItemInfoView';

class StepOne extends Component {
  renderItemInfo() {
    return <ItemInfoView/>;
  }

  render() {
    return(
      <ScrollView scrollEnabled={true} style={{marginVertical: 10}}>
        <ImageView/>
        {this.props.newTag && this.renderItemInfo()}
      </ScrollView>
    )
  }
}

export default StepOne;
