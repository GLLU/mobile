import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';
import Fonts from '../../../styles/Fonts.styles';

const styles = StyleSheet.create({
  headerContainer: {
    height: 50
  },
  header: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '300',
    fontFamily: Fonts.regularFont,
    color: '#000000',
    textAlign: 'left'
  },
  headerArrow: {
    color: '#000000'
  }
});

class ModalHeader extends Component {

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

export default ModalHeader;
