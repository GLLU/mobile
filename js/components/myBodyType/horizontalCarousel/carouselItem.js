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
    const {item} = this.props;
    return (
      <View style={styles.imagePlaceHolder}>
        <Image style={{ width: 120, height: 280, marginRight: 50, alignItems:'center', justifyContent: 'center',resizeMode:'contain'}}
          source={item.imageUrl}/>
      </View>
    )
  }
}
