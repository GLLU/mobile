import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, Text, View, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modalbox';
import SocialShare from '../../lib/social';
import Icon from 'react-native-vector-icons/Entypo';
import { formatInvitationMessage } from "../../lib/messages/index";
const deviceWidth = Dimensions.get('window').width;
const wModal = deviceWidth / 1.5;
const hModal = wModal / 2;

const styles = StyleSheet.create({
  menuModal: {
    width: wModal,
    height: hModal,
    backgroundColor: '#fff',
    borderRadius: 0,
    overflow: 'hidden',
  },
  optionBtn: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  optionInnerContainer: {
    flexDirection: 'row',
    marginLeft: 40
  },
  optionIcon: {
    fontSize: 23,
    marginRight: 10
  },
  optionText: {
    fontSize: 14,
    color: '#009688',
    alignSelf: 'center'
  },
  optionSeparetor: {
    width: wModal-20, marginLeft: 10, marginRight: 10, borderWidth: 0.7, borderColor: 'grey'
  },
  thankYouContainer: {
    flex: 1,
    padding: 20
  },
  thankYouText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
});

class menuModal extends Component {

  static propTypes = {
    isMenuOpen: React.PropTypes.bool,
    reportAbuse: React.PropTypes.func,
    closeModal: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      abuseReported: false,
    }
  }

  _onShareClicked() {
    const message=SocialShare.generateShareMessage(formatInvitationMessage(this.props.shareToken));
    SocialShare.nativeShare(message);
  }

  _reportAbuse() {
    this.setState({abuseReported: true})
    this.props.reportAbuse()
  }

  _closeMenu() {
    this.props.closeModal()
    this.setState({abuseReported: false})
  }

  renderOptions() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight
          onPress={() => this._onShareClicked()}
          transparent
          style={styles.optionBtn}
        >
          <View style={styles.optionInnerContainer}>
            <Icon name="share" style={[styles.optionIcon, { color: '#000000' }]} />
            <Text style={styles.optionText}>Share</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.optionSeparetor} />
        <TouchableHighlight
          onPress={() => this._reportAbuse()}
          transparent
          style={styles.optionBtn}
        >
          <View style={styles.optionInnerContainer}>
            <Icon name="info-with-circle" style={[styles.optionIcon, { color: '#b23527' }]} />
            <Text style={styles.optionText}>Report abuse</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderReportThankYou() {
    return (
      <View style={styles.thankYouContainer}>
        <Text style={styles.thankYouText}>Thank you for making inFash better! we'll examine your report and will be in touch with you over email.</Text>
      </View>
    )
  }

  render() {
    return (
      <Modal isOpen={this.props.isMenuOpen}
             style={styles.menuModal}
             backdropPressToClose ={true}
             swipeToClose={true}
             position={"center"}
             onClosed={() => this._closeMenu()}>
        {!this.state.abuseReported ? this.renderOptions() : this.renderReportThankYou()}
      </Modal>
    );
  }
}

export default menuModal;