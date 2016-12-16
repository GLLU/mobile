'use strict';

import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native'
import { View, Text, Button, Icon } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import {
  MKRangeSlider
} from 'react-native-material-kit';

import styles from './styles';
const dress = require('../../../images/categories/dress.png');
const coat = require('../../../images/categories/coat.png');
const boot = require('../../../images/categories/boot.png');

class ValueText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curValue: props.initial,
    };
  }

  onChange(curValue) {
    this.setState({curValue});
  }

  render() {
    let curValue = this.state.curValue.split('-');
    let min = curValue[0];
    let max = curValue[1];
    return (
      <Grid style={{paddingLeft: 10, paddingRight: 10}}>
        <Col size={80}>
          <Text style={styles.legendLabel}>
            ₤ {min}
          </Text>
        </Col>
        <Col size={20}>
          <Text style={styles.legendLabel}>
            ₤ {max}
          </Text>
        </Col>
      </Grid>
    );
  }
}

class FilterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterActionsHeight: 0,
      openFilter: true
    };
  }

  componentDidMount() {
    const slider = this.refs.sliderWithValue;
    const ranged = this.refs.rangeSlider;
  }

  openFilter() {
    console.log('Open Filter');
    this.setState({
      openFilter: !this.state.openFilter
    });
    var h = 0;
    if (this.state.openFilter == true) {
      h = 380;
    } else {
      h = 0;
    }
    this.setState({
        filterActionsHeight: h
      });
  }

  filterByCate(cate) {
    console.log('Filter by cate');
  }

  _renderCategories() {
    return (
      <View style={styles.filterCategories}>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          scrollEventThrottle={32}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemTitle}>Dresses</Text>
            <Button transparent style={styles.btncategoryItem} onPress={() => this.filterByCate(0)} >
              <Image source={dress} style={styles.categoryItemImage} />
            </Button>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemTitle}>Coats</Text>
            <Button transparent style={styles.btncategoryItem} onPress={() => this.filterByCate(0)} >
              <Image source={coat} style={styles.categoryItemImage} />
            </Button>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemTitle}>Boots</Text>
            <Button transparent style={styles.btncategoryItem} onPress={() => this.filterByCate(0)} >
              <Image source={boot} style={styles.categoryItemImage} />
            </Button>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemTitle}>Coats 2</Text>
            <Button transparent style={styles.btncategoryItem} onPress={() => this.filterByCate(0)} >
              <Image source={coat} style={styles.categoryItemImage} />
            </Button>
          </View>
          <View style={styles.categoryItem}>
            <Text style={styles.categoryItemTitle}>Dresses 2</Text>
            <Button transparent style={styles.btncategoryItem} onPress={() => this.filterByCate(0)} >
              <Image source={dress} style={styles.categoryItemImage} />
            </Button>
          </View>
        </ScrollView>
      </View>)
  }

  _renderSlider() {
    return (
      <View style={styles.sliderFilters}>
        <MKRangeSlider
          ref="rangeSlider"
          min={10}
          max={100}
          minValue={20}
          maxValue={75}
          upperTrackColor={'#212121'}
          lowerTrackColor={'#212121'}
          onChange={(curValue) => this.refs.rangeValueText.onChange(curValue.min.toFixed(2) + '-' + curValue.max.toFixed(2))}
          />
        <ValueText ref="rangeValueText" initial="10.00-75.00" rangeText="10~100" />
      </View>)
  }

  render() {
    return(
      <View>
        <Grid style={styles.filter}>
          <Col size={10}>
            <Button transparent onPress={() => this.openFilter()} style={styles.btnFilter}>
              <Icon name="md-options" style={styles.normalBtn} />
            </Button>
          </Col>
          <Col size={20}>
            <Text style={styles.Textlabel}>Filter by</Text>
          </Col>
          <Col size={70}>
            <Text style={styles.TextResults}>All Results</Text>
          </Col>
        </Grid>
        <View style={[styles.filterActions, {height: this.state.filterActionsHeight}]}>
          <View style={styles.filterActionsGrid}>
            {this._renderCategories()}
            {this._renderSlider()}
          </View>
        </View>
      </View>
    )
  }
}

module.exports = FilterView;
