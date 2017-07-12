import React, { PureComponent } from 'react';
import { StyleSheet, Image, Platform ,View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import withAnalytics from '../common/analytics/WithAnalytics'
import { takeMedia } from '../../lib/camera/CameraUtils'
import * as _ from "lodash";

const userIcon = require('../../../images/icons/user.png');
const emptyNotification = require('../../../images/icons/emptyNotification.png');
const gotNotification = require('../../../images/icons/hangerGreenCircle.png');
const cameraIcon = require('../../../images/icons/camera.png')

const styles = StyleSheet.create({
  navigationBar: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  btnImageHanger: {
    height: 25,
    width: 25,
    resizeMode: 'contain'
  },
  btnImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  hangerBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  cameraBtnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  profileBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

class NavigationBarView extends PureComponent {
  static propTypes = {
    user: React.PropTypes.object,
    navigateTo: React.PropTypes.func,
    addNewItem: React.PropTypes.func,
    gotNewNotifications: React.PropTypes.bool
  }

  static defaultProps = {
    navigateTo: _.noop,
    addNewItem: _.noop
  }

  constructor(props) {
    super(props);
    this.handleNotificationsPress=this.handleNotificationsPress.bind(this);
    this.takeMedia=this.takeMedia.bind(this);
    this.goToProfile=this.goToProfile.bind(this);
  }

  goToProfile() {
    this.props.logEvent('Feedscreen', { name: 'Profile click' });
    this.props.navigateTo('profileScreen', this.props.user);
  }

  handleNotificationsPress() {
    this.props.logEvent('Feedscreen', {name: 'Notifications click'});
    this.props.navigateTo('notificationsScreen');
  }

  async takeMedia() {
    this.props.logEvent('Feedscreen', { name: 'Open Camera click' });
    const file = await takeMedia();
    if(file){
      this.props.addNewItem(file);
    }
  }

  renderNavigationButton(icon,onPress,iconStyle,containerStyle) {
    return (
      <View style={containerStyle}>
        <TouchableOpacity transparent onPress={onPress}>
          <Image source={icon} style={iconStyle}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {gotNewNotifications} = this.props;
    const notificationsIcon=gotNewNotifications ? gotNotification : emptyNotification;
    return(
      <View style={styles.navigationBar}>
        {this.renderNavigationButton(notificationsIcon,this.handleNotificationsPress,styles.btnImageHanger,styles.hangerBtnContainer)}
        {this.renderNavigationButton(cameraIcon,this.takeMedia,styles.btnImage,styles.cameraBtnContainer)}
        {this.renderNavigationButton(userIcon,this.goToProfile,styles.btnImage,styles.profileBtnContainer)}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    gotNewNotifications: state.notifications.newNotifications
  }
};

export default connect(mapStateToProps)(withAnalytics(NavigationBarView));
