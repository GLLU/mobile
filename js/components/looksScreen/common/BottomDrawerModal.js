import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { noop } from 'lodash'
import Modal from 'react-native-modalbox'

export default class BottomDrawerModal extends Component {

  constructor(props) {
    super(props);
    this._onRequestClose=this._onRequestClose.bind(this);
    this.state = {
      style: props.style
    }
  }

  static propTypes = {
    description: React.PropTypes.string,
    style: React.PropTypes.any,
    isOpen: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func
  };

  static defaultProps = {
    style: {overflow:'visible'},
    isOpen: false,
    onRequestClose: noop
  };

  resizeModal(ev) {
    const layout=ev.nativeEvent.layout;
    this.setState({style: {height: layout.height + 10}});
  }

  _onRequestClose(){
    this.props.onRequestClose(false)
  }

  render() {
    return (
      <Modal
        {...this.props}
        style={this.state.style}
        backdropPressToClose={true}
        swipeToClose={true}
        position="bottom"
        onClosed={this._onRequestClose}
      >
        <View onLayout={(ev)=>{this.resizeModal(ev)}}>
          {this.props.children}
        </View>
      </Modal>
    );
  }
}
