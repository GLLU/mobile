import React, {Component} from 'react';
import {View, TouchableOpacity, Slider, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CMInchRangeView from './cmInchRangeView';
import myStyles from '../styles';
import { connect } from 'react-redux';
import { toggleEditSize, toggleCMInch } from '../../../actions/myBodyMeasure';
import convert from 'convert-units';
import Util from '../../../Util';

export class EditSizeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeScale: this.props.isInchSelect ? 'in' : 'cm',
      sizeValue: this.props.currentSize[this.props.typeEdit],
      sizeInitValue: this.props.sizeInitValue
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      sizeScale: nextProps.isInchSelect ? 'in' : 'cm',
      sizeValue: nextProps.currentSize[nextProps.typeEdit],
      sizeInitValue: nextProps.sizeInitValue
    }); 
  }

  _completeEditSize() {
    const { currentSize, typeEdit } = this.props;
    this.props.currentSize[typeEdit] = this.state.sizeValue;
    this.props.toggleEditSize(false, null);
  }

  render() {
    const { sizeValue, sizeScale } = this.state;
    return (
      <View>
        <CMInchRangeView isInchSelect={this.props.isInchSelect} toggleCMInch={this.props.toggleCMInch}/>
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
              maximumValue={118.11}
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
    toggleEditSize: (isEdit, sizeType, value) => dispatch(toggleEditSize(isEdit, sizeType, value)),
    toggleCMInch: (checked) => dispatch(toggleCMInch(checked))
  };
}

const mapStateToProps = state => ({
  isInchSelect: state.myBodyMeasure.isInchSelect,
  typeEdit: state.myBodyMeasure.typeEdit,
  currentSize: state.myBodyMeasure.current,
  sizeInitValue: state.myBodyMeasure.sizeInitValue
});

export default connect(mapStateToProps, bindAction)(EditSizeView);
