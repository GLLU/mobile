import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import { View, Grid, Col, Row } from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, navigateTo, updateLookItem, publishLookItem, createLookItem, setTagPosition } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import StepZero from './StepZero';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ImageWithTags from '../common/ImageWithTags';
import Gllu from '../common';
import _ from 'lodash';

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
    backgroundColor: '#F2F2F2',
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
      currentStep: 2,
      locationX: 0,
      locationY: 0,
      imageWidth: 90,
      mode: props.mode,
      allowContinue: false,
    };
  }

  _handleLayoutImage(e) {
    const { width, height } = e.nativeEvent.layout;
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

  handleContinue() {
    const { currentStep } = this.state;
    if (currentStep < 2) {
      this.setState({currentStep: this.state.currentStep + 1});  
    }
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

  handleBackButton() {
    if (this.state.currentStep > 0) {
      this.setState({currentStep: this.state.currentStep - 1});
    } else {
      this.goBack();
    }
  }

  getCurrentMode() {
    switch(this.state.currentStep) {
      // case 0:
      //   return 'create';
      // case 1:
      //   return 'edit';
      default:
        return 'view';
    }
  }

  renderImageView() {
    const { items, image, itemId } = this.props;
    const { imageWidth } = this.state;
    const mode = this.getCurrentMode();
    return (
      <ImageWithTags
        itemId={itemId}
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
    switch(this.state.currentStep) {
      case 0:
        return <StepZero key={0} onValid={this.handleStepZeroValid.bind(this)}/>;
      case 1:
        return <StepOne key={1} onValid={this.continueAction.bind(this)}/>;
    }
    return null;
  }

  getAllowContinue() {
    const { item } = this.props;
    switch(this.state.currentStep) {
      case 0:
        return item && item.brand != null;
      case 1:
        return item && item.selectedCategory != null;
      default:
        return true;
    }
  }

  renderContent() {
    if (this.state.currentStep != 2) {
      return (
        <Grid style={{flex: 1}}>
          <Row size={75} onLayout={this._handleLayoutImage.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
            {this.renderImageView()}
          </Row>
          <Row size={25} style={{flexDirection: 'row', backgroundColor: '#F2F2F2'}}>
            <View style={styles.wrapper}>
              {this.renderActions()}
            </View>
          </Row>
        </Grid>
      );
    } else {
      return <StepTwo key={2} publishItem={this.publishAction.bind(this)}/>;
    }
  }

  render() {
    const allowContinue = this.getAllowContinue();
    const bgColor = (this.state.currentStep != 2 ? '#000000' : '#F2F2F2');
    const fgColor = (this.state.currentStep != 2 ? '#F2F2F2' : '#000000');
    return (
      <Gllu.Screen
        backgroundColor={bgColor}
        foregroundColor={fgColor}
        onBackPress={() => this.handleBackButton()}
        onNextPress={() => this.handleContinue()}
        title={this.getHeadingTitle()}
        showNext={allowContinue}
      >
        {this.renderContent()}
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
