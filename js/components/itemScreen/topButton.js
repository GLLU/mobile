import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const bagItImage = require('../../../images/bagItImage.png');
const bodySizeImage = require('../../../images/xsIcon.png');

export default class BottomButton extends Component {
  static propTypes ={
    avatar: React.PropTypes.string
  }

  render() {
    return (
      <View style={styles.fakeContainer}>
        <View style={styles.topLeft}>
          <TouchableOpacity style={[styles.topButton,styles.avatarButton]}>
            <Image source={this.props.avatar} style={{height:64, width: 64, borderRadius: 32}} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.topButton,styles.bodyTypeButton]}>
            <Image style={styles.bodyTypeButtonIcon} source={bodySizeImage}/>
            <Text style={styles.bodyTypeButtonText}>XS</Text>
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
