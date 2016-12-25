import React, {Component} from 'react';
import {View, TouchableOpacity, Slider, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CMInchRangeView from './cmInchRangeView';
import myStyles from '../styles';
import { connect } from 'react-redux';
import { toggleEditSize, toggleCMInch } from '../../../reducers/myBodyMeasure';

export class EditSizeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeValue: this.props.sizeInitValue,
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

  _rangeConvert(obj, isCheck) {
    if(obj) {
      if(isCheck) {
        return Math.round(obj * 100)/ 100;
      }
      return Math.round(obj * 254)/100;
    }
    return 0;
  }

  _completeEditSize() {
    var sizeString = '';
    if(this.props.isInchSelect) {
      sizeString = Math.round(this.state.sizeValue * 100) / 100 + ' inch';
    } else {
      sizeString = Math.round(this.state.sizeValue * 254) / 100 + ' cm';
    }
    this.props.currentSize[this.props.typeEdit] = sizeString;
    this.props.toggleEditSize(false,null);
  }

  render() {
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
            {this._rangeConvert(this.state.sizeValue,this.props.isInchSelect)} {this.props.isInchSelect ? 'inch' : 'cm'}
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
    toggleEditSize: (isEdit, sizeType) => dispatch(toggleEditSize(isEdit, sizeType)),
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
