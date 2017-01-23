import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Button, Icon, Title, View } from 'native-base';
import { setUser, replaceAt, popRoute, pushRoute } from '../../actions';
import { actions } from 'react-native-navigation-redux-helpers';
import styles from './styles';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import ActionsBar from './ActionsBar';
import StepsBar from './StepsBar';
import Swiper from 'react-native-swiper';

const h = Dimensions.get('window').height;
const swiperH = h - 100;

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
    setUser: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    image: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
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
    console.log('Select Tab');
    if (step > 0 && step < this.state.currentStep) {
      this.setState({currentStep: step});
    }
  }

  continueAction() {
    console.log('CONTINUE');
  }

  tagAnotherAction() {
    console.log(' TAG ANOTHER');
    this.props.pushRoute({ key: 'tagItemScreen' }, this.props.navigation.key);
  }

  publishAction() {
    console.log('Publish');
  }

  getHeadingTitle() {
    let title = '';
    switch (this.state.currentStep) {
      case 1:
        title = 'Add New Item';
        break;
      case 2:
        title = 'Additional Info';
        break;
      default:
        title = '';
    }
    return title;
  }

  _renderActionsContainer() {
    return <ActionsBar continueAction={this.continueAction.bind(this)} tagAnotherAction={this.tagAnotherAction.bind(this)} />;
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
            {/*this.state.currentStep == 1 && <StepOne key={1}/>*/}
            {/*this.state.currentStep == 2 && <StepTwo continueAction={this.publishAction.bind(this)} key={2}/>*/}
            <Swiper style={styles.wrapper}
                    onMomentumScrollEnd={(e, state, context) => this.setState({currentStep: state.index + 1})}
                    dot={<View style={{width: 0, height: 0}} />}
                    activeDot={<View style={{width: 0, height: 0}} />}
                    height={swiperH} loop>
              <StepOne key={1}/>
              <StepTwo continueAction={this.publishAction.bind(this)} key={2}/>
            </Swiper>
            {this.state.currentStep == 1 && this._renderActionsContainer()}
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
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  ...state.uploadLook,
});

export default connect(mapStateToProps, bindActions)(AddItemPage);
