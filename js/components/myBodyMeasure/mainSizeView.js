import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import myStyles from './styles';
import { connect } from 'react-redux';
import { toggleEditSize, toggleSize, toggleCMInch, initalBodyMeasure } from '../../reducers/myBodyMeasure';

import CMInchRangeView from './edit/cmInchRangeView';

export class MainSizeView extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    isInchSelect: React.PropTypes.bool,
    typeEdit: React.PropTypes.string,
    currentSize: React.PropTypes.object,
    sizeList: React.PropTypes.array,
    sizeTypes: React.PropTypes.array,
    gender: React.PropTypes.string,
    bodyTypeName: React.PropTypes.string,

    toggleEditSize: React.PropTypes.func,
    toggleSize: React.PropTypes.func,
    toggleCMInch: React.PropTypes.func,
    initalBodyMeasure: React.PropTypes.func
  }

  componentDidMount() {
    this.props.initalBodyMeasure(this.props.gender,this.props.bodyTypeName);
  }

  _enterEditMode(sizeType) {
    var sizeValue = Number(this.props.currentSize[sizeType].split(' ')[0]);
    var sizeValueType = this.props.currentSize[sizeType].split(' ')[1];
    if(sizeValueType === 'cm') {
      sizeValue = sizeValue / 2.54;
    }
    this.props.toggleEditSize(true,sizeType, sizeValue);
  }

  render() {
    const {sizeList, currentSize} = this.props;

    return (
      <View>
        <Text style={myStyles.infoText}>Size</Text>
        <View style={myStyles.sizeTypeContainer}>
          {sizeList ? sizeList.map((item, i) => {
            return (<TouchableOpacity key={i} style={item.select ? myStyles.sizeButtonActive : myStyles.sizeButton}
              onPress={() => this.props.toggleSize(item.name)}>
              <Text style={item.select ? myStyles.sizeTextActive : myStyles.sizeText }>{item.name}</Text>
            </TouchableOpacity>)
          }) : null}
        </View>
        {this.props.sizeTypes.map((item, i) => {
          return (<View key={i} style={myStyles.infoContainer}>
            <Text style={myStyles.infoText}>{item}</Text>
            <TouchableOpacity style={myStyles.infoDetailTouch} onPress={() => this._enterEditMode(item)}>
              <Text style={myStyles.infoDetailText}>{currentSize ? currentSize[item] : null}</Text>
            </TouchableOpacity>
          </View>)
        })}
        <CMInchRangeView isInchSelect={this.props.isInchSelect} toggleCMInch={this.props.toggleCMInch}/>
      </View>
    )
  }
}

function bindAction(dispatch) {
  return {
    toggleEditSize: (isEdit, sizeType, sizeInitValue) => dispatch(toggleEditSize(isEdit, sizeType, sizeInitValue)),
    toggleSize: (sizeType) => dispatch(toggleSize(sizeType)),
    toggleCMInch: (checked) => dispatch(toggleCMInch(checked)),
    initalBodyMeasure: (gender,bodyTYpe) => dispatch(initalBodyMeasure(gender,bodyTYpe)),
  };
}

const mapStateToProps = state => ({
  isInchSelect: state.myBodyMeasure.isInchSelect,
  typeEdit: state.myBodyMeasure.typeEdit,
  currentSize: state.myBodyMeasure.current,
  sizeList: state.myBodyMeasure.sizeList,
  sizeTypes: state.myBodyMeasure.sizeTypes
});

export default connect(mapStateToProps, bindAction)(MainSizeView);
