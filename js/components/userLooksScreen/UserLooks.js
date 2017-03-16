'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { View, Text, Button, Icon } from 'native-base';
import _ from 'lodash';
import SelectPhoto from '../common/SelectPhoto';
import {
  addNewLook,
  editNewLook,
  navigateTo,
  pushRoute,
  getUserLooks,
  replaceAt
} from '../../actions';
const addItemIcon = require('../../../images/addItemSquare.png');
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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
    const isMyProfile = this.props.userId === this.props.myUserId
    this.state = {
      filterHeight: 0,
      imagesColumn1,
      imagesColumn2,
      itemScreenLook: 0,
      photoModal: false,
      refreshing: false,
      pagination: 1,
      isMyProfile
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
      this.props.getUserLooks(data);
    }
  }

  _handleItemPress(item) {
    this.props.replaceAt('userLookScreen', { key: 'looksScreen', optional: item}, this.props.navigation.key);
  }

  _handleEditPress(look) {
    console.log('_handleEditPress', look);
    this.props.editNewLook(look.id).then(() => {
      this.props.pushRoute({key: 'addItemScreen', optional: { mode: 'edit' } }, this.props.navigation.key);
    });
  }

  renderLookStatus(look) {
    return (<View
      style={{position: 'absolute', top: 5, left: 0, padding: 3}}
    >
      <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#00D7B2'}}/>
      <Text style={{color: '#fff', fontSize: 10, flex: 1, backgroundColor: 'transparent'}}>{look.state}</Text>
    </View>)
  }

  _renderImages(looks) {
    return looks.map((look, index) => {
      console.log('looks',look)
      return  (
        <View key={index} style={{width: look.width, height: look.height, paddingLeft: 0 }}>
          <TouchableOpacity onPress={(e) => this._handleItemPress(look)}>
            <Image source={{uri: look.uri.replace('-staging', '')}} style={{width: look.width - 5, height: look.height, resizeMode: 'contain' }} />
          </TouchableOpacity>
          { this.state.isMyProfile && (
              <Button
                onPress={this._handleEditPress.bind(this, look)}
                style={{position: 'absolute', top: 5, right: 5, height: 30, width: 30}}
              >
                <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#000'}}/>
                <Icon name='ios-create-outline' style={{color: '#000'}} size={28}/>
              </Button>
            )
          }
          {this.renderLookStatus(look)}
        </View>
      );
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
        this.props.navigateTo('addItemScreen', 'userLookScreen');
      });
    })
  }

  _onRefresh() {
    this.setState({refreshing: true});
    let that = this
    setTimeout(function(){ that.setState({refreshing: false}); }, 2000);
  }

  renderUserLooks() {
    const paddingBottom = 150;
    return (
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
                { this.state.isMyProfile ? this._renderAddItemButton() : null}
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

  render() {
    return(
      this.props.isLoading ? <View></View> : this.renderUserLooks()
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
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    addNewLook: (imagePath) => dispatch(addNewLook(imagePath)),
    editNewLook: (id) => dispatch(editNewLook(id)),
    getUserLooks: data => dispatch(getUserLooks(data)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => {
  return {
    navigation: state.cardNavigation,
    userLooks: state.userLooks.userLooksData,
    myUserId: state.user.id,
    isLoading: state.loader.loading
  }
};

export default connect(mapStateToProps, bindActions)(UserLooks);
