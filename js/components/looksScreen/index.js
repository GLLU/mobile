import React, {Component} from 'react';
import BasePage from '../common/BasePage';
import {View, Image, Animated, InteractionManager, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import Spinner from '../loaders/Spinner';
import LooksContainer from './looksContainer';
import { actions } from 'react-native-navigation-redux-helpers';
import navigateTo from '../../actions/sideBarNav';
import Video from 'react-native-video';

const h = Platform.os === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height
const w = Dimensions.get('window').width;
const { popRoute, pushRoute } = actions
const LOADER_HEIGHT = 30;

class LooksScreen extends BasePage {
  static propTypes = {
    flatLook: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.number
    ]),
  }
  constructor(props) {
    super(props);
    this.state = {
      renderScroll: false,
      showLoader: Platform.OS !== 'ios',
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({renderScroll: true})
    });
  }

  renderLoader() {
    return (
      <Image source={{uri: this.props.flatLook.uri}} resizeMode={'cover'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color='#666666'/>
      </Image>
    )
  }

  renderScrollView() {
    return (
    <View>
      <LooksContainer {...this.props} renderScroll={this.state.renderScroll} removeLoader={() => this.removeLoader()}/>
      {this.state.showLoader ? this.renderLoader(true) : null}
    </View>
    )
  }

  removeLoader() {
    this.setState({showLoader: false})
  }

  render() {
    return this.state.renderScroll ? this.renderScrollView() : this.renderLoader(false)
  }
}

export default LooksScreen;
