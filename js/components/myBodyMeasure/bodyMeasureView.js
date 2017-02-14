import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Grid, Col} from 'native-base';
import { connect } from 'react-redux';
import CMInchRangeView from './edit/cmInchRangeView';
import myStyles from './styles';
import Util from '../../Util';
import convert from 'convert-units';
import { completeEdit } from '../../actions/myBodyMeasure';
import _ from 'lodash';

class BodyMeasureView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      typeEdit: null, // 'chest','hip','height'
      isInchSelect: false,
      currentSize: Object.assign({} , this.props.userSize && !_.isEmpty(this.props.userSize) ? this.props.userSize : this.props.sizeList[this.props.gender][this.props.bodyType.body_type]),
      sizeList: this.props.sizeList[this.props.gender][this.props.bodyType.body_type],
      updateTextColor: 'black',
      // edit
      sizeInitValue: 0,
      sizeValue: 0,
      sliderMaxValue: 0,
      sliderMinValue: 0,
    }
    console.log('props',props)
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
  }

  componentDidMount() {
    console.log('state',this.state)

    let { currentSize } = this.state
      this.props.completeEdit(currentSize);
  }

  __convertCmAndInc(obj, fromScale, toScale) {
    this.props.sizeTypes.map((sizeType) => {
      let value = obj[sizeType];
      obj[sizeType] = Math.round(convert(value).from(fromScale).to(toScale));
    });
    obj.measurements_scale = toScale;

    return obj;
  }

  _toggleCMInch(inchSelected) {
    let fromScale = inchSelected ? 'in' :'cm';
    let toScale = inchSelected ? 'cm' :'in';
    let currentSizeConverted = this.state.currentSize;
    if(toScale !== currentSizeConverted.measurements_scale) {
        currentSizeConverted = this.__convertCmAndInc(this.state.currentSize, fromScale, toScale);
        let sizeValue = convert(this.state.sizeValue).from(fromScale).to(toScale);
        this.setState({isInchSelect: inchSelected, currentSize: currentSizeConverted,
            sizeValue: sizeValue, sizeInitValue: sizeValue});
    }
  }

  increasSize(item) {
    let currentSizeItem = this.state.currentSize[item];
    if(this.state.currentSize[item] < 300) {
        this.setState({[currentSizeItem]: Number(this.state.currentSize[item]++), updateTextColor: 'green', updateTextColorFor: item});
    }
  }

  decreasSize(item) {
    let currentSizeItem = this.state.currentSize[item];
    if(this.state.currentSize[item] > 0){
          this.setState({[currentSizeItem]: Number(this.state.currentSize[item]--), updateTextColor: 'green', updateTextColorFor: item});
    }
  }

  componentDidUpdate() {
    if(this.state.updateTextColor === 'green'){
        setTimeout(function() { this.setState({updateTextColor: 'black', updateTextColorFor: ''}); }.bind(this), 200);
    }
  }

  _renderMainView() {
    let {sizeTypes} = this.props;
    return (
      <View>
        <View style={myStyles.scaleRadioContainer}>
          <CMInchRangeView toggleCMInch={(inchSelected) => this._toggleCMInch(inchSelected)}/>
        </View>
        {sizeTypes.map((item, i) => {
          return (<View key={i} style={myStyles.infoContainer}>
            <Text style={myStyles.infoText}>{item}</Text>
            <View style={myStyles.infoDetailTouch}>

              <View style={myStyles.sizeLineContainer}>
                <TouchableOpacity style={myStyles.sizeLineBtns} onPress={() => this.decreasSize(item) }>
                  <Icon name='minus' style={myStyles.sizeLineIcons}/>
                </TouchableOpacity>
                <Text style={[myStyles.infoDetailText, this.state.updateTextColorFor === item ? myStyles.infoDetailTextColorChange : null]}>{this.state.currentSize
                    ? Util.format_measurement(this.state.currentSize[item], this.state.currentSize['measurements_scale'])
                    : null}</Text>
                <TouchableOpacity style={myStyles.sizeLineBtns} onPress={() => this.increasSize(item) }>
                  <Icon name='plus' style={myStyles.sizeLineIcons}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>)
        })}
      </View>
    )
  }

  render() {
    return (
      <Grid>
        <Col style={{flex: 0.8}}>
          <View style={myStyles.bodyType}>
            <Image source={this.props.bodyType.shapeActive} style={myStyles.bodyTypeShapeImage}/>
            <Text style={myStyles.bodyTypeText}>{this.props.bodyType.name}</Text>
          </View>
          <View style={myStyles.bodyTypeImageContainer}>
            <Image style={myStyles.bodyTypeImage}
               source={this.state.isEdit ? this.props.bodyType.imageEditUrl
                                         : this.props.bodyType.imageOriUrl} resizeMode={'contain'}/>
          </View>
        </Col>
        <Col style={myStyles.sizeListContainer}>
            {this.state.isEdit ?  this._renderEditView() : this._renderMainView() }
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
  sliderMinValue: state.myBodyMeasure.sliderMinValue,
  sliderMaxValue: state.myBodyMeasure.sliderMaxValue
});

export default connect(mapStateToProps, bindAction)(BodyMeasureView);
