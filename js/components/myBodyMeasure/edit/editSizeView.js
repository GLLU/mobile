import React, {Component} from 'react';
import {View, TouchableOpacity, Slider, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CMInchRangeView from './cmInchRangeView';
import myStyles from '../styles';
import { connect } from 'react-redux';
import { toggleCMInch } from '../../../actions/myBodyMeasure';
import convert from 'convert-units';
import Util from '../../../Util';

export class EditSizeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeScale: this.props.isInchSelect ? 'in' : 'cm',
      sizeValue: this.props.currentSize[this.props.typeEdit],
      sizeInitValue: this.props.sizeInitValue,
      maxValue: this.props.isInchSelect ? 118.11 : 300
    }
  }

  static propTypes = {
    isInchSelect: React.PropTypes.bool,
    typeEdit: React.PropTypes.string,
    currentSize: React.PropTypes.object,
    sizeInitValue: React.PropTypes.number,
    toggleEditSize: React.PropTypes.func,
    toggleCMInch: React.PropTypes.func
  }


  _completeEditSize() {
    const { currentSize, typeEdit } = this.props;
    currentSize[typeEdit] = this.state.sizeValue;
    this.props.toggleEditSize(null);
  }

  _toggleCMInch(isCheck) {
    const fromScale = isCheck ? 'cm' : 'in';
    const toScale = isCheck ? 'in' : 'cm';
    const sizeResult = convert(this.state.sizeValue).from(fromScale).to(toScale);
    this.setState({
      sizeScale: toScale,
      sizeValue: sizeResult,
      sizeInitValue: sizeResult,
      maxValue: isCheck ? 118.11 : 300
    });
    this.props.toggleCMInch(isCheck);
  }

  render() {
    const { sizeValue, sizeScale } = this.state;
    return (
      <View>
        <CMInchRangeView isInchSelect={this.props.isInchSelect} toggleCMInch={(isCheck) => this._toggleCMInch(isCheck)}/>
        <View style={myStyles.rangeContainer}>
          <View style={myStyles.rangeButtonContainer}>
            <TouchableOpacity style={myStyles.rangeCloseButton} onPress={() => this.props.toggleEditSize(false,null)}>
              <Icon style={myStyles.rangeCloseIcon}
                 name="remove"
                 backgroundColor="#3b5998"/>
            </TouchableOpacity>
          </View>
          <View style={myStyles.sliderContainer}>
            <Text style={myStyles.sliderSizeType} >
              {this.props.typeEdit}
            </Text>
            <Slider
              style={myStyles.slider}
              value={this.state.sizeInitValue}
              maximumValue={this.state.maxValue}
              minimumValue={0}
              onValueChange={(value) => this.setState({sizeValue: value})} />
          </View>
          <Text style={myStyles.sliderText} >
            {Util.format_measurement(sizeValue, sizeScale)}
          </Text>
          <View style={myStyles.rangeButtonContainer}>
            <TouchableOpacity style={myStyles.rangeCompleteButton} onPress={() => this._completeEditSize()}>
              <Icon style={myStyles.rangeCompleteIcon}
                 name="check"
                 backgroundColor="#3b5998"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    toggleCMInch: (checked) => dispatch(toggleCMInch(checked))
  };
}

const mapStateToProps = state => ({
  isInchSelect: state.myBodyMeasure.isInchSelect,
  currentSize: state.myBodyMeasure.current,
});

export default connect(mapStateToProps, bindAction)(EditSizeView);
