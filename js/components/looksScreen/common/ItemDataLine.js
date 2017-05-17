import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'
import { showInfo } from '../../../actions'
import { connect } from 'react-redux'

const buyItImage = require('../../../../images/buyItButton-noprice.png');
const bagItImage = require('../../../../images/bagItImage.png');

const likeImage = require('../../../../images/like.png');
const likeClickedImage = require('../../../../images/likeClicked.png');

class ItemDataLine extends Component {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    onPress: React.PropTypes.func,
  };

  static defaultProps = {
    onPress: _.noop,
  };

  handleOpenLink() {
    const url = this.props.data.url;
    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
        }
        else {
          return Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));
    }
    else {
      this.props.showInfo("Sorry, we're still working on finding this item online for you. ")
    }
  }


  render() {
    if(this.props.isOpen){
      return (
        <TouchableHighlight>
          <Animated.View style={[styles.footerButton, {flex: 1, flexDirection: 'row', flexGrow: 10, marginTop: this.props.itemY-5}]}>
            <Text style={[styles.footerButtonText, {marginLeft: 10, marginRight: 10}]}>{this.props.data.brand.name}</Text>
            <View style={{padding: 5, borderLeftWidth: 2, borderRightWidth: 2, borderColor: 'gray'}}>
              <Text style={styles.footerButtonText}>250$</Text>
            </View>
            <View style={{ padding: 5, borderColor: 'gray', marginLeft: 5}}>
              <TouchableOpacity onPress={() => this.handleOpenLink()}>
                <Image source={bagItImage}
                       style={[styles.footerButtonIcon,{width: 25, height: 25}]}/>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableHighlight>
      );
    } else return null

  }
}

function bindActions(dispatch) {
  return {
    showInfo: text => dispatch(showInfo(text)),
  };
}

const mapStateToProps= ()=>({});

export default connect(mapStateToProps, bindActions)(ItemDataLine);

