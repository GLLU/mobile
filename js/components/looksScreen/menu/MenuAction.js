import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Button } from 'react-native';
import { noop } from 'lodash'
import SolidButton from "../../common/buttons/SolidButton";
import * as _ from "lodash";

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
    alignItems:'center',
    paddingHorizontal: 20
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal:10,
    fontWeight: '500'
  },
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

  renderAreYouSure(areYouSureMessage) {
    return (
      <View style={{height: 75, paddingVertical: 15}}>
        <View style={styles.areYouSureContainer}>
          <Button title='no' style={{flex:1}} onPress={this.onCancelPress}/>
          <Text style={[styles.message,{flex:4}]}>{areYouSureMessage}</Text>
          <Button title='yes' style={{flex:1}} onPress={this.onConfirmPress}/>
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