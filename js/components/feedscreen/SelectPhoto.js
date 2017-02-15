import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
import FontSizeCalculator from './../../calculators/FontSize';

const deviceWidth = Dimensions.get('window').width;
const wModal = deviceWidth / 1.5;
const hModal = wModal / 2;

const styles = StyleSheet.create({
  photoModal: {
    width: wModal,
    height: hModal,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    overflow: 'hidden',
  },
});

class SelectPhoto extends Component {

  static propTypes = {
    photoModal: React.PropTypes.bool,
    addNewItem: React.PropTypes.func,
  }

  _handleSelectPhoto(type) {
    this._triggerPhotoPicker(type).then(image => {
      this.props.addNewItem(image);
    }).catch(err => {
      alert(err);
    });
  }

  _triggerPhotoPicker(type) {
    const width = parseInt(deviceWidth - 40);
    const height = parseInt(width * 16 / 9);
    const settings = {
      width: width,
      height: height,
      includeBase64: true,
      cropping: true
    };
    switch (type) {
      case 'camera':
        return ImagePicker.openCamera(settings);
      default:
        return ImagePicker.openPicker(settings);
    }
  }

  render() {
    return (
          <Modal isOpen={this.props.photoModal}
            style={styles.photoModal}
            backdropPressToClose ={true}
            swipeToClose={true}
            position={"center"}>
            <Button
                onPress={() => this._handleSelectPhoto('gallery')}
                transparent
                style={{alignSelf: 'center', marginBottom: 10}}
                textStyle={{fontSize: new FontSizeCalculator(15).getSize()}}>
              Choose from Gallery
            </Button>
            <Button
                onPress={() => this._handleSelectPhoto('camera')}
                transparent
                style={{alignSelf: 'center', marginTop: 10}}
                textStyle={{fontSize: new FontSizeCalculator(15).getSize()}}>
              Take one with the Camera
            </Button>
          </Modal>
    );
  }
}

export default SelectPhoto;