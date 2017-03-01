'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { View } from 'native-base';

import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';

class ItemsGallery extends Component {

  static propTypes = {
    isMyProfile: React.PropTypes.bool,
    goToAddNewItem: React.PropTypes.func,
    latest_looks: React.PropTypes.array,
    itemPress: React.PropTypes.func,
    itemsPress: React.PropTypes.func,
    addNewItem: React.PropTypes.func,
    looksCount: React.PropTypes.number,
  }

  constructor(props) {
    super(props);
  }

  renderAddItemBtn() {
    if(this.props.isMyProfile) {
      return (
        <TouchableOpacity style={styles.addItemContainer} onPress={(e) => this.props.addNewItem()}>
          <Image source={require('../../../images/icons/plus.png')} style={[styles.itemPic, styles.addItem]}/>
        </TouchableOpacity>
      )
    }
  }

  getGalleryItems() {
    let limiter = this.props.isMyProfile ? 3 : 4;
    let flatLooksArr = []
    return (
      this.props.latest_looks.map((look, index) => {
        if(index < limiter){
          let thumbImage = _.find(look.cover, image => image.version == 'thumb');
          let cover = _.find(look.cover, image => image.version == 'medium')
          flatLooksArr.push(  {
            liked: look.is_liked,
            type: look.user_size.body_type,
            id: look.id,
            likes: look.likes,
            user_id: look.user_id,
            uri: cover ? cover.url : null,
            width: cover ? cover.width : null,
            height: cover ? cover.height : null,
            avatar: look.user.avatar,
            name: look.user.name,
            username: look.user.username,
            about_me: look.user.about_me,
            items: look.items,
            originalIndex: index

          });
          return (
            <TouchableOpacity onPress={(e) => this.props.itemPress(flatLooksArr[index])} key={index}>
              <Image  source={{uri: thumbImage.url}} style={styles.itemPic} />
            </TouchableOpacity>
          )
        }
      })
    )
  }

  render() {
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.itemsSeparator}>
          <TouchableOpacity onPress={(e) => this.props.itemsPress()} style={styles.itemsTotal}>
              <Text style={[styles.text, styles.number]}>{this.props.looksCount}</Text>
              <Text style={styles.text}>Items</Text>
          </TouchableOpacity>
          <View style={styles.itemsRow}>
            {this.getGalleryItems()}
            {this.renderAddItemBtn()}
          </View>
        </View>
      </View>
    )
  }
}

export default ItemsGallery

