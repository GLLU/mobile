import React, { Component } from 'react';
import { View, Image } from 'react-native';

const ICON_SIZE = 40;

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: 'rgba(207,207,207,0.7)',
    borderWidth: 0.5,
    position: 'absolute',
    borderColor: 'black',
    borderRadius: ICON_SIZE / 2,
    height: ICON_SIZE,
    width: ICON_SIZE,
  },
});

class DeleteTag extends Component {
    render() {
      return (
        <View>
        </View>
      );
    }
}

export default DeleteTag;
