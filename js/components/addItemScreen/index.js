import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, View } from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute, updateLookItem, publishLookItem } from '../../actions';
import { actions } from 'react-native-navigation-redux-helpers';
import styles from './styles';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepsBar from './StepsBar';
import Swiper from 'react-native-swiper';

const h = Dimensions.get('window').height;
const swiperH = h - 120;

const selfStyles = StyleSheet.create({
  header: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    height: 50,
    paddingTop: 20
  },
  backIcon: {
    color: '#000'
  },
  wrapper: {

  }
});

class AddItemPage extends Component {

  static propTypes = {
    updateLookItem: React.PropTypes.func,
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
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
    console.log('Back to FeedScreen');
    this.replaceRoute('feedscreen');
  }

  selectTab(step) {
    this.swiper.scrollBy(step);
  }

  continueAction() {
    console.log('CONTINUE');

    this.props.updateLookItem(this.props.look).then(response => {
      console.log('done updateLookItem', response);
      this.selectTab(this.state.currentStep + 1);
    });
  }

  tagAnotherAction() {
    console.log(' TAG ANOTHER');
    this.props.pushRoute({ key: 'publishItem' }, this.props.navigation.key);
  }

  publishAction() {
    console.log('Publish');
    this.props.publishLookItem().then(response => {
      console.log('done publishLookItem', response);
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
    console.log('_handleSwiperScrollEnd');
    const currentStep = this.state.currentStep;
    const nextStep = currentStep == 0 ? 1 : 0;
    this.setState({currentStep: nextStep});
    return true;
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{height: 60}}>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon style={selfStyles.backIcon} name="ios-arrow-back" />
          </Button>
          <Title style={selfStyles.header}>{this.getHeadingTitle()}</Title>
        </Header>
        <Content scrollEnabled={false} contentContainerStyle={{flex: 1, backgroundColor: '#F2F2F2', justifyContent: 'space-between', paddingVertical: 10}}>
          <View style={styles.mainView}>
            <StepsBar selectTab={this.selectTab.bind(this)} currentStep={this.state.currentStep} />
            <Swiper style={styles.wrapper}
                    ref={(ref) => this.swiper = ref }
                    loop={false}
                    index={this.state.currentStep}
                    onMomentumScrollEnd={this._handleSwiperScrollEnd.bind(this)}
                    dot={<View style={{width: 0, height: 0}} />}
                    activeDot={<View style={{width: 0, height: 0}} />}
                    height={swiperH}>
              <StepOne key={1} continueAction={this.continueAction.bind(this)} tagAnotherAction={this.tagAnotherAction.bind(this)}/>
              <StepTwo key={2} publishItem={this.publishAction.bind(this)}/>
            </Swiper>
          </View>
        </Content>
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
