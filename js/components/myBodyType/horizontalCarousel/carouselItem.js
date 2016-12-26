import React, {Component} from 'react';
import {View, Image} from 'react-native';
import styles from '../styles';

export default class CarouselItem extends Component {
  static propTypes = {
    item: React.PropTypes.object
  }

  render() {
    const {item} = this.props;
    return (
      <View style={styles.imagePlaceHolder}>
        <Image style={{flex: 1, width: 120, height: 120, resizeMode: 'stretch'}}
          source={item.imageUrl}></Image>
      </View>
    )
  }
}
