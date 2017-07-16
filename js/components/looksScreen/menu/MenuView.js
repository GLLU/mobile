import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import { noop } from 'lodash'
import i18n from 'react-native-i18n';
import BottomHalfScreenModal from "../common/BottomHalfScreenModal";
import SolidButton from "../../common/buttons/SolidButton";
import HalfScreenModalHeader from "../../common/headers/HalfScreenModalHeader";
import MenuAction from "./MenuAction";

const cancelIcon = require('../../../../images/icons/cancel-black.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 25
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  thankYouText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500'
  },
});

class MenuView extends Component {

  static propTypes = {
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onEditPress: React.PropTypes.func,
    onShareClicked: React.PropTypes.func,
    reportAbuse: React.PropTypes.func,
    isMyLook: React.PropTypes.bool
  };

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop,
    onDeletePress: noop,
    onEditPress: noop,
    onShareClicked: noop,
    reportAbuse: noop,
    isMyLook: false
  };

  constructor(props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
    this.reportAbuse = this.reportAbuse.bind(this);
    this.blockUser = this.blockUser.bind(this);
  }

  reportAbuse() {
    this.props.reportAbuse(this.props.lookId)
  }

  blockUser() {
    console.log('blocked!')
  }

  renderSeparator = ({key}) => <View key={key} style={{height: 5, backgroundColor: 'black'}}/>;

  renderShare = () =>
    <MenuAction
      key={'share'}
      label={i18n.t('SHARE')}
      onPress={this.props.onShareClicked}/>;

  renderEdit = () =>
    <MenuAction
      key={'edit'}
      label={i18n.t('EDIT')}
      onPress={this.props.onEditPress}/>;

  renderDelete = () =>
    <MenuAction
      key={'delete'}
      label={i18n.t('DELETE')}
      onPress={this.props.onDeletePress}/>;

  renderWishlist = () =>
    <MenuAction
      key={'wishlist'}
      label={i18n.t('WISHLIST')}
      onPress={() => Alert.alert('coming soon')}/>;

  renderReport = () =>
    <MenuAction
      key={'report'}
      label={i18n.t('REPORT')}
      onPress={this._reportAbuse}
      confirmationMessage={i18n.t('REPORT_TEXT')}/>;

  renderBlock = () =>
    <MenuAction
      key={'block'}
      label={i18n.t('BLOCK')}
      onPress={this.blockUser}
      confirmationMessage={i18n.t('BLOCK_TEXT')}
      withConfirmation={true}
      areYouSureMessage={i18n.t('BLOCK_ARE_YOU_SURE')}/>;

  renderGeneralContent() {
    return [
      this.renderShare(),
      this.renderSeparator({key: 1}),
      this.renderReport(),
      this.renderSeparator({key: 2}),
      this.renderBlock(),
      // this.renderSeparator({key:3}),
      // this.renderWishlist()
    ];
  }

  renderMyContent() {
    return [
      this.renderShare(),
      this.renderSeparator({key: 1}),
      this.renderEdit(),
      // this.renderSeparator({key:2}),
      // this.renderDelete()
    ];
  }

  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    return (
      <BottomHalfScreenModal {...this.props} style={{borderWidth: 5}}>
        <HalfScreenModalHeader title={i18n.t('OPTIONS')} onPress={this._onRequestClose}/>
        <View style={styles.container}>
          {this.props.isMyLook ? this.renderMyContent() : this.renderGeneralContent()}
        </View>
      </BottomHalfScreenModal>
    );
  }
}

export default MenuView;