import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, View, Grid, Col, Row } from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, navigateTo, updateLookItem, publishLookItem } from '../../actions';
import glluTheme from '../../themes/gllu-theme';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepsBar from './StepsBar';
import Swiper from 'react-native-swiper';

const h = Dimensions.get('window').height;
const swiperH = h - 120;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2'
  },
  header: {
    fontFamily: 'PlayfairDisplay-Regular',
    lineHeight: glluTheme.toolbarLineHeight,
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginLeft: glluTheme.tooolbarTextMarginLeft,
    textAlign: 'center',
    alignSelf: 'center'
  },
  backIcon: {
    color: '#000'
  },
  wrapper: {

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
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    look: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
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

  _handleBack() {
    Alert.alert(
      '',
      'Are you sure you want to go back?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.popRoute(this.props.navigation.key);
          }
        }
      ]
    );
  }

  render() {
    return (
      <Container style={styles.container} theme={glluTheme}>
        <Header>
          <Button transparent onPress={() => this._handleBack()}>
            <Icon style={styles.backIcon} name="ios-arrow-back" />
          </Button>
          <Title style={styles.header}>{this.getHeadingTitle()}</Title>
        </Header>
        <View
            scrollEnabled={false}
            disableKBDismissScroll
            style={{flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'space-between', paddingVertical: 10}}>
          <Grid>
            <Row style={{height: 50}}>
              <StepsBar selectTab={this.selectTab.bind(this)} currentStep={this.state.currentStep} />
            </Row>
            <Row>
              <Swiper style={styles.wrapper}
                      ref={(ref) => this.swiper = ref }
                      loop={false}
                      scrollEnabled={false}
                      index={this.state.currentStep}
                      onMomentumScrollEnd={this._handleSwiperScrollEnd.bind(this)}
                      dot={<View style={{width: 0, height: 0}} />}
                      activeDot={<View style={{width: 0, height: 0}} />}
                      height={swiperH}>
                <StepOne key={1} continueAction={this.continueAction.bind(this)} tagAnotherAction={this.tagAnotherAction.bind(this)}/>
                <StepTwo key={2} publishItem={this.publishAction.bind(this)}/>
              </Swiper>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

import { connect } from 'react-redux';

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    popRoute: (key) => dispatch(popRoute(key)),
    pushRoute: (routeKey, route, key) => dispatch(pushRoute(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    setUser: name => dispatch(setUser(name)),
    updateLookItem: (look) => dispatch(updateLookItem(look)),
    publishLookItem: (look) => dispatch(publishLookItem(look)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  look: state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(AddItemPage);
