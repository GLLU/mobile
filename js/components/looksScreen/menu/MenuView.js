// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { noop } from 'lodash';
import i18n from 'react-native-i18n';
import BottomHalfScreenModal from '../common/BottomHalfScreenModal';
import HalfScreenModalHeader from '../../common/headers/HalfScreenModalHeader';
import MenuAction from './MenuAction';
import Colors from '../../../styles/Colors.styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  thankYouText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

type Props = {
  style: any,
  isOpen: boolean,
  onEditPress: void,
  onShareClicked: void,
  reportAbuse: void,
  isMyLook: boolean,
  isSharing: boolean
};

class MenuView extends Component {

  props: Props;

  static defaultProps = {
    style: {},
    isOpen: false,
    onRequestClose: noop,
    onDeletePress: noop,
    onEditPress: noop,
    onShareClicked: noop,
    reportAbuse: noop,
    isMyLook: false,
  };

  constructor(props: Props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
  }

  renderSeparator = ({ key }) => <View key={key} style={{ height: 1, backgroundColor: Colors.lightGray }} />;

  renderShare = () => {
    const { isSharing, onShareClicked } = this.props;
    return (
      <MenuAction
        key={'share'}
        label={i18n.t('SHARE')}
        showLoader={isSharing}
        onPress={onShareClicked} />
    );
  };

  renderEdit = () =>
    <MenuAction
      key={'edit'}
      label={i18n.t('EDIT')}
      onPress={this.props.onEditPress} />;

  renderDelete = () =>
    <MenuAction
      key={'delete'}
      label={i18n.t('DELETE')}
      onPress={this.props.onDeletePress} />;

  renderWishlist = () =>
    <MenuAction
      key={'wishlist'}
      label={i18n.t('WISHLIST')}
      onPress={() => Alert.alert('coming soon')} />;

  renderReport = () =>
    <MenuAction
      key={'report'}
      label={i18n.t('REPORT')}
      onPress={this.props.reportAbuse}
      postActionMessage={i18n.t('REPORT_TEXT')} />;

  renderBlock = () =>
    <MenuAction
      key={'block'}
      label={i18n.t('BLOCK')}
      onPress={this.props.blockUser}
      postActionMessage={i18n.t('BLOCK_TEXT')}
      withConfirmation
      areYouSureMessage={i18n.t('BLOCK_ARE_YOU_SURE')}/>;

  renderGeneralContent() {
    return [
      this.renderShare(),
      this.renderSeparator({ key: 1 }),
      this.renderReport(),
      this.renderSeparator({ key: 2 }),
      this.renderBlock(),
    ];
  }

  renderMyContent() {
    return [
      this.renderShare(),
      this.renderSeparator({ key: 1 }),
      this.renderEdit(),
    ];
  }

  _onRequestClose() {
    this.props.onRequestClose(false);
  }

  render() {
    return (
      <BottomHalfScreenModal {...this.props} style={{ borderWidth: 2 }}>
        <HalfScreenModalHeader title={i18n.t('OPTIONS')} onCancelPress={this._onRequestClose} iconType={'options'} />
        <View style={styles.container}>
          {this.props.isMyLook ? this.renderMyContent() : this.renderGeneralContent()}
        </View>
      </BottomHalfScreenModal>
    );
  }
}

export default MenuView;
