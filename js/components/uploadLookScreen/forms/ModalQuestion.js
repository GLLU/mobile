// @flow

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Modal,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Image
} from 'react-native';
import Colors from '../../../styles/Colors.styles';
import Fonts from '../../../styles/Fonts.styles';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import {generateAdjustedSize} from '../../../utils/AdjustabaleContent';
import I18n from 'react-native-i18n';
const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT');
const w = Dimensions.get('window').width;
const closeModalIcon = require('../../../../images/icons/cancel-clear-x.png')
type Props = {
  modalVisible: boolean,
  title: string,
  subtitle: string,
  confirmString: string,
  cancelString: string,
  confirmAction: () => void,
  cancelAction: () => void,
  closeModal: () => void,
};

class ModalQuestion extends Component {

  props: Props

  static defaultProps = {
    modalVisible: false,
    title: 'Thats a nice Pop Up',
    subtitle: 'dcdcd',
    confirmString: 'Confirm',
    cancelString: 'Cancel',
    confirmAction: _.noop,
    cancelAction: _.noop,
    closeModal: _.noop,
  }

  constructor(props) {
    super(props);
    this._confirmAction = this._confirmAction.bind(this)
    this._cancelAction = this._cancelAction.bind(this)
  }

  _confirmAction() {
    const {closeModal, confirmAction} = this.props
    confirmAction()
    closeModal({modalVisible: false})
  }

  _cancelAction() {
    const {closeModal, cancelAction} = this.props
    cancelAction()
    closeModal({modalVisible: false})
  }

  render() {
    const {title, subtitle, confirmString, cancelString} = this.props
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <TouchableOpacity onPress={
              this._cancelAction
            } style={styles.closeBtn}>
              <Image source={closeModalIcon} style={styles.closeModalImg} resizeMode={'contain'} />
            </TouchableOpacity>
            <View>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View>
            <Text style={styles.subtitleText}>{subtitle}</Text>
            <TouchableOpacity onPress={this._confirmAction} style={[styles.actionBtns, styles.confirmBtnBackground]}>
              <Text style={styles.btnsText}>{confirmString}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={
              this._cancelAction
            } style={[styles.actionBtns, styles.cancelBtnBackground]}>
              <Text style={styles.btnsText}>{cancelString}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center'
  },
  modalContentContainer: {
    justifyContent: 'space-around',
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    width: w-100
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  closeModalImg: {
    width: 12,
    height: 12
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
    color: Colors.highlightColor
  },
  actionBtns: {
    height: 40,
    marginVertical: 10,
    width: w-140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmBtnBackground: {
    backgroundColor: Colors.black,
  },
  cancelBtnBackground: {
    backgroundColor: Colors.secondaryColor
  },
  btnsText: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.boldContentFont,
    margin: 5
  },
});

export default ModalQuestion;
