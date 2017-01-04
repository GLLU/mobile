import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import BuyItButton from './buyItButton';
import IndicatorButton from './indicatorButton';
import VideoPlayer from './videoPlayer';
const itemImage = require('../../../images/background.png');

const dataSample = [
  {
    type: 'image',
    source: itemImage,
    brand: 'ZARA',
    price: 40.50,
    top: 55,
    left: 16
  },
  {
    type: 'image',
    source: itemImage,
    brand: 'ZARA 2',
    price: 40.50,
    top: 55,
    left: 16
  },
  {
    type: 'image',
    source: itemImage,
    brand: 'ZARA 3',
    price: 40.50,
    top: 55,
    left: 16
  },
  {
    type: 'video',
    source: 'http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
  }
];

const renderPagination = (index) => { // total, context
  return (
    <IndicatorButton activeIndex={index} sources={dataSample}/>
  )
}

class ItemScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Swiper style={styles.container} horizontal={false} loop={false}
          renderPagination={renderPagination}
          >
            {
              dataSample.map((item, i) => {
                return item.type === 'image' ? (
                  <View style={styles.itemContainer} key={i}>
                    <Image source={item.source} style={styles.itemImage}>
                      <TopButton />
                      <BottomButton />
                      <BuyItButton title={item.brand} price={item.price} positionTop={item.top} positionLeft={item.left}/>
                    </Image>
                  </View>
                ) :
                (<View style={styles.itemContainer} key={i}>
                  {/*<VideoPlayer source={{uri: item.source}} key={i}/> ---- this video cause memory leak/crash in android*/}
                  <Text>Video put here</Text>
                </View>)
              })
            }
        </Swiper>
    )
  }
}

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const { popRoute, pushRoute } = actions

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(ItemScreen);
