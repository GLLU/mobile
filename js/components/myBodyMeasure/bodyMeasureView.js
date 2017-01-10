import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Slider, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Grid, Col, Button} from 'native-base';
import { connect } from 'react-redux';
import CMInchRangeView from './edit/cmInchRangeView';
import myStyles from './styles';
import Util from '../../Util';
import convert from 'convert-units';
import { completeEdit, setMinMax} from '../../actions/myBodyMeasure';
const deviceWidth = Dimensions.get('window').width;
const w = deviceWidth / 2 - 30;

class BodyMeasureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      sizeSelect: null, // XS,S,M,L,XL
      typeEdit: null, // 'chest','hip','height'
      isInchSelect: false,

      currentSize: Object.assign({} , this.props.sizeList[this.props.gender][this.props.bodyType.uniqueName][2]),
      sizeList: this.props.sizeList[this.props.gender][this.props.bodyType.uniqueName],

      // edit
      sizeInitValue: 0,
      sizeValue: 0,
      sliderMaxValue: 0,
      sliderMinValue: 0
    }
    console.log('props',this.props)
  }

  static propTypes = {
    gender: React.PropTypes.string,
    bodyType: React.PropTypes.object,

    // redux
    sizeList: React.PropTypes.object,
    sizeTypes: React.PropTypes.array,
    sliderMinValue: React.PropTypes.number,
    sliderMaxValue: React.PropTypes.number,
    completeEdit: React.PropTypes.func,
    setMinMax: React.PropTypes.func
  }

  __invertScale(scaleType) {
    return scaleType === 'in' ? 'cm' : 'in';
  }

  __convertCmAndInc(obj, fromScale, toScale) {
    this.props.sizeTypes.map((sizeType) => {
      let value = obj[sizeType];
      obj[sizeType] = convert(value).from(fromScale).to(toScale);
    });
    obj.measurements_scale = toScale;
    return obj;
  }

  _toggleCMInch(inchSelected) {
    let fromScale = this.state.isInchSelect ? 'in' :'cm';
    let toScale = this.state.isInchSelect ? 'cm' :'in';
    let currentSizeConverted = this.state.currentSize;
    let sizeResults = this.state.sizeList;
    sizeResults = sizeResults.map((item) => {
      if(item.toScale !== item.measurements_scale) {
        item = this.__convertCmAndInc(item, fromScale, toScale);
        if(item.name === this.state.currentSize.name) {
          currentSizeConverted = this.__convertCmAndInc(this.state.currentSize, fromScale, toScale);
        }
        item.measurements_scale = toScale;
      }
      return item;
    })

    let sizeValue = convert(this.state.sizeValue).from(fromScale).to(toScale);

    this.setState({isInchSelect: inchSelected, currentSize: currentSizeConverted, sizeList: sizeResults,
         sizeValue: sizeValue, sizeInitValue: sizeValue});
  }

  _toggleSize(sizeName) {
    let current = this.state.currentSize;
    let sizeResults = this.state.sizeList.map((item) => {
      item.select = false;
      if(item.name === sizeName) {
        item.select = true;
        current = Object.assign({}, item);
      }
      return item;
    });
    this.props.completeEdit(current);
    this.setState({sizeSelect: sizeName, currentSize: current, sizeList: sizeResults});
  }

  _enterEditMode(bodyType) {
    var _sizeValue = Number(this.state.currentSize[bodyType]);
    this.props.setMinMax(Number(this.state.currentSize.minValue),
                         Number(this.state.currentSize.maxValue));
    this.setState({typeEdit: bodyType, isEdit: true, sizeInitValue: _sizeValue, sizeValue: _sizeValue});
  }

  _closeEditMode() {
    this.setState({isEdit: false});
  }

  _completeEditMode() {
    let current = Object.assign({}, this.state.currentSize);
    current[this.state.typeEdit] = this.state.sizeValue;
    this.setState({isEdit: false, currentSize: current});
    this.props.completeEdit(current);
  }

  increasSize(item) {
      console.log('before',this.state);
    let currentSizeItem = this.state.currentSize[item];
    this.setState({[currentSizeItem]: Number(this.state.currentSize[item]++)});
      console.log('after',this.state);
  }

  _renderMainView() {
    console.log('state', Number(this.state.currentSize.chest));
    let {sizeTypes} = this.props;
    return (
      <View>
        {sizeTypes.map((item, i) => {
          return (<View key={i} style={myStyles.infoContainer}>
            <Text style={myStyles.infoText}>{item}</Text>
            <View style={myStyles.infoDetailTouch}>
              <Text style={myStyles.infoDetailText}>{this.state.currentSize
                ? Util.format_measurement(this.state.currentSize[item], this.state.currentSize['measurements_scale'])
                : null}</Text>
              <View style={myStyles.sizeLineContainer}>
                <TouchableOpacity style={myStyles.sizeLineBtns}>
                  <Icon name='minus' style={myStyles.sizeLineIcons}/>
                </TouchableOpacity>
                <View style={myStyles.sizeLine}></View>
                <TouchableOpacity style={myStyles.sizeLineBtns} onPress={() => this.increasSize(item) }>
                  <Icon name='plus' style={myStyles.sizeLineIcons}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>)
        })}
        <CMInchRangeView isInchSelect={this.state.isInchSelect}
          toggleCMInch={(inchSelected) => this._toggleCMInch(inchSelected)}/>
      </View>
    )
  }

  render() {
    return (
      <Grid>
        <Col>
        <View style={{width: w}}>
          <Image style={{width: w, height: 350}}
             source={this.state.isEdit ? this.props.bodyType.imageEditUrl
                                       : this.props.bodyType.imageOriUrl} resizeMode={'contain'}/>
        </View>
        </Col>
        <Col>
          <Image source={this.props.bodyType.shapeActive} style={{height: 30, width: 30, marginBottom: 10, resizeMode: 'contain'}}/>
          <Text style={myStyles.bodyTypeText}>{this.props.bodyType.name}</Text>
            {this.state.isEdit ?  this._renderEditView() : this._renderMainView() }
        </Col>
      </Grid>
    )
  }
}

function bindAction(dispatch) {
  return {
    completeEdit: (sizeInfo) => dispatch(completeEdit(sizeInfo)),
    setMinMax: (min,max) => dispatch(setMinMax(min,max))
  };
}

const mapStateToProps = state => ({
  sizeList: state.myBodyMeasure.sizeList,
  sizeTypes: state.myBodyMeasure.sizeTypes,
  sliderMinValue: state.myBodyMeasure.sliderMinValue,
  sliderMaxValue: state.myBodyMeasure.sliderMaxValue
});

export default connect(mapStateToProps, bindAction)(BodyMeasureView);
