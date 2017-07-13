import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import CancelButton from "../buttons/CancelButton";

import Fonts from '../../../styles/Fonts.styles'
import Colors from '../../../styles/Colors.styles'
const infoIcon = require('../../../../images/icons/info-i-white.png');

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor:'#F2F2F2',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    height: 50
  },
  header: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',

  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'left',
    alignSelf: 'center',
    marginBottom: 3
  },
});

class HalfScreenModalHeader extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    goBack: React.PropTypes.func
  };

  renderInformationSymbol(size){
    return(
      <View style={{width:size,height:size, backgroundColor:Colors.primaryColor, justifyContent:'center', alignItems:'center'}}>
        <Image source={infoIcon} style={{height: null, width:null, resizeMode:'contain', padding:15}}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
          {this.renderInformationSymbol(50)}
          <View style={{flex:1}}>
            <Text style={[{marginLeft:10, textAlign:'left'},Fonts.boldFont]}>{this.props.title}</Text>
          </View>
          <View style={{padding:5}}>
            <CancelButton onPress={this.props.onPress}/>
          </View>
        </View>
      </View>
    );
  }

}

export default HalfScreenModalHeader;

