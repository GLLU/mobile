// @flow

import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Button } from 'react-native';
import { noop } from 'lodash'
import SolidButton from "../../common/buttons/SolidButton";
import * as _ from "lodash";
import i18n from 'react-native-i18n';
import Colors from "../../../styles/Colors.styles";
import Fonts from "../../../styles/Fonts.styles";

const styles = StyleSheet.create({
  container: {
    height: 75,
    paddingVertical: 15
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  areYouSureContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  message: {
    textAlign: 'center',
    flex: 4,
    fontSize: 14,
    paddingHorizontal: 10,
    fontWeight: '500'
  },
  confirmationButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationText: {
    textAlign: 'center',
    color: Colors.black,
    fontFamily: Fonts.regularFont,
    fontSize: 14,
    fontWeight: 'bold'
  }
});

type Props = {
  label: string,
  withConfirmation: boolean,
  onPress: void,
  showLoader: boolean,
  postActionMessage: string,
  areYouSureMessage: string
};

class MenuAction extends Component {

  props: Props;

  static defaultProps = {
    onPress: _.noop,
    areYouSureMessage: 'Are you sure?'
  };

  constructor(props: Props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this._onConfirmPress = this._onConfirmPress.bind(this);
    this._onCancelPress = this._onCancelPress.bind(this);
    this.state = {
      isPressed: false,
      isDone: false
    }
  }

  _onConfirmPress() {
    this.setState({isPressed: true, isDone: true}, () => {
      this.props.onPress();
    });
  }

  _onCancelPress() {
    this.setState({isPressed: false});
  }

  _onPress() {
    const {withConfirmation} = this.props;
    if (withConfirmation) {
      this.setState({isPressed: true});
    } else {
      this._onConfirmPress()
    }
  }

  renderPostActionMessage(message: string) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }

  renderConfirmationButton(label: string, onPress) {
    return (
      <TouchableOpacity style={styles.confirmationButton} onPress={onPress}>
        <Text style={styles.confirmationText}>{label}</Text>
      </TouchableOpacity>
    )
  }

  renderAreYouSure(areYouSureMessage) {
    return (
      <View style={styles.areYouSureContainer}>
        {this.renderConfirmationButton(i18n.t('NO'), this._onCancelPress)}
        <Text style={styles.message}>{areYouSureMessage}</Text>
        {this.renderConfirmationButton(i18n.t('YES'), this._onConfirmPress)}
      </View>
    );
  }

  renderContent() {
    const {label, postActionMessage, areYouSureMessage, showLoader} = this.props;
    const {isPressed, isDone} = this.state;
    if (!isPressed || !postActionMessage) {
      return <SolidButton
        showLoader={showLoader}
        label={label}
        onPress={this._onPress}
      />
    }
    if (isDone) {
      return this.renderPostActionMessage(postActionMessage);
    }
    return this.renderAreYouSure(areYouSureMessage);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    )
  }
}

export default MenuAction;