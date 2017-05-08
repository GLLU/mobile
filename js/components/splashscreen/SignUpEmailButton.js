import React, { Component } from 'react';
import * as _ from 'lodash';
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  btn: {
    height: 40,
    borderRadius: 4,
    borderColor: '#009688',
    borderWidth: 2,
    marginBottom: 10,
    width: deviceWidth - 80
  },
  text: {
    height:40,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

class SignUpEmailButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func
  }

  static defaultProps = {
    onPress: _.noop
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.container, styles.btn]}>
        <TouchableHighlight onPress={this.props.onPress}>
        <Text style={styles.text}>Signup with Email</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SignUpEmailButton;
