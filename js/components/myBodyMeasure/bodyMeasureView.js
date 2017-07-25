import React, {Component} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {completeEdit} from '../../actions/myBodyMeasure';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';

import Colors from '../../styles/Colors.styles';

class BodyMeasureView extends BaseComponent {
  constructor(props) {
    super(props);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.state = {
      isInchSelect: false,
      currentSize: Object.assign({}, this.props.userSize && !_.isEmpty(this.props.userSize) ? this.props.userSize : this.props.sizeList[this.props.gender][this.props.bodyType.body_type]),
      sizeList: this.props.sizeList[this.props.gender][this.props.bodyType.body_type],
    };
  }

  static propTypes = {
    gender: React.PropTypes.string,
    bodyType: React.PropTypes.object,
    onBodyTypePress: React.PropTypes.func,
    // redux
    sizeList: React.PropTypes.object,
    sizeTypes: React.PropTypes.array,
    completeEdit: React.PropTypes.func,
  }

  static defaultProps = {
    onBodyTypePress: _.noop,
  }

  componentDidMount() {
    const { currentSize } = this.state;
    this.props.completeEdit(currentSize);
  }

  onSizeChange(sizeType, value, unit) {
    this.logEvent('BodyMeasureScreen', {
      name: 'Increase Size click',
      measurement: sizeType,
      value: `${value}`,
      unit,
    });
    const { currentSize } = this.state;
    if (this.state.currentSize[sizeType] < 300 && this.state.currentSize[sizeType] > 0) {
      currentSize[sizeType] = value;
      this.setState({ currentSize });
    }
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.bodyTypeText}>{this.props.bodyType.name}</Text>
        <TouchableWithoutFeedback onPress={this.props.onBodyTypePress}>
          <Image
            style={styles.bodyTypeImage}
            source={this.props.bodyType.imageUrl} resizeMode={'contain'}/>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyTypeText: {
    fontSize: 17,
    color: Colors.black,
    marginBottom: 15,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  bodyTypeImage: {
    width: 160,
    height: 240,
  },
});

function bindAction(dispatch) {
  return {
    completeEdit: sizeInfo => dispatch(completeEdit(sizeInfo)),
  };
}

const mapStateToProps = state => ({
  sizeList: state.myBodyMeasure.sizeList,
  sizeTypes: state.myBodyMeasure.sizeTypes,
});

export default connect(mapStateToProps, bindAction)(BodyMeasureView);
