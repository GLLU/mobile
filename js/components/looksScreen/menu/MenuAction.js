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
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 25
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
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
    fontSize: 16,
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
    fontSize:20,
    fontWeight: 'bold'
  }
});

class MenuAction extends Component {

  static propTypes = {
    label: React.PropTypes.string.isRequired,
    withConfirmation: React.PropTypes.bool,
    onPress: React.PropTypes.func,
    confirmationMessage: React.PropTypes.string,
    areYouSureMessage: React.PropTypes.string
  };

  static defaultProps = {
    onPress: _.noop,
    areYouSureMessage: 'Are you sure?'
  };

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.state = {
      isPressed: false,
      isConfirmed: false
    }
  }

  onConfirmPress() {
    this.setState({isPressed: true, isConfirmed: true}, () => {
      this.props.onPress();
    });
  }

  onCancelPress() {
    this.setState({isPressed: false});
  }

  onPress() {
    const {withConfirmation} = this.props;
    if (withConfirmation) {
      this.setState({isPressed: true});
    } else {
      this.onConfirmPress()
    }
  }

  renderAction(label, onPress) {
    return (
      <View style={{height: 75, paddingVertical: 15}}>
        <SolidButton style={{backgroundColor: '#00D7B2'}} label={label} onPress={onPress}/>
      </View>
    );
  }

  renderConfirmation(message) {
    return (
      <View style={{height: 75, paddingVertical: 15}}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    );
  }

  confirmationButton(label, onPress) {
    return (
      <TouchableOpacity style={styles.confirmationButton} onPress={onPress}>
        <Text style={styles.confirmationText}>{label}</Text>
      </TouchableOpacity>
    )
  }

  renderAreYouSure(areYouSureMessage) {
    return (
      <View style={{height: 75, paddingVertical: 15}}>
        <View style={styles.areYouSureContainer}>
          {this.confirmationButton(i18n.t('NO'), this.onCancelPress)}
          {/*<Button title={i18n.t('NO')} style={{flex:1,color:Colors.black}} onPress={this.onCancelPress}/>*/}
          <Text style={[styles.message, {flex: 4}]}>{areYouSureMessage}</Text>
          {this.confirmationButton(i18n.t('YES'), this.onConfirmPress)}
          {/*<Button title={i18n.t('YES')} style={{flex:1, color:Colors.primaryColor}} onPress={this.onConfirmPress}/>*/}
        </View>
      </View>
    );
  }

  render() {
    const {label, confirmationMessage, areYouSureMessage} = this.props;
    if (!this.state.isPressed || !this.props.confirmationMessage) {
      return this.renderAction(label, this.onPress);
    }
    if (this.state.isConfirmed) {
      return this.renderConfirmation(confirmationMessage);
    }
    return this.renderAreYouSure(areYouSureMessage);
  }
}

export default MenuAction;