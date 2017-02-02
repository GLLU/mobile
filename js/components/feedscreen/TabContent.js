'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import LikeView from './items/LikeView';
import TypeView from './items/TypeView';
import _ from 'lodash';
import { showBodyTypeModal } from '../../actions/myBodyType';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import { likeUpdate, unLikeUpdate } from '../../actions/likes';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class TabContent extends Component {

  static propTypes = {
    flatLooks: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    like: React.PropTypes.func,
    unlike: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(this.props.flatLooks);
    this.state = {
      filterHeight: 0,
      imagesColumn1,
      imagesColumn2,
      itemScreenLook: 0
    };
    this.scrollCallAsync = _.debounce(this.scrollDebounced, 100)
    this.showBodyModal = _.once(this._showBodyModal);
    this.layoutWidth = 0;
  }

  componentWillReceiveProps(nextProps) {
    const { imagesColumn1, imagesColumn2 } = this.distributeImages(nextProps.flatLooks);
    this.setState({
      imagesColumn1,
      imagesColumn2,
    })
  }

  distributeImages(looks) {
    const imagesColumn1 = [];
    const imagesColumn2 = [];
    const colW = (deviceWidth - 10) / 2;
    _.filter(looks, x => x.width && x.height).map((look, index) => {
      const { width, height } = look;
      look.width = colW;
      look.height = height * colW / width ;
      if (index % 2 === 0) {
        imagesColumn1.push(look);
      } else {
        imagesColumn2.push(look);
      }
    });

    return { imagesColumn1, imagesColumn2 };
  }

  handleScroll(event) {
    Object.keys(this.props.user_size).length === 0 ? this.scrollCallAsync(event) : null;
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const currentScroll = event.nativeEvent.contentOffset.y
    const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
    if (compare >= 1) {
      // console.log('Load more items');
    }
  }

  _showBodyModal() {
     this.props.showBodyTypeModal();
  }

  scrollDebounced(event) {
     this.showBodyModal();
  }

  _handleItemPress(item) {
    this.props.navigateTo('itemScreen', 'feedscreen', item);
    this.setState({
      itemScreenLook: item.id,
    })
  }

  toggleLikeAction(item, isLiked) {
    if (isLiked) {
      let data = {id: item.id, likes: item.likes+1, liked: true}
      this.props.likeUpdate(data);
    } else {
      let data = {id: item.id, likes: item.likes-1, liked: false}
      this.props.unLikeUpdate(data);
    }
  }

  _renderImages(images) {
    return images.map((img, index) => {
      return  (
        <TouchableOpacity key={index} onPress={(e) => this._handleItemPress(img)}>
          <View style={{width: img.width, height: img.height, paddingLeft: 0 }}>
            <Image source={{uri: img.uri.replace('-staging', '')}} style={{width: img.width - 5, height: img.height, resizeMode: 'contain' }}>
              <TypeView type={img.type} />
              <LikeView index={index} item={img} onPress={this.toggleLikeAction.bind(this)}/>
            </Image>
          </View>
        </TouchableOpacity>);
    });
  }

  render() {
    const paddingBottom = 150;
    return(
      <View style={styles.tab} scrollEnabled={false}>
        <View style={[styles.mainGrid]}>
          <ScrollView scrollEventThrottle={100} onScroll={this.handleScroll.bind(this)}>
            <View style={[{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingBottom: this.state.filterHeight + paddingBottom}]}>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                {this._renderImages(this.state.imagesColumn1)}
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}}>
                {this._renderImages(this.state.imagesColumn2)}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#FFFFFF'
  },
  mainGrid: {
    backgroundColor: '#FFFFFF',
    height: deviceHeight,
    marginTop: -10
  },
});

function bindActions(dispatch) {
  return {
    showBodyTypeModal: name => dispatch(showBodyTypeModal()),
    navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
    likeUpdate: (id) => dispatch(likeUpdate(id)),
    unLikeUpdate: (id) => dispatch(unLikeUpdate(id)),
  };
}

const mapStateToProps = state => {
  const userSize = state.user.user_size ? state.user.user_size : {};
  return {
    modalShowing: state.myBodyType.modalShowing,
    flatLooks: state.feed.flatLooksData,
    user_size: userSize
  }
};

export default connect(mapStateToProps, bindActions)(TabContent);
