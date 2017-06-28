import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import ItemDataLine from './ItemDataLine'
import ItemButton from '../buttons/ItemButton'


class VideoItemLine extends Component {
  constructor(props) {
    super(props);
    this._onItemClick = this._onItemClick.bind(this);
    this.handleTextLayout = this.handleTextLayout.bind(this);
    this.state = {
      itemY: 0,
      itemLineOpen: false
    }
  }

  handleTextLayout(evt){
    this.setState({itemY: evt.nativeEvent.layout.y})
  }

  _onItemClick() {
    this.props.toggleItem(...arguments);
    this.setState({itemLineOpen: !this.state.itemLineOpen})
  }

  render() {
    const { item } = this.props

      return (
        <View style={{flex: 1, height: 45, flexDirection: 'row', alignItems: 'flex-end', alignSelf: 'flex-end'}} >
          <ItemDataLine isOpen={this.state.itemLineOpen} data={item} />
          <ItemButton isActive={this.state.itemLineOpen} onPress={(y) => this._onItemClick(y)} category={item.category} />

        </View>
      );
  }
}

export default VideoItemLine;

