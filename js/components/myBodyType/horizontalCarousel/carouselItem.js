import React, {Component} from 'react';
import {View, Image} from 'react-native';
import styles from '../styles';

export default class CarouselItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    itemActive: React.PropTypes.bool
  }

  render() {
    const {item, itemActive} = this.props;
    return (
      <View style={styles.imagePlaceHolder}>
        <Image style={{flex: 1, width: 340, height: 340, resizeMode: 'contain', marginRight: 10, alignItems:'center', justifyContent: 'center'}}
          source={item.imageUrl}>
            <Image source={itemActive ? item.shapeActive : item.shapeDeactive} style={{width:50, height: 80, resizeMode: 'stretch', alignSelf: 'center', bottom: 50}}></Image>
          </Image>
      </View>
    )
  }
}
