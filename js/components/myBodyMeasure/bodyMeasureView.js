import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import {Grid, Col} from 'native-base';
import { connect } from 'react-redux';
import CMInchRangeView from './edit/cmInchRangeView';
import myStyles from './styles';
import convert from 'convert-units';
import { completeEdit } from '../../actions/myBodyMeasure';
import _ from 'lodash';
import BaseComponent from '../common/base/BaseComponent';
import SizePicker from "./SizePicker";

class BodyMeasureView extends BaseComponent {
  constructor(props) {
    super(props);
    this.onSizeChange=this.onSizeChange.bind(this);
    this.state = {
      isInchSelect: false,
      currentSize: Object.assign({} , this.props.userSize && !_.isEmpty(this.props.userSize) ? this.props.userSize : this.props.sizeList[this.props.gender][this.props.bodyType.body_type]),
      sizeList: this.props.sizeList[this.props.gender][this.props.bodyType.body_type],
    }
  }

  static propTypes = {
    gender: React.PropTypes.string,
    bodyType: React.PropTypes.object,
    onBodyTypePress:React.PropTypes.func,
    // redux
    sizeList: React.PropTypes.object,
    sizeTypes: React.PropTypes.array,
    completeEdit: React.PropTypes.func,
  }

  static defaultProps = {
    onBodyTypePress:_.noop
  }

  componentDidMount() {
    let { currentSize } = this.state;
    this.props.completeEdit(currentSize);
  }

  convertCmAndInch(obj, fromScale, toScale) {
    this.props.sizeTypes.map((sizeType) => {
      let value = obj[sizeType];
      obj[sizeType] = Math.round(convert(value).from(fromScale).to(toScale));
    });
    obj.measurements_scale = toScale;

    return obj;
  }

  _toggleCMInch(inchSelected) {
    this.logEvent('BodyMeasureScreen', { name: 'CM/IN toggle' });
    let fromScale = inchSelected ? 'in' :'cm';
    let toScale = inchSelected ? 'cm' :'in';
    let currentSizeConverted = this.state.currentSize;
    if(toScale !== currentSizeConverted.measurements_scale) {
        currentSizeConverted = this.convertCmAndInch(this.state.currentSize, fromScale, toScale);
        this.setState({isInchSelect: inchSelected, currentSize: currentSizeConverted});
    }
  }

  onSizeChange(sizeType,value,unit){
    this.logEvent('BodyMeasureScreen', { name: `Increase Size click`, measurement: sizeType, value:`${value}`, unit:unit });
    let {currentSize} = this.state;
    if(this.state.currentSize[sizeType] < 300&&this.state.currentSize[sizeType] > 0) {
      currentSize[sizeType]=value;
      this.setState({currentSize});
    }
  }

  _renderMainView() {
    return (
      <View>
        <View style={myStyles.scaleRadioContainer}>
          <CMInchRangeView toggleCMInch={(inchSelected) => this._toggleCMInch(inchSelected)}/>
        </View>
        {this.props.sizeTypes.map((sizeType, i) => {
          const value=this.state.currentSize[sizeType];
          const unit =this.state.currentSize['measurements_scale'];
          return <SizePicker key={i} sizeType={sizeType} value={value} unit={unit} onValueChange={this.onSizeChange}/>
        })}
      </View>
    )
  }

  render() {
    return (
      <Grid>
        <Col style={{flex: 0.8}}>
          <View style={myStyles.bodyType}>
            <Text style={myStyles.bodyTypeText}>{this.props.bodyType.name}</Text>
          </View>
          <View style={myStyles.bodyTypeImageContainer}>
            <TouchableWithoutFeedback onPress={this.props.onBodyTypePress}>
            <Image style={myStyles.bodyTypeImage}
               source={this.props.bodyType.imageUrl} resizeMode={'contain'}/>
            </TouchableWithoutFeedback>
          </View>
        </Col>
        <Col style={myStyles.sizeListContainer}>
          {this._renderMainView()}
        </Col>
      </Grid>
    )
  }
}

function bindAction(dispatch) {
  return {
    completeEdit: (sizeInfo) => dispatch(completeEdit(sizeInfo)),
  };
}

const mapStateToProps = state => ({
  sizeList: state.myBodyMeasure.sizeList,
  sizeTypes: state.myBodyMeasure.sizeTypes,
});

export default connect(mapStateToProps, bindAction)(BodyMeasureView);
