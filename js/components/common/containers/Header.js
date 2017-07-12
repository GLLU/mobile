import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Platform } from 'react-native';
import { Button, Icon } from 'native-base';

const styles = StyleSheet.create({
  headerContainer: {
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
  headerArrow: {
    color: '#FFFFFF'
  }
});

class Header extends Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    goBack: React.PropTypes.func
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Button transparent onPress={this.props.goBack}>
            <Icon style={StyleSheet.flatten(styles.headerArrow)} name="ios-arrow-back"/>
          </Button>
          <Text style={styles.headerTitle}>{this.props.title}</Text>
        </View>
      </View>
    );
  }

}

export default Header;
