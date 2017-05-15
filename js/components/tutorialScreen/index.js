
import React, { Component } from 'react';
import BasePage from '../common/BasePage';
import { Dimensions, Platform, Image, TouchableWithoutFeedback, Linking, View, TouchableOpacity, ViewPagerAndroid, Text } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { actions } from 'react-native-navigation-redux-helpers';
import { connect } from 'react-redux';
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const width = Dimensions.get('window').width;
const logo = require('../../../images/logo.png');
const { popRoute, pushRoute } = actions;
import navigateTo from '../../actions/sideBarNav';
import { hideTutorial } from '../../actions/user';
const one = require('../../../images/tutorial/1.png')
const two = require('../../../images/tutorial/2.png')
const three = require('../../../images/tutorial/3.png')
const four = require('../../../images/tutorial/4.png')
const five = require('../../../images/tutorial/5.png')

class TutorialScreen extends BasePage {

  static propTypes = {
    popRoute: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
      this.state = {
        tutorialScreens: [one, two, three, four, five]
      };
    if(this.props.showTutorial === false){
      this.props.navigateTo('splashscreen');
    }
  }

  componentWillMount() {

  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  doneWithTutorial() {
    this.props.hideTutorial();
    this.props.navigateTo('splashscreen', 'tutorialscreen');
  }

  render() {
    return (
          <ViewPagerAndroid
            style={{flex: 1}}
            initialPage={0}
            ref={viewPager => { this.viewPager = viewPager; }}>
            {this.state.tutorialScreens.map((screen, index) => {
              return (
              <View key={index}>
                  <Image resizeMode={'stretch'} style={{width: width, height: height}} source={screen}><Text>First page</Text>
                    <TouchableOpacity onPress={()=> this.viewPager.setPage(index-1)}>
                      <Text style={{color: 'blue'}}>back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.viewPager.setPage(index+1)}>
                      <Text style={{color: 'blue'}}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.doneWithTutorial()}>
                      <Text style={{color: 'blue'}}>done</Text>
                    </TouchableOpacity>
                  </Image>
              </View>
              )
            })}
          </ViewPagerAndroid>
    );
  }
}

function bindAction(dispatch) {
  return {
      popRoute: key => dispatch(popRoute(key)),
      navigateTo: (route, homeRoute, optional) => dispatch(navigateTo(route, homeRoute, optional)),
      hideTutorial: () => dispatch(hideTutorial())
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  showTutorial: state.user.showTutorial
});

export default connect(mapStateToProps, bindAction)(TutorialScreen);
