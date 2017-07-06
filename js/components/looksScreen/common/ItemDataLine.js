import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TouchableOpacity, StyleSheet, Text, Animated, Linking } from 'react-native';
import * as _ from 'lodash'
import styles from '../styles'
import { showInfo } from '../../../actions'
import { connect } from 'react-redux'

const bagItImage = require('../../../../images/icons/bag-white.png');

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
          <Animated.View style={[styles.footerButton, { flexDirection: 'row', padding: 0, margin: 5}]}>
            <TouchableOpacity onPress={() => this.handleOpenLink()}>
              <Text style={[styles.footerButtonText, {marginHorizontal: 10}]}>{this.props.data.brand.name}</Text>
              <View style={{ margin: 5,borderLeftWidth: 2, borderColor: 'gray'}}>
                  <Image source={bagItImage}
                         style={[styles.footerButtonIcon,{width: 20, height: 20, margin: 2.5, marginLeft: 10}]}/>
              </View>
            </TouchableOpacity>
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

