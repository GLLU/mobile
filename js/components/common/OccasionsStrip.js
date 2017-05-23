import React, { Component } from 'react';
import { ScrollView, StyleSheet, Dimensions, View, Platform } from 'react-native';
import CategoryItem from './StripItem';
import _ from 'lodash';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const ITEM_WIDTH = 80;

const styles = StyleSheet.create({
  occasionsContainer: {
    flex: 1,
  },
});

class OccasionsStrip extends Component {
  static propTypes = {
    occasions: React.PropTypes.array,
    selectedOccasions: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    onOccasionSelected: React.PropTypes.func,
  }

  constructor(props) {
    super(props); // Note: Category aka occasion
  }

  _handleSelectOccasion(item) {
    this.props.onOccasionSelected(item);
  }

  _drawOccasionItems() {
    const { selectedOccasions, occasions } = this.props;
    return occasions.map((item, index) => {
      let isSelected = _.find(selectedOccasions, Occassion => Occassion.id === item.id)
      const selected = !!isSelected ;
      return (
        <CategoryItem
                key={index}
                item={item}
                itemWidth={ITEM_WIDTH}
                selected={selected}
                onPress={this._handleSelectOccasion.bind(this)}
                currItemId={this.props.currItemId}/>
      );
    });
  }

  render() {

    return (
      <View>
        <ScrollView
            keyboardShouldPersistTaps='always'
            pagingEnabled={false}
            horizontal={false}
            decelerationRate={'fast'}
            scrollEventThrottle={0}
            directionalLockEnabled={false}
            alwaysBounceHorizontal={false}
            contentInset={{top: 0, left: 0, bottom: 0, right: 0}}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{height: h / 1.8}}>
          {this._drawOccasionItems()}
        </ScrollView>
      </View>
    )
  }
}

export default OccasionsStrip