'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text,Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import {  Button, Icon } from 'native-base';
import _ from 'lodash';
import {
  addNewLook,
  editNewLook,
} from '../../actions';
import VideoWithCaching from "../common/media/VideoWithCaching";
import ImageWrapper from '../common/media/ImageWrapper'
import Spinner from "../loaders/Spinner";
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class UserLooks extends Component {

  static propTypes = {
    userLooks: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    userId: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(this.props.userLooks);
    this.state = {
      filterHeight: 0,
      imagesColumn1,
      imagesColumn2,
      itemScreenLook: 0,
      photoModal: false,
      refreshing: false,
      pagination: 1,
      isMyProfile: this.props.isMyProfile,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(nextProps.userLooks);
    this.setState({
      imagesColumn1,
      imagesColumn2,
    })
  }

  distributeImages(looks) {
    const imagesColumn1 = [];
    const imagesColumn2 = [];
    const colW = (deviceWidth - 10) / 2;
    _.filter(looks, x => x.width && x.height).map((look, index) => {
      const { width, height } = look;
      look.width = colW;
      look.height = height * colW / width ;
      if (index % 2 === 0) {
        imagesColumn1.push(look);
      } else {
        imagesColumn2.push(look);
      }
    });

    return { imagesColumn1, imagesColumn2 };
  }

  _handleItemPress(item) {
    item.singleItem = true
    console.log('item press')
    this.props.navigateTo('looksScreen', item);
  }

  _handleEditPress(look) {
    this.props.editNewLook(look.id).then(() => {

      this.props.navigateTo('addItemScreen',{ mode: 'edit' });
    });
  }

  renderLookStatus(look) {
    return (
      <View style={{position: 'absolute', top: 5, left: 0, padding: 3}}>
        <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#00D7B2'}}/>
        <Text style={{color: '#fff', fontSize: 10, flex: 1, backgroundColor: 'transparent'}}>{look.state}</Text>
      </View>
    )
  }

  renderVideo(img) {
    return (
      <View style={{flex: 1}}>
        <VideoWithCaching source={{uri: img.uri, mainVer: 1, patchVer: 0}}
               resizeMode={'contain'}
               muted={true}
               style={{width: img.width - 5, height: img.height, overflow: 'hidden'}}
               repeat={true}
               rate={1}
               navigation={this.props.navigation}
        />
      </View>
    )
  }

  renderImage(img) {
    return (
      <ImageWrapper source={{uri: img.uri}} resizeMode="contain" style={{width: img.width - 5, height: img.height }} navigation={this.props.navigation}/>
    )
  }

  _renderImages(looks) {
    return looks.map((look, index) => {
      return  (
        <View key={index} style={{width: look.width, height: look.height, paddingLeft: 0 }}>
          <TouchableOpacity onPress={(e) => this._handleItemPress(look)}>
            <View style={{width: look.width, height: look.height, paddingLeft: 0 }}>
             {look.coverType === 'video' ? this.renderVideo(look, index) : this.renderImage(look, index)}
            </View>
          </TouchableOpacity>
          { this.state.isMyProfile && (
            <TouchableOpacity onPress={this._handleEditPress.bind(this, look)} style={{position: 'absolute',  top: 5, right: 5, height: 30, width: 30, backgroundColor:'#00d7b2',alignItems:'center'}}>
              <Icon name='ios-create-outline' style={{color: '#000'}} size={28}/>
            </TouchableOpacity>
            )
          }
          { this.state.isMyProfile ? this.renderLookStatus(look) : null}
        </View>
      );
    });
  }

  render() {
    const paddingBottom = 150;
    return (
      <View style={styles.tab}>
        <View style={[styles.mainGrid]}>
          <View style={[{flexDirection: 'row', paddingLeft: 7, paddingTop: 14, paddingBottom: this.state.filterHeight + paddingBottom}]}>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              {this._renderImages(this.state.imagesColumn1)}
            </View>
            <View style={{flex: 0.5, flexDirection: 'column'}}>
              {this._renderImages(this.state.imagesColumn2)}
            </View>
          </View>
        </View>
      </View>
    )}
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    marginTop: -10
  },
});

export default UserLooks;
