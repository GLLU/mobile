import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Dimensions } from 'react-native';
import { View, Grid, Col, Row } from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, navigateTo, updateLookItem, publishLookItem, createLookItem, setTagPosition } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Swiper from 'react-native-swiper';
import ImageWithTags from '../common/ImageWithTags';
import Gllu from '../common';
import _ from 'lodash';

const h = Dimensions.get('window').height;
const swiperH = h - 120;
const IMAGE_VIEW_PADDING = 70;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  header: {
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: glluTheme.toolbarLineHeight,
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: glluTheme.tooolbarTextMarginLeft,
    textAlign: 'center',
    alignSelf: 'center'
  },
  backIcon: {
    color: '#FFFFFF'
  },
  wrapper: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
});

class AddItemPage extends BasePage {

  static propTypes = {
    publishLookItem: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
    mode: React.PropTypes.func,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    look: React.PropTypes.object,
    item: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
    };
  }

  _handleLayoutImage(e) {
    const { width, height } = e.nativeEvent.layout;
    console.log('_handleLayoutImage', width, height);
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  _handleAddTag(position) {
    this.props.createLookItem(position).then(() => {
      this.setState({mode: 'edit'})
    });
  }

  _handleOnDragEnd(position) {
    this.props.setTagPosition(position);
  }

  _handleContinue() {
    this.props.updateLookItem().then(response => {
      this.props.pushRoute({key: 'addItemScreen'}, this.props.navigation.key);
    });
  }

  _handleLayoutImage(e) {
    const { width, height } = e.nativeEvent.layout;
    console.log('_handleLayoutImage', width, height);
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  setUser(name) {
    this.props.setUser(name);
  }

  replaceRoute(route) {
    this.setUser(this.state.name);
    this.props.replaceAt('addItemScreen', { key: route }, this.props.navigation.key);
  }

  backToFeedScreen() {
    this.replaceRoute('feedscreen');
  }

  selectTab(step) {
    this.swiper.scrollBy(step);
  }

  continueAction() {
    this.props.updateLookItem().then(response => {
      this.selectTab(this.state.currentStep + 1);
    });
  }

  tagAnotherAction() {
    this.props.pushRoute({ key: 'tagItemScreen' }, this.props.navigation.key);
  }

  publishAction() {
    this.props.publishLookItem().then(response => {
      this.props.popRoute(this.props.navigation.key);
    });
  }

  getHeadingTitle() {
    let title = '';
    switch (this.state.currentStep) {
      case 0:
        title = 'Add New Item';
        break;
      case 1:
        title = 'Additional Info';
        break;
      default:
        title = '';
    }
    return title;
  }

  _handleSwiperScrollEnd(e, state, context) {
    const currentStep = this.state.currentStep;
    const nextStep = currentStep == 0 ? 1 : 0;
    this.setState({currentStep: nextStep});
    return true;
  }

  handleBackButton() {
    this.goBack();
  }

  getCurrentMode() {
    switch(this.state.currentStep) {
      case 0:
        return 'create';
      case 1:
        return 'edit';
      default:
        return 'view';
    }
  }

  renderImageView() {
    const { items, image } = this.props;
    const { imageWidth, currentStep } = this.state;
    const mode = this.getCurrentMode();
    return (
      <ImageWithTags
        width={imageWidth}
        mode={mode}
        items={items}
        image={image}
        onMarkerCreate={this._handleAddTag.bind(this)}
        onDragEnd={this._handleOnDragEnd.bind(this)}/>
    );
  }

  handleStepZeroValid() {
    this.setState({
      allowContinue: true
    })
  }

  renderActions() {
    return (
      <Swiper style={styles.wrapper}
          ref={(ref) => this.swiper = ref }
          loop={false}
          scrollEnabled={false}
          index={this.state.currentStep}
          onMomentumScrollEnd={this._handleSwiperScrollEnd.bind(this)}
          dot={<View style={{width: 0, height: 0}} />}
          activeDot={<View style={{width: 0, height: 0}} />}
          height={swiperH}
      >
        <StepZero key={0} onValid={this.handleStepZeroValid.bind(this)}/>
        <StepOne key={1} continueAction={this.continueAction.bind(this)} tagAnotherAction={this.tagAnotherAction.bind(this)}/>
        <StepTwo key={2} publishItem={this.publishAction.bind(this)}/>
      </Swiper>
    );
  }

  getAllowContinue() {
    switch(this.state.currentStep) {
      case 0:
        return this.props.item.brand != null;
      default:
        return true;
    }
  }

  render() {
    const allowContinue = this.getAllowContinue();
    return (
      <Gllu.Screen
        onBackPress={() => this.handleBackButton()}
        onNextPress={() => this.handleContinue()}
        title={this.getHeadingTitle()}
        showNext={allowContinue}
      >
        <Grid style={{flex: 1}}>
          <Row size={75} onLayout={this._handleLayoutImage.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
            {this.renderImageView()}
          </Row>
          <Row size={25} style={{flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F2F2'}}>
            {this.renderActions()}
          </Row>
        </Grid>
      </Gllu.Screen>
    );
  }
}

import { connect } from 'react-redux';

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    popRoute: (key) => dispatch(popRoute(key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setUser: name => dispatch(setUser(name)),
    updateLookItem: (look) => dispatch(updateLookItem(look)),
    publishLookItem: (look) => dispatch(publishLookItem(look)),
    createLookItem: (item, position) => dispatch(createLookItem(item, position)),
    setTagPosition: (position) => dispatch(setTagPosition(position)),
  };
}

const mapStateToProps = state => {
  const { itemId, lookId, image, items } = state.uploadLook;
  const item = itemId != null ? _.find(items, x => x.id == itemId) : null;
  return {
    navigation: state.cardNavigation,
    item,
    itemId,
    lookId,
    image,
    items,
  };
}

export default connect(mapStateToProps, bindActions)(AddItemPage);
