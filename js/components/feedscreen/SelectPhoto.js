import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, Text, View, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
const MK = require('react-native-material-kit');
const galleryIcon = require('../../../images/icons/original-gallery.png')
const cameraIcon = require('../../../images/icons/original-photo-camera.png')
const deviceWidth = Dimensions.get('window').width;
const wModal = deviceWidth / 1.5;
const hModal = wModal / 2;

const {
  MKColor,
} = MK;

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
            <TouchableHighlight
                onPress={() => this._handleSelectPhoto('gallery')}
                transparent
                style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}
            >
              <View style={{flexDirection: 'row'}}>
                <Image source={galleryIcon} style={[ {width: 20, height: 20, marginRight: 10}]} />
                <Text style={{ fontSize: 14, color: MKColor.Teal, alignSelf: 'center' }}>Choose from Gallery</Text>
              </View>
            </TouchableHighlight>
            <View style={{width: wModal-20, marginLeft: 10, marginRight: 10, borderWidth: 0.7, borderColor: 'grey'}} />
            <TouchableHighlight
              onPress={() => this._handleSelectPhoto('camera')}
              transparent
              style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}
            >
              <View style={{flexDirection: 'row'}}>
                <Image source={cameraIcon} style={[ {width: 20, height: 20, marginRight: 10}]} />
                <Text style={{ fontSize: 14, color: MKColor.Teal, alignSelf: 'center' }}>Take one with the Camera</Text>
              </View>
            </TouchableHighlight>
          </Modal>
    );
  }
}

export default SelectPhoto;


const styles = StyleSheet.create({
  photoModal: {
    width: wModal,
    height: hModal,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
});