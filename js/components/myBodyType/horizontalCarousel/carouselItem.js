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
        <Image style={{ width: w*.370*0.75, height: h*.6*0.8, marginRight: w*.125,resizeMode:'contain' , alignItems:'center', justifyContent: 'center'}}
          source={item.imageUrl}/>
      </View>
    )
  }
}
