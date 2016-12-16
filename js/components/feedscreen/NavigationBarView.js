'use strict';

import React, { Component } from 'react';
import { View, Text, Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";

import styles from './styles';

class NavigationBarView extends Component {
  constructor(props) {
    super(props);
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
                <Button transparent onPress={() => this.goToProfile()} style={styles.btnProfile}>
                  <Icon name="ios-person-outline" style={styles.normalBtn} />
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
                  <Icon name="ios-search-outline" style={styles.normalBtn} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.openMenu()}>
                  <Icon name="ios-square-outline" style={styles.normalBtn} />
                </Button>
              </Col>
              <Col>
                <Button transparent onPress={() => this.goToShopping()}>
                  <Icon name="ios-basket-outline" style={styles.normalBtn} />
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

module.exports = NavigationBarView;
