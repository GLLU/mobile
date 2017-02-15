import React, { Component } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import { Picker, Icon} from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import FontSizeCalculator from './../../../calculators/FontSize';
const Item = Picker.Item;
const ICONS = {
  'us': require('../../../../images/flags/us.png'),
  'uk': require('../../../../images/flags/uk.png'),
  'eu': require('../../../../images/flags/eu.png'),
};

const btnStyles = StyleSheet.create({
  selectOptions: {
    width: 100,
    marginTop: (Platform.OS === 'ios') ? 8 : 0,
  },
  selectOptionsWithoutIcon: {
    width: 120,
    marginTop: (Platform.OS === 'ios') ? 8 : 0,
  },
  arrowSelect: {
    color: '#BDBDBD',
    fontSize: new FontSizeCalculator(18).getSize(),
    paddingTop: 15
  },
  container: {
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  flagSelectOptions: {
    width: new FontSizeCalculator(40).getSize(),
    height: new FontSizeCalculator(30).getSize(),
    marginLeft: 10,
    marginTop: 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});

class MyPicker extends Picker {
  showModal() {
    this.setState({ modalVisible: true });
  }
}

class CustomPicker extends Component {
  static propTypes = {
    selectedValue: React.PropTypes.string,
    showIcon: React.PropTypes.bool,
    items: React.PropTypes.array,
    onValueChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: 200
    }
  }

  _handleValueChange(value) {
    this.props.onValueChange(value)
  }

  _renderPicker(items, selectedValue) {
    if (items.length > 0) {
      const style = this.props.showIcon ? btnStyles.selectOptions : btnStyles.selectOptionsWithoutIcon;
      return <MyPicker
                  ref={ref => this.pickerModal = ref}
                  style={style}
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={selectedValue}
                  onValueChange={(value) => this._handleValueChange(value)}>
                {items.map((item, i) => {
                  return <Item style={{width: 200}} key={i} label={item.toUpperCase()} value={item} />
                })}
              </MyPicker>;
    }
    return null;
  }

  _renderIcon(selectedValue) {
    if (selectedValue && ICONS[selectedValue]) {
      let flagIcon = ICONS[selectedValue];
      return (
        <TouchableWithoutFeedback onPress={(e) => this.pickerModal.showModal()}>
          <Image source={flagIcon} style={btnStyles.flagSelectOptions} />
        </TouchableWithoutFeedback>);
    }

    return null;
  }

  _renderArrow() {
    return <TouchableWithoutFeedback onPress={(e) => this.pickerModal.showModal()}>
              <Icon style={btnStyles.arrowSelect} name='ios-arrow-down' />
            </TouchableWithoutFeedback>;
  }

  render() {
    const { items, selectedValue, showIcon } = this.props;
    
    if (showIcon) {
      return (<Grid style={btnStyles.container}>
                      <Col size={20}>
                        {this._renderIcon(selectedValue)}
                      </Col>
                      <Col size={60}>
                        {this._renderPicker(items, selectedValue)}
                      </Col>
                      <Col size={20}>
                        {this._renderArrow()}
                      </Col>
                    </Grid>);
    } else {
      return (<Grid style={btnStyles.container}>
                  <Col size={80} style={{paddingLeft: 20}}>
                    {this._renderPicker(items, selectedValue)}
                  </Col>
                  <Col size={20}>
                    {this._renderArrow()}
                  </Col>
                </Grid>);
    }
  }
}

export default CustomPicker;