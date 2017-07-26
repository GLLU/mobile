// @flow

import React from 'react';
import {
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Animated,
  RefreshControl,
  View,
  NetInfo,
  ActivityIndicator
} from 'react-native';
import SocialShare from '../../lib/social';
import Spinner from '../loaders/Spinner';
import BaseComponent from '../common/base/BaseComponent';
import MediaContainer from '../common/MediaContainer';
import _ from 'lodash';
import {formatInvitationMessage} from '../../lib/messages/index';
import ParisAdjustableMessage from '../paris/ParisAdjustableMessage';
import LinearGradient from 'react-native-linear-gradient';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import Colors from '../../styles/Colors.styles';
import i18n from 'react-native-i18n';

const profileBackground = require('../../../images/backgrounds/profile-screen-background.png');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const LOADER_HEIGHT = 30;

class FiltersView extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  getFeed(query) {
    this.props.getFeed(query)
  }


  renderEmptyContent() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Image source={profileBackground}
               style={{resizeMode: 'stretch', width: deviceWidth, height: deviceHeight - 80, alignSelf: 'flex-start'}}>
          <LinearGradient
            colors={['#0C0C0C', '#4C4C4C']}
            style={[styles.linearGradient, {opacity: 0.7}]}/>
          <View style={{marginTop: 100}}>
            <ParisAdjustableMessage text={i18n.t('PARIS_NO_FEED_RESULTS')}/>
          </View>
        </Image>
      </View>
    );
  }

  render() {
    console.log('123xx2222x')
    return (
      <View style={{backgroundColor: 'red', position: 'absolute', height: deviceHeight, width: deviceWidth, top: 0}}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    width: deviceWidth,
    position: 'absolute',
    top: 0
  },
});

export default FiltersView;
