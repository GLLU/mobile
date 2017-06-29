import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';

const styles = StyleSheet.create({
  headerContainer: {
    height: 50
  },
  header: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: 'Times New Roman',
    color: '#FFFFFF',
    textAlign: 'left'
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

  constructor(props) {
    super(props);

  }

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
