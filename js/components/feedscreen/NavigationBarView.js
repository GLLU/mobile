import React, { Component } from 'react';
import { StyleSheet, Image, Platform } from 'react-native'
import { View, Text, Button } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';

const userIcon = require('../../../images/icons/user.png');
const userWithNotifyIcon = require('../../../images/icons/user-with-notify.png');
const bagIcon = require('../../../images/icons/bag.png');
const rectangleIcon = require('../../../images/icons/rectangle.png')
const searchIcon = require('../../../images/icons/search.png')
const cameraIcon = require('../../../images/icons/camera.png')

const styles = StyleSheet.create({
  navigationBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnProfile: {
  },
  btnCamera: {
  },
  btnImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  normalBtn: {
    fontSize: 24
  },
  wallet: {
    paddingTop: (Platform.OS === 'ios' ? 10 : 0),
    marginTop: 5,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#757575'
  },
});

class NavigationBarView extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    handleSearchStatus: React.PropTypes.func,
    handleOpenPhotoModal: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasNotify: true
    };
  }

  componentDidMount() {

  }

  goToProfile() {
    console.log('Go To Profile');
    this.props.navigateTo('profileScreen', 'feedscreen', this.props.user);
  }

  openCamera() {
    this.props.handleOpenPhotoModal();
  }

  openSearch() {
    console.log('Open Search');
  }

  openMenu() {
    console.log('Open Menu');
  }

  goToShopping() {
    console.log('Go To Shopping');
  }

  render() {
    const userBtnIcon = this.state.hasNotify ? userWithNotifyIcon : userIcon;
    return(
      <View style={styles.navigationBar}>
        <View style={{flexGrow: 0, flexDirection: 'row'}}>
          <Button transparent onPress={() => this.goToProfile()} style={styles.btnProfile}>
            <Image source={userBtnIcon} style={styles.btnImage} />
          </Button>
          <Text style={styles.wallet}>₤ 256.00</Text>
        </View>
        <View style={{flexGrow: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Button transparent onPress={() => this.props.handleSearchStatus()}>
            <Image source={searchIcon} style={styles.btnImage} />
          </Button>
          <Button transparent onPress={() => this.openMenu()}>
            <Image source={rectangleIcon} style={styles.btnImage} />
          </Button>
          <Button transparent onPress={() => this.goToShopping()}>
            <Image source={bagIcon} style={styles.btnImage} />
          </Button>
        </View>
        <View style={{flexGrow: 0, flexDirection: 'row'}}>
          <Button transparent onPress={() => this.openCamera()} style={styles.btnCamera}>
            <Image source={cameraIcon} style={styles.btnImage} />
          </Button>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
  };
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps, bindActions)(NavigationBarView);
