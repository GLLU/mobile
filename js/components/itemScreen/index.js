import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import BottomButton from './bottomButton';
import TopButton from './topButton';
import BuyItButton from './buyItButton';
import IndicatorButton from './indicatorButton';
import VideoPlayer from './videoPlayer/videoPlayer';
import SpinnerSwitch from '../loaders/SpinnerSwitch'
import { like, unlike } from '../../actions/likes';

const dataSample = [
  {
    type: 'image',
    source: require('../../../images/img1.jpg'),
    avatar: require('../../../images/avatar1.jpg'),
    brand: 'ZARA',
    price: 40.50,
    top: 28,
    left: 16
  },
  {
    type: 'image',
    source: require('../../../images/img2.jpg'),
    avatar: require('../../../images/avatar2.jpg'),
    brand: 'ZARA 2',
    price: 50.50,
    top: 55,
    left: 16
  },
  {
    type: 'image',
    source: require('../../../images/img3.jpg'),
    avatar: require('../../../images/avatar1.jpg'),
    brand: 'ZARA 3',
    price: 60.50,
    top: 30,
    left: 16
  },
  {
    type: 'video',
    source: 'https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4',
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

  _toggleLike(isLiked){
    isLiked ? this.props.like(2) : this.props.unlike(2);
  }

  _renderItems() {
    return (
      <Swiper style={styles.container} horizontal={false} loop={false}
              renderPagination={renderPagination}
      >
        {
          dataSample.map((item, i) => {
            return item.type === 'image' ? (
                <View style={styles.itemContainer} key={i}>
                  <Image source={{uri: 'https://s3.amazonaws.com/gllu-assets/uploads/look_image/image/5/large_3dd9fd71-4c39-4d6a-9608-ca856c1c9959.jpg'}} style={styles.itemImage}>
                    <TopButton avatar={item.avatar}/>
                    <BottomButton toggleLike={(isLiked) => this._toggleLike(isLiked)}/>
                    <BuyItButton title={item.brand} price={item.price} positionTop={item.top} positionLeft={item.left}/>
                  </Image>
                </View>
              ) :
              <VideoPlayer source={{uri: item.source}} key={i}/>
            // (<View style={styles.itemContainer} key={i}>
            //   {/**/}
            //   <Text>Video put here</Text>
            // </View>)
          })
        }
      </Swiper>
    )
  }

  _renderItemLoader() {
    console.log('uri',this.props.item.uri)
    return (
      <View>
        <Image source={{uri: this.props.item.uri}} style={styles.itemImage}>
           <SpinnerSwitch />
        </Image>
      </View>
    )
  }
  render() {
    console.log('item', this.props)

    return this.props.isLoading === 0 ? this._renderItems() : this._renderItemLoader();
  }

}

import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';

const { popRoute, pushRoute } = actions

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    like: (id) => dispatch(like(id)),
    unlike: (id) => dispatch(unlike(id)),
  };
}

const mapStateToProps = state => ({
  isLoading: state.api.isReading,
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(ItemScreen);
