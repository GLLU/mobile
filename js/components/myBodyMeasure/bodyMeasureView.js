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
const w = deviceWidth / 2 - 50;

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
      updateTextColor: 'black',
      // edit
      sizeInitValue: 0,
      sizeValue: 0,
      sliderMaxValue: 0,
      sliderMinValue: 0,
    }
  }

  componentDidMount() {
    let { currentSize } = this.state
      this.props.completeEdit(currentSize);
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
      obj[sizeType] = Math.round(convert(value).from(fromScale).to(toScale));
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
      console.log('state before: ', this.state.isInchSelect, ' ', this.state.currentSize, ' ', this.state.currentSizeConverted)
    this.setState({isInchSelect: inchSelected, currentSize: currentSizeConverted, sizeList: sizeResults,
         sizeValue: sizeValue, sizeInitValue: sizeValue});
  }

  increasSize(item) {
    let currentSizeItem = this.state.currentSize[item];
    this.setState({[currentSizeItem]: Number(this.state.currentSize[item]++), updateTextColor: 'green', updateTextColorFor: item});
  }

  decreasSize(item) {
    let currentSizeItem = this.state.currentSize[item];
    this.setState({[currentSizeItem]: Number(this.state.currentSize[item]--), updateTextColor: 'green', updateTextColorFor: item});
  }

  componentDidUpdate() {
    if(this.state.updateTextColor === 'green'){
        setTimeout(function() { this.setState({updateTextColor: 'black', updateTextColorFor: ''}); }.bind(this), 200);
    }


  }

  _renderMainView() {
    let {sizeTypes} = this.props;
    console.log(this.state.updateTextColor)
    return (
      <View>
        <View style={{alignItems: 'center',marginLeft: 50 ,flex:1}}>
          <CMInchRangeView isInchSelect={this.state.isInchSelect}
                           toggleCMInch={(inchSelected) => this._toggleCMInch(inchSelected)}/>
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
          <View style={{flexDirection: 'row'}}>
            <Image source={this.props.bodyType.shapeActive} style={{height: 30, width: 30, resizeMode: 'contain'}}/>
            <Text style={myStyles.bodyTypeText}>{this.props.bodyType.name}</Text>
          </View>
          <View style={{width: w, flex: 1, justifyContent: 'flex-end', paddingBottom: 15}}>
            <Image style={{width: w, height: 240}}
               source={this.state.isEdit ? this.props.bodyType.imageEditUrl
                                         : this.props.bodyType.imageOriUrl} resizeMode={'contain'}/>
          </View>
        </Col>
        <Col style={{flex: 1, justifyContent: 'flex-end', marginBottom: 25}}>
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
