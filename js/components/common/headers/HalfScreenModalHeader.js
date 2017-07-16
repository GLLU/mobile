import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import CancelButton from "../buttons/CancelButton";

import Fonts from '../../../styles/Fonts.styles'
import Colors from '../../../styles/Colors.styles'
const infoIcon = require('../../../../images/icons/info-i-white.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F2F2F2',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    height: 50
  },
  informationSymbolContainer: {
    backgroundColor:Colors.primaryColor,
    justifyContent:'center',
    alignItems:'center'
  },
  informationSymbol:{
    height: null,
    width:null,
    resizeMode:'contain',
    padding:15
  },
  title: {
    marginLeft:10,
    textAlign:'left',
    fontSize:20,
    fontWeight:'bold',
    fontFamily: Fonts.boldFont
  },
});

class HalfScreenModalHeader extends PureComponent {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    goBack: React.PropTypes.func
  };

  renderInformationSymbol(size){
    return(
      <View style={[{width:size,height:size},styles.informationSymbolContainer]}>
        <Image source={infoIcon} style={styles.informationSymbol}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
          {this.renderInformationSymbol(50)}
          <View style={{flex:1}}>
            <Text style={styles.title}>{this.props.title}</Text>
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

