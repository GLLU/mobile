import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import Fonts from '../../../styles/Fonts.styles';
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    marginLeft: 16,
    height: 50,
  },
  header: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

  },
  headerTitle: {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'left',
    marginLeft: 6,
    fontFamily: Fonts.contentFont,
    alignSelf: 'center',
  },
  headerArrow: {
    color: '#FFFFFF',
  },
});

class Header extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    goBack: React.PropTypes.func,
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} onPress={this.props.goBack}>
            <Image style={{ width: 22, height: 22 }} resizeMode={'contain'} source={require('../../../../images/icons/backArrow.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }

}

export default Header;
