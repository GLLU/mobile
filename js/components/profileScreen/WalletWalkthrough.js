// @flow

import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, Modal } from 'react-native';
import I18n from 'react-native-i18n';
import AppIntro from 'react-native-app-intro';

import { generateAdjustedSize } from '../../utils/AdjustabaleContent';
import Fonts from '../../styles/Fonts.styles';
import Colors from '../../styles/Colors.styles';

const walkthroughBG = require('../../../images/tutorial/walkthroughBG.png');
const lookBuy = require('../../../images/tutorial/lookBuy.png');
const uploadLook = require('../../../images/tutorial/uploadLook.png');

const { width, height } = Dimensions.get('window');

class WalletWalkthrough extends Component {

  props: {
    onClose: () => void
  };

  render(): React.Component {
    const { onClose } = this.props;

    const customStyle = {
      nextButtonText: styles.bottomControllsText,
      controllText: styles.bottomContainer,
      dotStyle: { width: 8, height: 8 },
    };

    return (
      <AppIntro onSkipBtnClick={onClose} customStyles={customStyle} onDoneBtnClick={onClose} skipBtnLabel={'Close'} nextBtnLabel={'Next'}>
        <View style={styles.slide}>
          <Image
            style={styles.background} resizeMode={'stretch'}
            source={walkthroughBG} />
          <Image
            source={uploadLook} resizeMode={'contain'}
            style={{ flex: 5, marginTop: 8 }} />
          <View style={styles.bottomContainer}>
            <View level={-10}><Text style={styles.title}>{I18n.t('UPLOAD_POST_WIZARD')}</Text></View>
            <View level={70}><Text style={styles.subtitle}>{I18n.t('UPLOAD_POST_LEGEND_WIZARD')}</Text></View>
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.background} resizeMode={'stretch'}
            source={walkthroughBG} />
          <Image
            source={lookBuy} resizeMode={'contain'}
            style={{ flex: 5, marginTop: 8 }} />
          <View style={styles.bottomContainer}>
            <View level={-10}><Text style={styles.title}>{I18n.t('LOOK_BUY_WIZARD')}</Text></View>
            <View level={70}><Text style={styles.subtitle}>{I18n.t('LOOK_BUY_LEGEND_WIZARD')}</Text></View>
          </View>
        </View>
        <View style={styles.slide}>
          <Image
            style={styles.background} resizeMode={'stretch'}
            source={walkthroughBG} />
          <Image source={require('../../../images/tutorial/lines.png')} style={{ height: height / 3 }} />
          <Image
            source={require('../../../images/tutorial/creditCard.png')} resizeMode={'contain'}
            style={{ height: generateAdjustedSize(190), width: generateAdjustedSize(365), marginTop: 8 }} />
          <View style={styles.bottomContainer}>
            <View level={-10}><Text style={styles.title}>{I18n.t('WITHDRAW_WIZARD')}</Text></View>
            <View level={70}><Text style={styles.subtitle}>{I18n.t('WITHDRAW_LEGEND_WIZARD')}</Text></View>
          </View>
        </View>
      </AppIntro>
    );
  }

}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  bottomControllsText: {
    fontFamily: Fonts.regularFont,
    fontSize: generateAdjustedSize(18),
  },
  background: {
    position: 'absolute',
    width,
    height,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 84,
  },
  title: {
    fontSize: generateAdjustedSize(24),
    textAlign: 'center',
    fontFamily: Fonts.regularFont,
    color: Colors.white,
  },
  subtitle: {
    fontSize: generateAdjustedSize(16),
    fontFamily: Fonts.subHeaderFont,
    marginLeft: 32,
    marginRight: 32,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default WalletWalkthrough;
