import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Platform, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {Grid, Col} from 'native-base';
import { connect } from 'react-redux';
import CMInchRangeView from './edit/cmInchRangeView';
import Utils from '../../Utils';
import convert from 'convert-units';
import { completeEdit } from '../../actions/myBodyMeasure';
import _ from 'lodash';

const MK = require('react-native-material-kit');
const {
  MKColor,
} = MK;
const deviceWidth = Dimensions.get('window').width;
const w = deviceWidth / 2 - 50;
let fontSizeDefault = 14;
let fontColor = '#000';

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
        <View style={styles.scaleRadioContainer}>
          <CMInchRangeView toggleCMInch={(inchSelected) => this._toggleCMInch(inchSelected)}/>
        </View>
        {sizeTypes.map((item, i) => {
          return (<View key={i} style={styles.infoContainer}>
            <Text style={styles.infoText}>{item}</Text>
            <View style={styles.infoDetailTouch}>

              <View style={styles.sizeLineContainer}>
                <TouchableOpacity style={styles.sizeLineBtns} onPress={() => this.decreasSize(item) }>
                  <Icon name='minus' style={styles.sizeLineIcons}/>
                </TouchableOpacity>
                <Text style={[styles.infoDetailText, this.state.updateTextColorFor === item ? styles.infoDetailTextColorChange : null]}>{this.state.currentSize
                    ? Utils.format_measurement(this.state.currentSize[item], this.state.currentSize['measurements_scale'])
                    : null}</Text>
                <TouchableOpacity style={styles.sizeLineBtns} onPress={() => this.increasSize(item) }>
                  <Icon name='plus' style={styles.sizeLineIcons}/>
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
          <View style={styles.bodyType}>
            <Image source={this.props.bodyType.shapeActive} style={styles.bodyTypeShapeImage}/>
            <Text style={styles.bodyTypeText}>{this.props.bodyType.name}</Text>
          </View>
          <View style={styles.bodyTypeImageContainer}>
            <Image style={styles.bodyTypeImage}
               source={this.state.isEdit ? this.props.bodyType.imageEditUrl
                                         : this.props.bodyType.imageOriUrl} resizeMode={'contain'}/>
          </View>
        </Col>
        <Col style={styles.sizeListContainer}>
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

const styles = StyleSheet.create({
  bodyType: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyTypeShapeImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  bodyTypeText: {
    fontSize: fontSizeDefault * 1.35,
    color: fontColor,
    marginBottom: 15,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  bodyTypeImageContainer: {
    width: w,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  bodyTypeImage: {
    width: w,
    height: 240
  },
  sizeListContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25
  },
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
  sizeLine: {
    flexDirection: 'row',
    flex: 1,
    height: 2,
    backgroundColor: 'lightgrey',
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
  },
  infoDetailTextColorChange: {
    color: MKColor.Teal
  },
  scaleRadioContainer: {
    alignItems: 'center',
    marginLeft: 50,
    flex:1
  },
});