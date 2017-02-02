import React, { Component } from 'react';
import { Image } from 'react-native'
import { View, Text, Button } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import { connect } from 'react-redux';
import navigateTo from '../../actions/sideBarNav';

const userIcon = require('../../../images/icons/user.png');
const userWithNotifyIcon = require('../../../images/icons/user-with-notify.png');
const bagIcon = require('../../../images/icons/bag.png');
const rectangleIcon = require('../../../images/icons/rectangle.png')
const searchIcon = require('../../../images/icons/search.png')
const cameraIcon = require('../../../images/icons/camera.png')

class NavigationBarView extends Component {
  static propTypes = {
    goToAddNewItem: React.PropTypes.func,
    handleSearchStatus: React.PropTypes.func
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
    ImagePicker.openPicker({
      includeBase64: true,
      cropping: false,
    }).then(image => {
      this.props.goToAddNewItem(image);
    });
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
        <Grid>
          <Col>
            <Grid>
              <Col size={30}>
                <Button transparent onPress={() => this.goToProfile()} style={styles.btnProfile}>
                  <Image source={userBtnIcon} style={styles.btnImage} />
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
                <Button transparent onPress={() => this.props.handleSearchStatus()}>
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
