import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, Text, View, TouchableHighlight } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modalbox';
import BaseComponent from './BaseComponent';
import { noop } from 'lodash'
const galleryIcon = require('../../../images/icons/original-gallery.png')
const cameraIcon = require('../../../images/icons/original-photo-camera.png')
const deviceWidth = Dimensions.get('window').width;
const wModal = deviceWidth / 1.5;
const hModal = wModal / 2;

const styles = StyleSheet.create({
  photoModal: {
    width: wModal,
    height: hModal,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
});

class SelectPhoto extends BaseComponent {

  static propTypes = {
    photoModal: React.PropTypes.bool,
    addNewItem: React.PropTypes.func,
    onRequestClose: React.PropTypes.func
  }

  static defaultProps = {
    photoModal: false,
    addNewItem: noop,
    onRequestClose: noop
  }

  _handleSelectPhoto(type) {
    this.logEvent('Feedscreen', {name: 'Select photo from', type: type});
    this._triggerPhotoPicker(type).then(image => {
      if(image.path.search(".mp4") > -1) {
        image.path = image.path.replace('file://', '')
        image.type = 'look[video]'
      } else {
        image.type = 'look[image]'
      }
      this.props.addNewItem(image);
    }).catch(err => {
      alert(err);
    });

    if(this.props.photoModal!==undefined){
      this.setState({isOpen: this.props.photoModal})
    }
  }

  _triggerPhotoPicker(type) {
    const width = parseInt(deviceWidth - 40);
    const height = parseInt(width * 16 / 9);
    const settings = {
      width: width,
      height: height,
      mediaType: 'any',
      cropping: true
    };
    switch (type) {
      case 'camera':
        return ImagePicker.openCamera(settings);
      default:
        return ImagePicker.openPicker(settings);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.photoModal!==undefined){
      this.setState({isOpen:nextProps.photoModal})
    }
  }

  render() {

    return (
      <Modal
        isOpen={this.props.photoModal}
        style={styles.photoModal}
        backdropPressToClose={true}
        swipeToClose={true}
        position={"center"}
        onClosed={this.props.onRequestClose}
      >
        <TouchableHighlight
          onPress={() => this._handleSelectPhoto('gallery')}
          transparent
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}
        >
          <View style={{flexDirection: 'row'}}>
            <Image source={galleryIcon} style={[ {width: 20, height: 20, marginRight: 10}]}/>
            <Text style={{ fontSize: 14, color: '#009688', alignSelf: 'center' }}>Choose from Gallery</Text>
          </View>
        </TouchableHighlight>
        <View style={{width: wModal-20, marginLeft: 10, marginRight: 10, borderWidth: 0.7, borderColor: 'grey'}}/>
        <TouchableHighlight
          onPress={() => this._handleSelectPhoto('camera')}
          transparent
          style={{flex: 0.5, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}
        >
          <View style={{flexDirection: 'row'}}>
            <Image source={cameraIcon} style={[ {width: 20, height: 20, marginRight: 10}]}/>
            <Text style={{ fontSize: 14, color: '#009688', alignSelf: 'center' }}>Take one with the Camera</Text>
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

export default SelectPhoto;