'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { View, Text } from 'native-base';
import _ from 'lodash';
import { actions } from 'react-native-navigation-redux-helpers';
const addItemIcon = require('../../../images/addItemSquare.png');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import SelectPhoto from '../feedscreen/SelectPhoto';
import { addNewLook, navigateTo, getUserLooksData } from '../../actions';

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
      pagination: 1
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

  handleScroll(event) {
      const contentSizeHeight = event.nativeEvent.contentSize.height;
      const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
      const currentScroll = event.nativeEvent.contentOffset.y
      const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
      if (compare == 1) {
        this.setState({
          pagination: this.state.pagination+=1,
        })
        let data = {
          id: this.props.userId,
          page: this.state.pagination
        }
        this.props.getUserLooksData(data);
      }
  }

  _handleItemPress(item) {
    this.props.navigateTo('itemScreen', 'userLookScreen', item);
    this.setState({
      itemScreenLook: item.id,
    })
  }

  _renderImages(images) {
    return images.map((img, index) => {
      return  (
        <TouchableOpacity key={index} onPress={(e) => this._handleItemPress(img)}>
          <View style={{width: img.width, height: img.height, paddingLeft: 0 }}>
            <Image source={{uri: img.uri.replace('-staging', '')}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }} />
          </View>
        </TouchableOpacity>);
    });
  }

  _renderAddItemButton() {
    const addItem = {
      height: 770,
      width: 770,
      uri: addItemIcon
    }
    const colW = (deviceWidth - 10) / 2;
    addItem.height = addItem.height * colW / addItem.width ;
    addItem.width = colW;
    return (
      <TouchableOpacity onPress={(e) => this._handleOpenPhotoModal()}>
        <View style={{width: addItem.width, height: addItem.height, paddingLeft: 0 }}>
          <Image source={addItemIcon} style={{width: addItem.width - 5, height: addItem.height, resizeMode: 'contain' }} >
            <Text style={{position: 'relative', top: addItem.height / 2, marginTop: 20, textAlign: 'center',  backgroundColor: 'transparent', color: 'white'}}>Add New Item</Text>
          </Image>
        </View>
      </TouchableOpacity>
    )
  }

  _handleOpenPhotoModal() {
    this.setState({photoModal: true});
  }

  goToAddNewItem(imagePath) {
    this.setState({photoModal: false}, () => {
      this.props.addNewLook(imagePath).then(() => {
        this.props.navigateTo('tagItemScreen', 'userLookScreen');
      });
    })
  }

  _onRefresh() {
    this.setState({refreshing: true});
    let that = this
    setTimeout(function(){ that.setState({refreshing: false}); }, 2000);
  }

  render() {
    const paddingBottom = 150;
    return(
      <View style={styles.tab}>
        <View style={[styles.mainGrid]}>
          <ScrollView scrollEventThrottle={100} onScroll={this.handleScroll.bind(this)}
                      pagingEnabled={false}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
          >
            <View style={[{flex: 1, flexDirection: 'row', paddingLeft: 7, paddingTop: 14, paddingBottom: this.state.filterHeight + paddingBottom}]}>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                {this._renderAddItemButton()}
                {this._renderImages(this.state.imagesColumn1)}
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                {this._renderImages(this.state.imagesColumn2)}
              </View>
            </View>
          </ScrollView>
        </View>
        <SelectPhoto photoModal={this.state.photoModal} addNewItem={this.goToAddNewItem.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    height: deviceHeight,
    marginTop: -10
  },
});

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    getUserLooksData: data => dispatch(getUserLooksData(data)),
  };
}

const mapStateToProps = state => {
  return {
    userLooks: state.userLooks.userLooksData,
  }
};

export default connect(mapStateToProps, bindActions)(UserLooks);
