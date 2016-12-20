import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const profileIcon = require('../../../images/icons/user.png');
const notificationIcon = require('../../../images/icons/notification-icon.png');
const bagIcon = require('../../../images/icons/bag.png');
const rectangleIcon = require('../../../images/icons/rectangle.png')
const searchIcon = require('../../../images/icons/search.png')
const cameraIcon = require('../../../images/icons/camera.png')

class NavigationBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationHeight: 30 // increase height : 30 to visible notification
    };
  }

  goToProfile() {
    console.log('Go To Profile');
  }

  openCamera() {
    console.log('Open Camera');
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
    return(
      <View style={styles.navigationBar}>
        <Grid>
          <Col>
            <Grid>
              <Col size={30}>
                <View style={styles.notificationIcon}>
                  <Image source={notificationIcon} style={[styles.notificationIconImage, { height: this.state.notificationHeight }]} />
                </View>
                <Button transparent onPress={() => this.goToProfile()} style={styles.btnProfile}>
                  <Image source={profileIcon} style={styles.btnImage} />
                </Button>
              </Col>
              <Col size={70}>
                <Text style={styles.wallet}>₤ 256.00</Text>
              </Col>
            </Grid>
          </Col>
          <Col>
            <Grid>
              <Col>
                <Button transparent onPress={() => this.openSearch()}>
                  <Image source={searchIcon} style={styles.btnImage} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.openMenu()}>
                  <Image source={rectangleIcon} style={styles.btnImage} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.goToShopping()}>
                  <Image source={bagIcon} style={styles.btnImage} />
                </Button>
              </Col>
            </Grid>
          </Col>
          <Col>
            <Button transparent onPress={() => this.openCamera()} style={styles.btnCamera}>
              <Image source={cameraIcon} style={styles.btnImage} />
            </Button>
          </Col>
        </Grid>
      </View>
    )
  }
}

export default NavigationBarView;
