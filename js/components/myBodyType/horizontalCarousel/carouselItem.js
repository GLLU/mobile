import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';

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
        <Image style={{ width: w*.370*0.75, height: h*.6*0.8, marginRight: w*.125,resizeMode:'contain' , alignItems:'center', justifyContent: 'center'}}
          source={item.imageUrl}>
            <Image source={itemActive ? item.shapeActive : item.shapeDeactive} style={{width:50, height: 80, resizeMode: 'stretch', bottom: 50}} />
          </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imagePlaceHolder: {
    flex: 1,
    alignItems: 'center'
  },
});
