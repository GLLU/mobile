// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  View,
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import { generateAdjustedSize } from '../../../utils/AdjustabaleContent';

const w = Dimensions.get('window').width;

type Props = {
    modalVisible: boolean,
    title: string,
    subtitle: string,
    closeModal: _.noop
  };

class ModalDelay extends Component {
  static defaultProps = {
    modalVisible: false,
    title: '',
    subtitle: '',
    closeModal: _.noop,
  }

  handle

  render() {
    const { title, subtitle, modalVisible } = this.props;
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={modalVisible}
        onRequestClose={() => {closeModal({ modalVisible: false })}}
        >
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </Modal>
    );
  }
}

export default ModalDelay;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: generateAdjustedSize(20),
    textAlign: 'center',
    margin: 15,
    fontFamily: Fonts.boldFont,
  },
  subtitleText: {
    fontSize: generateAdjustedSize(16),
    fontFamily: Fonts.regularFont,
    textAlign: 'center',
    color: Colors.highlightColor,
  },
});
