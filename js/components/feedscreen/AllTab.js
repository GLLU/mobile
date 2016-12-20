'use strict';

import React, { Component } from 'react';
import { Image, Dimensions, ScrollView } from 'react-native';
import { View, List, ListItem } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid";

import FilterBar from './filters/FilterBar';

import styles from './styles';
import _ from 'lodash';
const img1 = require('../../../images/img1.jpg');
const img2 = require('../../../images/img2.jpg');
const img3 = require('../../../images/img3.jpg');
const img4 = require('../../../images/img4.jpg');

const deviceWidth = Dimensions.get('window').width;
const imageWidth = deviceWidth / 2 - 20;
const imageHeight = imageWidth * 2 / 3;

class AllTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images1: [
        { uri: 'http://img.f1.thethao.vnecdn.net/2016/12/16/top-5236-1481846170.jpg', width: 408, height: 245 },
        { uri: 'http://img.f13.giadinh.vnecdn.net/2016/12/16/l-8933-1481858742-1666-1481859430.jpg', width: 212, height: 244 },
        { uri: 'http://img.f29.vnecdn.net/2016/11/06/ngan-hang-2-1143-1478378666.jpg', width: 215, height: 245 },
      ],
      images2: [
      { uri: 'http://img.f29.vnecdn.net/2016/11/06/ngan-hang-2-1143-1478378666.jpg', width: 215, height: 245 },
        { uri: 'http://img.f1.thethao.vnecdn.net/2016/12/16/top-5236-1481846170.jpg', width: 408, height: 245 },
        { uri: 'http://img.f13.giadinh.vnecdn.net/2016/12/16/l-8933-1481858742-1666-1481859430.jpg', width: 212, height: 244 },
        { uri: 'http://img.f29.vnecdn.net/2016/12/15/2-6886-1481797342.jpg', width: 158, height: 245 },
        { uri: 'http://img.f1.thethao.vnecdn.net/2016/12/16/top-5236-1481846170.jpg', width: 408, height: 245 },
        { uri: 'http://img.f13.giadinh.vnecdn.net/2016/12/16/l-8933-1481858742-1666-1481859430.jpg', width: 212, height: 244 },

      ]
    }
  }

  onColumnLayout1(e) {
    const layout = e.nativeEvent.layout;
    console.log('layout', layout.width);
    const colW = layout.width;
    this.arrangeImages('images1', this.state.images1, colW);
  }

  onColumnLayout2(e) {
    const layout = e.nativeEvent.layout;
    console.log('layout', layout.width);
    const colW = layout.width;
    this.arrangeImages('images2', this.state.images2, colW);
  }

  arrangeImages(key, images, colW) {
    images.map((img) => {
      Image.getSize(img.uri, (srcWidth, srcHeight) => {
        img.width = colW;
        img.height = srcHeight * colW / srcWidth ;
        this.setState({ [key]: images });
      }, error => {
        console.log('error:', error);
      });
    });
  }

  _renderImages1() {
    return this.state.images1.map((img, index) => {
      return  (<View key={index} style={{width: img.width, height: img.height }} >
          <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }} />
        </View>);
    });
  }

  _renderImages2() {
    return this.state.images2.map((img, index) => {
      return  (<View key={index} style={{width: img.width, height: img.height }} >
          <Image source={{uri: img.uri}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }} />
        </View>);
    });
  }

  render() {
    return(
      <View style={styles.tab} scrollEnabled={false}>
        <FilterBar />
        <View style={[styles.mainGrid]}>
          <ScrollView>
            <View style={[{flex: 1, flexDirection: 'row'}]}>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout1(e)}>
                {this._renderImages1()}
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout2(e)}>
                {this._renderImages2()}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

module.exports = AllTab;
