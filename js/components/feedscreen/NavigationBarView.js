import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

const profileIcon = require('../../../images/icons/profile-icon.png');
const notificationIcon = require('../../../images/icons/notification-icon.png');
const bagIcon = require('../../../images/icons/bag-icon.png');

class NavigationBarView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationHeight: 0 // increase height : 30 to visible notification
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
                  <Image source={profileIcon} style={styles.btnProfileImg} />
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
                  <Icon name="md-search" style={styles.normalBtn} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.openMenu()}>
                  <Icon name="md-square-outline" style={styles.normalBtn} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.goToShopping()}>
                  <Image source={bagIcon} style={styles.btnBagImg} />
                </Button>
              </Col>
            </Grid>
          </Col>
          <Col>
            <Button transparent onPress={() => this.openCamera()} style={styles.btnCamera}>
              <Icon name="ios-camera-outline" style={styles.normalBtn} />
            </Button>
          </Col>
        </Grid>
      </View>
    )
  }
}

export default NavigationBarView;
