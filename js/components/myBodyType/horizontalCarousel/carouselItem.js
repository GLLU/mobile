import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native';
import styles from '../styles';

const w = Dimensions.get('window').width
const h = Dimensions.get('window').height

export default class CarouselItem extends Component {
  static propTypes = {
    item: React.PropTypes.object,
    itemActive: React.PropTypes.bool
  }

  render() {
    const {item, itemActive} = this.props;
    return (
      <View style={styles.imagePlaceHolder}>
        <Image style={{flex: 1, width: w*.350, height: h*.5, resizeMode: 'contain', marginRight: w*.125 , alignItems:'center', justifyContent: 'center'}}
          source={item.imageUrl}>
            <Image source={itemActive ? item.shapeActive : item.shapeDeactive} style={{width:50, height: 80, resizeMode: 'stretch', bottom: 50}}></Image>
          </Image>
      </View>
    )
  }
}
