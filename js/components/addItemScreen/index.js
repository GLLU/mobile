import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { View, Grid, Col, Row, Button, Icon} from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, navigateTo, updateLookItem, publishLookItem, createLookItem, setTagPosition } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import StepMarker from './StepMarker';
import StepZero from './StepZero';
import StepOne from './StepOne';
import OccasionsStrip from '../common/OccasionsStrip';
import StepTwo from './StepTwo';
import { LOOK_STATES } from '../../constants';
import ImageWithTags from '../common/ImageWithTags';
import Gllu from '../common';
import _ from 'lodash';
const h = Dimensions.get('window').height;
const w = Dimensions.get('window').width;
const IMAGE_VIEW_PADDING = 80;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  backIcon: {
    color: '#FFFFFF'
  },
  wrapper: {
    backgroundColor: 'red',
    width: w,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F2F2F2'
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    height: 30,
    zIndex: 1,
    flexDirection: 'row',
    width: w,
    justifyContent: 'space-between'
  },
  headerTitle: {
    backgroundColor: 'transparent',
    fontWeight: '600',
    fontSize: 17,
    alignSelf: 'center'
  }
});

class AddItemPage extends BasePage {

  static propTypes = {
    publishLookItem: React.PropTypes.func,
    updateLookItem: React.PropTypes.func,
    mode: React.PropTypes.string,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    look: React.PropTypes.object,
    item: React.PropTypes.object,
    state: React.PropTypes.string,
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
    const { width } = e.nativeEvent.layout;
    const w = parseInt(width - IMAGE_VIEW_PADDING * 2, 10);
    this.setState({
      imageWidth: w
    })
  }

  handleContinue() {
    const { currentStep } = this.state;
    if (currentStep < 1) {
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

  selectTab(step) {
    this.swiper.scrollBy(step);
  }


  continueAction() {
    this.props.updateLookItem().then(response => {
      this.selectTab(this.state.currentStep + 1);
    });
  }

  tagAnotherAction() {
    this.props.pushRoute({ key: 'addItemScreen' }, this.props.navigation.key);
  }

  publishAction() {
    this.logEvent('UploadLookScreen', { name: 'Publish click' });
    this.props.publishLookItem().then(response => {
      if (this.props.state === LOOK_STATES.PUBLISHED) {
        this.props.popRoute(this.props.navigation.key);  
      } else {
        this.props.pushRoute({key: 'finishLookScreen'}, this.props.navigation.key);  
      }
    });
  }

  getHeadingTitle() {
    let title = '';
    switch (this.state.currentStep) {
      case 0:
        title = 'Choose a Brand';
        break;
      case 1:
        title = 'Addional Info';
        break;
      default:
        title = 'Place marker to tag an item';
    }
    return title;
  }

  handleBackButton() {
    if (this.state.currentStep > -1) {
      this.setState({currentStep: this.state.currentStep - 1});
    } else {
      this.goBack();
    }
  }

  getCurrentMode() {
    switch(this.state.currentStep) {
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
        image={image}/>
    );
  }

  handleStepZeroValid() {
    this.setState({
      allowContinue: true
    })
  }

  renderActions() {
    return (
      <View style={{position: 'absolute', height: h, zIndex: 2}}>
        <View style={{ width: w, justifyContent: 'space-between', flexDirection: 'row', marginTop: 70}}>
          <OccasionsStrip  onValid={this.continueAction.bind(this)}/>
          <StepOne onValid={this.continueAction.bind(this)}/>
        </View>
        <StepZero onValid={this.handleStepZeroValid.bind(this)}/>
      </View>
    )
  }

  getAllowContinue() {

    const { item } = this.props;
    console.log('itemm', item);
    switch(this.state.currentStep) {
      case -1:
        return item !== null;
      case 0:
        return item && item.brand && item.category !== null;
      case 1:
        return false;
      default:
        return true;
    }
  }

  renderContent() {
    if (this.state.currentStep === -1) {
      const { mode } = this.state;
      return (
        <StepMarker
          mode={mode}
          />
      );
    }

    if (this.state.currentStep !== 1) {
      return (
        <Grid style={{flex: 1}}>
          <Row size={70} onLayout={this._handleLayoutImage.bind(this)} style={{flexDirection: 'column', alignItems: 'center'}}>
            {this.renderImageView()}
            {this.renderActions()}
          </Row>
        </Grid>
      );
    }
    return <StepTwo key={2} publishItem={this.publishAction.bind(this)}/>;
  }

  renderNext(fgColor) {
    return (
      <Button transparent onPress={() => this.handleContinue()}>
        <Icon style={[styles.backIcon, { color: fgColor }]} name="ios-arrow-forward" />
      </Button>
    )
  }

  render() {
    const allowContinue = this.getAllowContinue();
    const fgColor = (this.state.currentStep !== 2 ? '#F2F2F2' : '#000000');
    return (
      <View>
        <View style={styles.headerContainer}>
          <Button transparent onPress={() => this.handleBackButton()} style={{width: 30, height: 30}}>
            <Icon style={[styles.backIcon, { color: fgColor }]} name="ios-arrow-back" />
          </Button>
          <Text style={styles.headerTitle}>{this.getHeadingTitle()}</Text>
          {allowContinue ? this.renderNext(fgColor) : <View style={{width: 30, height: 30}}></View>}
        </View>
        {this.renderContent()}
      </View>
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
  const { itemId, lookId, image, items} = state.uploadLook;
  const item = itemId !== null ? _.find(items, x => x.id === itemId) : null;
  return {
    navigation: state.cardNavigation,
    item,
    itemId,
    lookId,
    image,
    items,
    state: state.uploadLook.state,
  };
}

export default connect(mapStateToProps, bindActions)(AddItemPage);
