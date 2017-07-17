import React, { PureComponent } from 'react';
import i18n from 'react-native-i18n';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from "../../styles/Colors.styles";

const styles = StyleSheet.create({
  unblockBtn: {
    backgroundColor: Colors.transparent,
    width: 75,
    height: 25,
    justifyContent: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
  },
  unblockText: {
    textAlign: 'center',
    color: Colors.primaryColor
  },
});

type Props={
  onPress:void,
  style:any
}

class UnblockView extends PureComponent {

  props: Props;

  render() {
    const {onPress,style}=this.props;
    return(
      <TouchableOpacity style={[styles.unblockBtn,style]} onPress={onPress}>
        <Text style={styles.unblockText}>{i18n.t('UNBLOCK')}</Text>
      </TouchableOpacity>
    )
  }
}

export default UnblockView