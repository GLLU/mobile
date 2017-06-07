import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import { format_measurement } from "../../utils/FormatUtils";

const fontSizeDefault = 14;

const styles = StyleSheet.create({
  infoContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection:'row',
    marginBottom: 15
  },
  infoText: {
    flexDirection: 'column',
    width: 50,
    fontSize: fontSizeDefault * 1.2,
    color: '#ccc',
    alignSelf: 'flex-end',
    marginBottom: (Platform.OS === 'ios') ? 16 : 5,
  },
  infoDetailTouch: {
    flexDirection: 'column',
    borderBottomWidth: 0,
    borderColor: '#ddd',
    flex: 1
  },
  sizeLineContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  sizeLineBtns: {
    flexDirection: 'row',
  },
  sizeLineIcons: {
    color: '#00c497',
    fontSize: (Platform.OS === 'ios') ? 35 : 28,
  },
  infoDetailText: {
    fontSize: fontSizeDefault,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'flex-end',
    color: '#000000',
    width: 53,
    marginLeft: 8,
    marginRight: 4,
  }
});

class SizePicker extends BaseComponent {

  static propTypes = {
    sizeType:React.PropTypes.string,
    onValueChange: React.PropTypes.func,
    value:React.PropTypes.number,
    unit:React.PropTypes.string
  };

  static defaultProps = {
    value:0,
    unit: 'cm',
    onValueChange: _.noop
  };

  constructor(props){
    super(props);
    this.onIncrement=this.onIncrement.bind(this);
    this.onDecrement=this.onDecrement.bind(this);
    this.onValueChange=this.onValueChange.bind(this);
  }
  onIncrement=()=>this.onValueChange(this.props.value+1);

  onDecrement=()=>this.onValueChange(this.props.value-1);

  onValueChange=(value)=>this.props.onValueChange(this.props.sizeType, value, this.props.unit);

  render() {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{this.props.sizeType}</Text>
        <View style={styles.infoDetailTouch}>

          <View style={styles.sizeLineContainer}>
            <TouchableOpacity style={styles.sizeLineBtns} onPress={this.onDecrement}>
              <Icon name='minus' style={styles.sizeLineIcons}/>
            </TouchableOpacity>
            <Text
              style={styles.infoDetailText}>
              {format_measurement(this.props.value,this.props.unit)}
              </Text>
            <TouchableOpacity style={styles.sizeLineBtns} onPress={this.onIncrement}>
              <Icon name='plus' style={styles.sizeLineIcons}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>)
  }
}

export default SizePicker
