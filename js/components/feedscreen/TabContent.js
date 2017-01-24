'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, Dimensions } from 'react-native';
import { View } from 'native-base';
import ImagesView from './items/ImagesView';
import styles from './styles';
import _ from 'lodash';
import { showBodyTypeModal } from '../../actions/myBodyType';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import { like, unlike } from '../../actions/likes';

class TabContent extends Component {

  static propTypes = {
    images: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      filterHeight: 0,
      imagesColumn1: [],
      imagesColumn2: []
    };
    this.scrollCallAsync = _.debounce(this.scrollDebounced, 100)
    this.showBodyModal = _.once(this._showBodyModal);
  }

  createFlatLooksObj() {
    let tempObj = {};
    let tempImgObj = {};
    let flatLooksArr = [];
      this.props.looks.map((look, index) => {
        tempObj = _.pick(look.attributes, ['user-id', 'likes', 'is-liked']);
        tempObj.liked = tempObj["is-liked"];
        tempObj.type = look.attributes["user-size"].body_type;
        tempObj.id = look.id;
        tempImgObj = _.pick(look.attributes.cover, ['width', 'height']);
        tempImgObj.uri = look.attributes.cover.image.small.url;
        Object.assign(tempObj, tempImgObj);
        flatLooksArr.push(tempObj);
      });
      return flatLooksArr

  }

  onColumnLayout(e, key) {
      const flatImagesObj = this.createFlatLooksObj();
      const layout = e.nativeEvent.layout;
      const colW = layout.width;
      const images = [];
      flatImagesObj.map((img, index) => {
        if (key % 2 === 0) {
          return index % 2 === 0 ? images.push(img) : false;
        } else {
          return index % 2 !== 0 ? images.push(img) : false;
        }
      });
      this.arrangeImages(`imagesColumn${key}`, images, colW);
  }

  arrangeImages(key, images, colW) {
    Promise.all(
      images.map((img) => {
        return new Promise((resolve, reject) => {
          Image.getSize(img.uri, (srcWidth, srcHeight) => {
            img.width = colW;
            img.height = srcHeight * colW / srcWidth ;
            resolve(img);
          }, error => {
            console.log('error:', error);
            reject(error);
          });
        });
      })
    ).then((data) => {
      this.setState({ [key]: images });
    });
  }

  handleScroll(event) {
    this.scrollCallAsync(event);
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
    this.props.navigateTo('itemScreen', 'feedscreen');
  }

  render() {
    const paddingBottom = 150;
    return(
      <View style={styles.tab} scrollEnabled={false}>
        <View style={[styles.mainGrid]}>
          <ScrollView scrollEventThrottle={100} onScroll={this.handleScroll.bind(this)}>
            <View style={[{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingBottom: this.state.filterHeight + paddingBottom}]}>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout(e, 1)}>
                <ImagesView images={this.state.imagesColumn1} onItemPress={this._handleItemPress.bind(this)} likeAction={(id) => this.props.like(id)} unlikeAction={(id) => this.props.unlike(id)} />
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout(e, 2)}>
                <ImagesView images={this.state.imagesColumn2} onItemPress={this._handleItemPress.bind(this)} likeAction={(id) => this.props.like(id)} unlikeAction={(id) => this.props.unlike(id)}/>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return {
    showBodyTypeModal: name => dispatch(showBodyTypeModal()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    like: (id) => dispatch(like(id)),
    unlike: (id) => dispatch(unlike(id)),
  };
}

const mapStateToProps = state => ({
  images: state.filters.images,
  modalShowing: state.myBodyType.modalShowing,
});

export default connect(mapStateToProps, bindActions)(TabContent);
