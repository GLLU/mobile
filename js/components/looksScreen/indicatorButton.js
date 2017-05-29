import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native';

const circleImage = require('../../../images/indicators/indicatorCircle.png');
const circleActiveImage = require('../../../images/indicators/indicatorCircleActive.png');
const circleVideo = require('../../../images/indicators/indicatorVideo.png');
const circleActiveVIdeo = require('../../../images/indicators/indicatorVideoActive.png');

const h = Dimensions.get('window').height;

export default class IndicatorButton extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    activeIndex: React.PropTypes.number,
    sources: React.PropTypes.array
  }

  render() {
    return (
      <View style={{position: 'absolute',top: h /2 - 40}}>
        {this.props.sources.map((item, i) => {
          var comp;
          if(item.type === 'image') {
            comp = <Image key={i} style={{height: 30, width: 30, resizeMode:'contain'}}
              source={this.props.activeIndex === i ? circleActiveImage : circleImage}></Image>
          } else {
            comp = <Image key={i} style={{height: 30, width: 30, resizeMode:'contain'}}
              source={this.props.activeIndex === i ? circleActiveVIdeo : circleVideo}></Image>
          }
          return comp;
        })}
      </View>
    )
  }
}
