import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Modal,TouchableWithoutFeedback,Dimensions } from 'react-native';
import { noop } from 'lodash'

const {height} = Dimensions.get('window')

export default class BottomDrawerModal extends Component {

  constructor(props) {
    super(props);
    this._onRequestClose = this._onRequestClose.bind(this);
    this.resizeModal=this.resizeModal.bind(this);
    this.state={
      backdropHeight:0
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
    const backdropHeight=this ? this.state.backdropHeight : 0;
    if(backdropHeight===0){
      const layout=ev.nativeEvent.layout;
      this.setState({backdropHeight: height-layout.height});
    }
  }



  _onRequestClose() {
    this.props.onRequestClose(false)
  }

  render() {
    return (
      <Modal
        visible={this.props.isOpen}
        animationType='slide'
        transparent={true}
        onRequestClose={this._onRequestClose}
      >
        <View style={[this.props.style,{flexDirection: 'column-reverse'}]}>
          <View style={{backgroundColor:'white'}} onLayout={(ev)=>{this.resizeModal(ev)}}>
          {this.props.children}
          </View>
          <TouchableWithoutFeedback onPress={this._onRequestClose}>
            <View style={{height:this.state.backdropHeight}}/>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}
