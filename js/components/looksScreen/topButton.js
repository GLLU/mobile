import React, {Component} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Image } from 'react-native';
const bagItImage = require('../../../images/bagItImage.png');
const RECTANGLE_SHAPE = require('../../../images/types/RECTANGLE_SHAPE_WHITE.png');
const APPLE_SHAPE = require('../../../images/types/APPLE_SHAPE_WHITE.png');
const FULL_HOURGLASS_SHAPE = require('../../../images/types/FULL_HOURGLASS_SHAPE_WHITE.png');
const INVERTED_TRIANGLE = require('../../../images/types/INVERTED_TRIANGLE_WHITE.png');
const LEAN_COLUMN_SHAPE = require('../../../images/types/LEAN_COLUMN_SHAPE_WHITE.png');
const NEAT_HOURGLASS_SHAPE = require('../../../images/types/NEAT_HOURGLASS_SHAPE_WHITE.png');
const PEAR_SHAPE= require('../../../images/types/PEAR_SHAPE_WHITE.png');

export default class TopButton extends Component {
  static propTypes ={
    avatar: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      types: [
        { name: 'rectangle', img: RECTANGLE_SHAPE },
        { name: 'apple', img: APPLE_SHAPE },
        { name: 'fullhourglass', img: FULL_HOURGLASS_SHAPE },
        { name: 'inverted triangle', img: INVERTED_TRIANGLE },
        { name: 'lean column', img: LEAN_COLUMN_SHAPE },
        { name: 'neat hourglass', img: NEAT_HOURGLASS_SHAPE },
        { name: 'pear', img: PEAR_SHAPE }
      ]
    }
  }

  render() {
    let bgContainer = null;
    let typeLabel = null;
    this.state.types.map((type) => {
      if (this.props.avatar.bodyType === type.name) {
        bgContainer = type.img;
        typeLabel = type.text;
        return false;
      }
    });
    return (
        <View style={styles.topContainer}>

          <View style={styles.topLeft}>
            <TouchableOpacity style={[styles.topButton,styles.avatarButton]} onPress={() => this.props.onPress()}>
              <Image source={{uri: this.props.avatar.imageUri}} style={{height:64, width: 64, borderRadius: 32}} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topButton,styles.bodyTypeButton]}>
              <Image style={styles.bodyTypeButtonIcon} source={bgContainer} resizeMode={'contain'}/>
            </TouchableOpacity>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity style={[styles.topButton,styles.bagItButton]}>
              <Image source={bagItImage} style={styles.bagItButtonIcon} />
              <Text style={styles.bagItButtonText}>Bag It</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topLeft: {
    left: 10
  },
  topRight: {
    right: 10
  },
  topButton: {
    width: 84,
    height: 84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagItButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  bagItButtonIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginBottom: 5
  },
  bagItButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent'
  },
  avatarButton: {
    backgroundColor: 'rgba(255,255,255,.5)'
  },
  bodyTypeButton: {
    backgroundColor: 'rgba(5, 215, 178,.5)'
  },
  bodyTypeButtonIcon: {
    width: 50,
    height: 50,
    opacity: 0.8
  },
});