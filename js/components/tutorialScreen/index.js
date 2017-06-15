
import React, { Component } from 'react';
import asScreen from '../common/containers/Screen'
import { Dimensions, Platform, Image, TouchableWithoutFeedback, Linking, View, TouchableOpacity, ViewPagerAndroid, Text } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
const height = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - ExtraDimensions.get('STATUS_BAR_HEIGHT')
const width = Dimensions.get('window').width;
const logo = require('../../../images/logo/inFashLogo.png');
import styles from './styles';
import { hideTutorial } from '../../actions/user';
const one = require('../../../images/tutorial/1.png');
const two = require('../../../images/tutorial/2.png');
const three = require('../../../images/tutorial/3.png');
const four = require('../../../images/tutorial/4.png');
const five = require('../../../images/tutorial/5.png');

class TutorialScreen extends Component {

  constructor(props) {
    super(props);
      this.state = {
        tutorialScreens: [one, two, three, four, five],
        currPage: 0
      };
  }

  doneWithTutorial(skip=true) {
    const action=skip?`user skipped tutorial @ page ${this.state.currPage}`:`user finishedTutorial`;
    this.props.logEvent('TutorialScreen', {name: action});
    this.props.hideTutorial();
    this.props.goBack();
  }

  onPageSelected = (e) => {
    this.props.logEvent('TutorialScreen', {name: `user reached page ${this.state.currPage}`});
    this.setState({currPage: e.nativeEvent.position})
  };

  handleBackBtn(index) {
    this.viewPager.setPage(index - 1)
    this.setState({currPage: index-1})
  }

  handleNextBtn(index) {
    this.viewPager.setPage(index + 1)
    if(this.state.currPage < 4) {
      this.setState({currPage: index+1})
    } else {
      this.doneWithTutorial(false)
    }
  }

  render() {
    return (
          <ViewPagerAndroid
            style={{flex: 1}}
            initialPage={0}
            ref={viewPager => { this.viewPager = viewPager; }}
            onPageSelected={this.onPageSelected}>
            {this.state.tutorialScreens.map((screen, index) => {
              return (
              <View key={index}>
                  <Image resizeMode={'stretch'} style={{width: width, height: height}} source={screen}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', margin: 10}}>
                      <TouchableOpacity onPress={()=> this.handleBackBtn(index)} style={styles.backBtn}>
                        <Icon style={{ color: 'white', marginRight: 3}} name="ios-arrow-back" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> this.doneWithTutorial()} >
                        <Text style={{color: 'white'}}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=> this.handleNextBtn(index)} style={styles.topBtns}>
                      <Text style={styles.pagingBtn}>{this.state.currPage === 4 ? "Done" : "Next"}</Text>
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
      hideTutorial: () => dispatch(hideTutorial())
  };
}

const mapStateToProps = state => ({
  showTutorial: state.user.showTutorial
});

export default connect(mapStateToProps, bindAction)(asScreen(TutorialScreen));
