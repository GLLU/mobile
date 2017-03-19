import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { noop } from 'lodash'
import Modal from 'react-native-modalbox'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  descriptionStyle: {
    paddingLeft: 12,
    paddingRight: 12,
    color: "black",
    fontSize: 16
  }

});

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
    style: {},
    isOpen: false,
    onRequestClose: noop
  };

  resizeModal(ev) {
    this.setState({style: {height: ev.nativeEvent.layout.height + 10}});
  }

  _onRequestClose(){
    this.props.onRequestClose(false)
  }

  render() {
    console.log(`isOpen is ${this.props.isOpen}`)
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
