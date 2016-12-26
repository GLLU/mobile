'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView } from 'react-native';
import { View } from 'native-base';

import FilterBar from './filters/FilterBar';
import ImagesView from './items/ImagesView';

import styles from './styles';

class AllTab extends Component {

  static propTypes = {
    images: React.PropTypes.array,
    handleSwipeTab: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      filterHeight: 0,
      imagesColumn1: [],
      imagesColumn2: []
    }
  }

  onColumnLayout(e, key) {
    const layout = e.nativeEvent.layout;
    const colW = layout.width;
    const images = [];
    this.props.images.map((img, index) => {
      if (key % 2 == 0) {
        return index % 2 == 0 ? images.push(img) : false;
      } else {
        return index % 2 != 0 ? images.push(img) : false;
      }
    });
    this.arrangeImages(`imagesColumn${key}`, images, colW);
  }

  arrangeImages(key, images, colW) {
    images.map((img) => {
      Image.getSize(img.uri, (srcWidth, srcHeight) => {
        img.width = colW;
        img.height = srcHeight * colW / srcWidth ;
        this.setState({ [key]: images });
      }, error => {
        console.log('error:', error);
      });
    });
  }

  openFilter(height) {
    console.log('Open filter');
    const h = height === 0 ? 200 : 0;
    this.setState({
      filterHeight: h
    });
    this.props.handleSwipeTab(h === 0 ? false : true);
  }

  handleScroll(event) {
    const contentSizeHeight = event.nativeEvent.contentSize.height;
    const layoutMeasurementHeight = event.nativeEvent.layoutMeasurement.height;
    const currentScroll = event.nativeEvent.contentOffset.y
    const compare = (contentSizeHeight - layoutMeasurementHeight) / currentScroll;
    if (compare >= 1) {
      console.log('Load more items');
    }
  }

  render() {
    const paddingBottom = 150;
    return(
      <View style={styles.tab} scrollEnabled={false}>
        <FilterBar filterHeight={this.state.filterHeight} openFilter={this.openFilter.bind(this)} />
        <View style={[styles.mainGrid]}>
          <ScrollView scrollEventThrottle={1} onScroll={this.handleScroll.bind(this)}>
            <View style={[{flex: 1, flexDirection: 'row', paddingLeft: 5, paddingBottom: this.state.filterHeight + paddingBottom}]}>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout(e, 1)}>
                <ImagesView images={this.state.imagesColumn1} />
              </View>
              <View style={{flex: 0.5, flexDirection: 'column'}} onLayout={(e) => this.onColumnLayout(e, 2)}>
                <ImagesView images={this.state.imagesColumn2} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

function bindActions(dispatch) {
  return { };
}

const mapStateToProps = state => ({
  images: state.filters.images
});

export default connect(mapStateToProps, bindActions)(AllTab);
